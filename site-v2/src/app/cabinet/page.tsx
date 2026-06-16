import { CabinetAccess } from "@/components/CabinetAccess";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CabinetPage() {
  const content = await getContent();
  return (
    <main className="page-shell">
      <CabinetAccess cabinet={content.cabinet} students={content.students} />
    </main>
  );
}
