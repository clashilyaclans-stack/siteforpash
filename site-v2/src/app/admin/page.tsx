import { AdminPanel } from "@/components/AdminPanel";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminPage() {
  const content = await getContent();
  return <AdminPanel initialContent={content} />;
}
