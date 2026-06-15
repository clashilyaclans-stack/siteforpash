# Mentor Platform V2

Второй отдельный сайт в той же папке. Старый проект не удаляется и не меняется.

## Локальный запуск

```bash
npm install
npm run dev
```

## Supabase

Проект готов читать контент из таблицы `site_v2_content`, если добавить:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Без Supabase сайт работает на встроенном fallback-контенте.
