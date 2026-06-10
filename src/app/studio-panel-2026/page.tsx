import { AdminApp } from "@/components/admin/AdminApp";
import { getFallbackContent } from "@/lib/fallback-content";
import { hasSupabaseConfig } from "@/lib/supabase";

export default function HiddenAdminPage() {
  return (
    <AdminApp
      initialContent={getFallbackContent()}
      supabaseConfigured={hasSupabaseConfig()}
    />
  );
}
