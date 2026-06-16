import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ConsultationPage() {
  const content = await getContent();
  const consultation = content.consultation;

  return (
    <main className="page-shell">
      <section className="consultation">
        <div>
          <span className="chip">{consultation.badge}</span>
          <h1>{consultation.title}</h1>
          <p>{consultation.text}</p>
          <Link className="primary-action" href={consultation.buttonHref}>
            {consultation.buttonText}
            <ArrowRight size={18} />
          </Link>
        </div>
        <ul>
          {consultation.items.map((item) => (
            <li key={item}>
              <CheckCircle2 size={20} />
              {item}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
