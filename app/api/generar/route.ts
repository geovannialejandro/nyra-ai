import Replicate from 'replicate';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { userId, image, voice_script, voice } = await req.json();

    if (!userId || !image || !voice_script) {
      return NextResponse.json(
        { error: 'Faltan datos: userId, image o voice_script' },
        { status: 400 }
      );
    }

    if (voice_script.length > 300) {
      return NextResponse.json(
        { error: 'El texto es muy largo. Máximo 200 caracteres (~30 segundos de video).' },
        { status: 400 }
      );
    }

    // Descuenta 1 crédito de forma segura (evita race conditions)
    const { data: canProceed, error: creditError } = await supabase.rpc(
      'deduct_credits',
      { p_user_id: userId, p_amount: 1 }
    );

    if (creditError) {
      return NextResponse.json({ error: creditError.message }, { status: 500 });
    }

    if (!canProceed) {
      return NextResponse.json(
        { error: 'No tienes créditos suficientes' },
        { status: 402 }
      );
    }

    // Llama al modelo de video
    const output = await replicate.run('prunaai/p-video-avatar', {
      input: {
        image,
        voice_script,
        voice: voice || 'Zephyr (Female)',
      },
    });

    return NextResponse.json({ output });
  } catch (error: any) {
    console.error('generar error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
