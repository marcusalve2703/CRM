export interface CompanyProspectionResult {
  cnpj?: string;
  name: string;
  tradeName?: string;
  segment?: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  city?: string;
  state?: string;
  source: string;
  fetchedAt: string;
  needsConfirmation?: boolean;
}

/**
 * Realiza consulta gratuita de CNPJ via BrasilAPI / MinhaReceita
 */
export async function searchCompanyByCNPJ(cnpj: string): Promise<CompanyProspectionResult | null> {
  const cleanCNPJ = cnpj.replace(/\D/g, '');
  if (cleanCNPJ.length !== 14) return null;

  try {
    const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cleanCNPJ}`, {
      next: { revalidate: 3600 }
    });

    if (!res.ok) return null;

    const data = await res.json();

    return {
      cnpj: data.cnpj,
      name: data.razao_social || data.nome_fantasia,
      tradeName: data.nome_fantasia,
      segment: data.cnae_fiscal_descricao,
      phone: data.ddd_telefone_1 ? `(${data.ddd_telefone_1.slice(0, 2)}) ${data.ddd_telefone_1.slice(2)}` : undefined,
      email: data.email,
      address: `${data.logradouro}, ${data.numero} - ${data.bairro}`,
      city: data.municipio,
      state: data.uf,
      source: 'BrasilAPI (CNPJ Oficial Público)',
      fetchedAt: new Date().toISOString(),
      needsConfirmation: false,
    };
  } catch (error) {
    console.error('Erro na consulta do CNPJ:', error);
    return null;
  }
}

/**
 * Realiza busca gratuita por estabelecimentos via Overpass API (OpenStreetMap)
 */
export async function searchLocalBusinessesOSM(query: string, city: string): Promise<CompanyProspectionResult[]> {
  try {
    const overpassQuery = `
      [out:json][timeout:25];
      area["name"="${city}"]->.searchArea;
      (
        node["amenity"](area.searchArea);
        node["shop"](area.searchArea);
        node["office"](area.searchArea);
        way["amenity"](area.searchArea);
        way["shop"](area.searchArea);
      );
      out body 15;
    `;

    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;
    const res = await fetch(url);
    if (!res.ok) return [];

    const data = await res.json();
    const results: CompanyProspectionResult[] = [];

    for (const item of data.elements || []) {
      const tags = item.tags || {};
      if (!tags.name) continue;

      // Filtrar pelo termo pesquisado se aplicável
      if (query && !tags.name.toLowerCase().includes(query.toLowerCase()) && !(tags.shop && tags.shop.includes(query))) {
        continue;
      }

      results.push({
        name: tags.name,
        segment: tags.shop || tags.amenity || tags.office || 'Comércio Local',
        phone: tags.phone || tags['contact:phone'],
        email: tags.email || tags['contact:email'],
        website: tags.website || tags['contact:website'],
        address: tags['addr:street'] ? `${tags['addr:street']} ${tags['addr:housenumber'] || ''}` : undefined,
        city: tags['addr:city'] || city,
        state: tags['addr:state'],
        source: 'OpenStreetMap (Livre/Aberto)',
        fetchedAt: new Date().toISOString(),
        needsConfirmation: !tags.phone && !tags.email,
      });
    }

    return results;
  } catch (err) {
    console.error('Erro ao pesquisar empresas no OSM:', err);
    return [];
  }
}
