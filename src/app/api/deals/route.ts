import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orgId = searchParams.get('orgId') || 'demo-org';

  const deals = await db.deal.findMany({
    where: { organizationId: orgId },
    include: { contact: true, stage: true },
    orderBy: { createdAt: 'desc' }
  });

  return NextResponse.json(deals);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, value, stageId, contactId, organizationId } = body;
    const orgId = organizationId || 'demo-org';

    const deal = await db.deal.create({
      data: {
        title,
        value: Number(value) || 0,
        stageId,
        contactId,
        organizationId: orgId
      }
    });

    return NextResponse.json(deal, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar oportunidade:', error);
    return NextResponse.json({ error: 'Erro ao criar oportunidade' }, { status: 500 });
  }
}
