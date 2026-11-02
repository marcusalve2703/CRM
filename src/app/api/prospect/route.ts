import { NextResponse } from 'next/server';
import { searchCompanyByCNPJ, searchLocalBusinessesOSM } from '@/lib/prospection';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cnpj = searchParams.get('cnpj');
  const query = searchParams.get('query');
  const city = searchParams.get('city');

  if (cnpj) {
    const company = await searchCompanyByCNPJ(cnpj);
    if (!company) {
      return NextResponse.json({ error: 'CNPJ não encontrado ou inválido' }, { status: 404 });
    }
    return NextResponse.json({ results: [company] });
  }

  if (city) {
    const businesses = await searchLocalBusinessesOSM(query || '', city);
    return NextResponse.json({ results: businesses });
  }

  return NextResponse.json(
    { error: 'Forneça ao menos um filtro: CNPJ ou Cidade + Termo de Busca' },
    { status: 400 }
  );
}
