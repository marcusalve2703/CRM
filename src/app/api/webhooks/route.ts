import { NextResponse } from 'next/server';

/**
 * Webhook unificado para Telegram, WhatsApp (Evolution/Oficial) e Meta
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { source, message, contactId, organizationId } = body;

    console.log(`Mensagem recebida de ${source}:`, message);

    // TODO: Persistir no banco de dados para a Caixa de Entrada Unificada
    // await db.message.create({ ... })

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro no webhook' }, { status: 500 });
  }
}

// Verificação de Token para Meta/WhatsApp Oficial
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
    return new Response(challenge);
  }

  return new Response('Verification failed', { status: 403 });
}
