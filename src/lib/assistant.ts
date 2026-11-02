import { db } from '@/lib/db';

export interface AssistantAction {
  name: 'list_contacts' | 'create_contact' | 'list_deals' | 'move_deal' | 'search_companies';
  parameters: Record<string, any>;
}

export async function executeAssistantAction(action: AssistantAction, orgId: string = 'demo-org') {
  switch (action.name) {
    case 'list_contacts': {
      const contacts = await db.contact.findMany({
        where: { organizationId: orgId },
        take: 10,
        orderBy: { createdAt: 'desc' }
      });
      return { success: true, result: contacts };
    }

    case 'create_contact': {
      const { name, email, phone, origin } = action.parameters;
      const contact = await db.contact.create({
        data: {
          name,
          email,
          phone,
          origin: origin || 'assistant',
          organizationId: orgId
        }
      });
      return { success: true, message: `Contato "${name}" criado com sucesso!`, result: contact };
    }

    case 'list_deals': {
      const deals = await db.deal.findMany({
        where: { organizationId: orgId },
        include: { contact: true }
      });
      return { success: true, result: deals };
    }

    case 'search_companies': {
      const { cnpj } = action.parameters;
      if (cnpj) {
        const res = await fetch(`http://localhost:3000/api/prospect?cnpj=${cnpj}`);
        const data = await res.json();
        return { success: true, result: data.results };
      }
      return { success: false, error: 'Parâmetro insuficiente' };
    }

    default:
      return { success: false, error: 'Ação não reconhecida' };
  }
}
