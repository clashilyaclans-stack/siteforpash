import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = (await request.json().catch(() => ({}))) as {
    email?: string;
    password?: string;
  };

  const adminEmail = process.env.ADMIN_EMAIL || "admin@site.ru";
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin2026!";

  if (email === adminEmail && password === adminPassword) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false, message: "Неверный логин или пароль." }, { status: 401 });
}
