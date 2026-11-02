import { NextResponse } from 'next/server';
import { executeAssistantAction } from '@/lib/assistant';

export async function POST(request: Request) {
  try {
    const { message, orgId } = await request.json();

    const text = message.toLowerCase();

    // Interpretação determinística e local de comandos (sem dependência de IA paga)
    if (text.includes('listar contatos') || text.includes('mostrar contatos') || text.includes('ver contatos')) {
      const res = await executeAssistantAction({ name: 'list_contacts', parameters: {} }, orgId);
      return NextResponse.json({
        response: `Aqui estão seus contatos recentes:`,
        actionResult: res.result
      });
    }

    if (text.includes('criar contato') || text.includes('adicionar contato')) {
      // Exemplo básico de parsing de instrução para contato
      const match = text.match(/nome\s+([a-zA-a-záàâãéèêíóôõúç\s]+)/i);
      const name = match ? match[1].trim() : 'Novo Contato Assistente';

      const res = await executeAssistantAction({
        name: 'create_contact',
        parameters: { name, origin: 'assistente' }
      }, orgId);

      return NextResponse.json({
        response: res.message,
        actionResult: res.result
      });
    }

    if (text.includes('oportunidades') || text.includes('funil') || text.includes('vendas')) {
      const res = await executeAssistantAction({ name: 'list_deals', parameters: {} }, orgId);
      return NextResponse.json({
        response: `Aqui estão suas oportunidades do funil:`,
        actionResult: res.result
      });
    }

    return NextResponse.json({
      response: `Entendi sua mensagem: "${message}". Posso te ajudar a listar contatos, criar contatos ou verificar seu funil de vendas.`
    });
  } catch (error) {
    console.error('Erro no assistente:', error);
    return NextResponse.json({ error: 'Erro ao processar solicitação do assistente' }, { status: 500 });
  }
}
