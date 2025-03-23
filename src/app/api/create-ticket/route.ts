// src/app/api/create-ticket/route.ts
import { NextResponse } from 'next/server';
import { createTicket } from '@/lib/soroban.server'; // renómbralo
import { Keypair } from '@stellar/stellar-sdk';

export async function POST() {
  try {
    const secret = process.env.TEST_SECRET_KEY!;
    const keypair = Keypair.fromSecret(secret);
    const response = await createTicket(42, 1000000, keypair);
    return NextResponse.json({ ok: true, response });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: e.toString() }, { status: 500 });
  }
}