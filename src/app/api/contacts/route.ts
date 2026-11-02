import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orgId = searchParams.get('orgId') || 'demo-org';

  const contacts = await db.contact.findMany({
    where: { organizationId: orgId },
    include: { company: true },
    orderBy: { createdAt: 'desc' }
  });

  return NextResponse.json(contacts);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, origin, tags, notes, companyName, organizationId } = body;

    const orgId = organizationId || 'demo-org';

    // Garante que a organização exista para evitar erro FK
    await db.organization.upsert({
      where: { id: orgId },
      update: {},
      create: { id: orgId, name: 'Organização Demo' }
    });

    let companyId = undefined;
    if (companyName) {
      const company = await db.company.create({
        data: {
          name: companyName,
          organizationId: orgId
        }
      });
      companyId = company.id;
    }

    const contact = await db.contact.create({
      data: {
        name,
        email,
        phone,
        origin: origin || 'manual',
        tags: tags || [],
        notes,
        companyId,
        organizationId: orgId
      }
    });

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar contato:', error);
    return NextResponse.json({ error: 'Erro ao criar contato' }, { status: 500 });
  }
}
