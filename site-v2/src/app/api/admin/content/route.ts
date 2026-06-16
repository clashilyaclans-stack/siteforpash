import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { contentId, contentTable, fallbackContent, getContent, normalizeContent } from "@/lib/content";
import type { SiteContent } from "@/lib/types";

function isAdmin(email?: string, password?: string) {
  return (
    email === (process.env.ADMIN_EMAIL || "admin@site.ru") &&
    password === (process.env.ADMIN_PASSWORD || "Admin2026!")
  );
}

export async function GET() {
  return NextResponse.json({ content: await getContent() });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    email?: string;
    password?: string;
    content?: Partial<SiteContent>;
  };

  if (!isAdmin(body.email, body.password)) {
    return NextResponse.json({ ok: false, message: "Неверный логин или пароль." }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return NextResponse.json(
      { ok: false, message: "На сервере не настроены переменные Supabase для сохранения." },
      { status: 500 }
    );
  }

  const content = normalizeContent(body.content || fallbackContent);
  const supabase = createClient(url, key);
  const { error } = await supabase.from(contentTable).upsert({
    id: contentId,
    content,
    updated_at: new Date().toISOString()
  });

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, content });
}
