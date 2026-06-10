# Tutor App

Сайт репетитора по макету из ТЗ: вводная мобильная страница, список статей, полная статья и скрытая админка.

## Локальный запуск

```bash
npm install
npm run dev
```

Сайт: `http://localhost:3000`

Админка: `http://localhost:3000/studio-panel-2026`

## Supabase

Переменные окружения:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

SQL-схема лежит в `supabase/schema.sql`. После применения схемы создайте пользователя в Supabase Authentication. Админка сохраняет весь контент в таблицу `site_content` и загружает изображения в bucket `site-media`.

## Проверки

```bash
npm test
npm run lint
npm run typecheck
npm run build
```
