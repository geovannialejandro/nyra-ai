import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

export async function POST(req: Request) {
  try {
    const { userId, image, voice_script, voice } = await req.json();

    if (!userId || !image || !voice_script) {
      return NextResponse.json({ error: 'Faltan datos.' }, { status: 400 });
    }

    // 1. Verificar créditos
    const { data: creditRow, error: creditError } = await supabaseAdmin
      .from('user_credits')
      .select('credits')
      .eq('user_id', userId)
      .single();

    if (creditError || !creditRow) {
      return NextResponse.json({ error: 'No se encontraron créditos para este usuario.' }, { status: 400 });
    }

    if (creditRow.credits <= 0) {
      return NextResponse.json({ error: 'Ya no tienes créditos.' }, { status: 402 });
    }

    // 2. Descontar el crédito antes de generar
    const { error: deductError } = await supabaseAdmin
      .from('user_credits')
      .update({ credits: creditRow.credits - 1 })
      .eq('user_id', userId);

    if (deductError) {
      return NextResponse.json({ error: 'No se pudo descontar el crédito.' }, { status: 500 });
    }

    // 3. Llamar al modelo
    try {
      const output = await replicate.run('prunaai/p-video-avatar', {
        input: {
          image,
          voice_script,
          voice: voice || 'Zephyr (Female)',
        },
      });

      return NextResponse.json({ output });
    } catch (replicateError: any) {
      // Reembolsar el crédito si la generación falla
      await supabaseAdmin
        .from('user_credits')
        .update({ credits: creditRow.credits })
        .eq('user_id', userId);

      return NextResponse.json(
        { error: 'No se pudo generar el video. Se reembolsó tu crédito.' },
        { status: 500 }
      );
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error inesperado.' }, { status: 500 });
  }
}
