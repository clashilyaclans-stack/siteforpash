import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function ConsultationPage() {
  const items = [
    "Разберем интересы и сильные стороны",
    "Определим несколько реалистичных направлений",
    "Соберем персональный план действий",
    "Подскажем материалы для самостоятельной работы"
  ];

  return (
    <main className="page-shell">
      <section className="consultation">
        <div>
          <span className="chip">Консультация</span>
          <h1>Персональный разбор образовательного маршрута</h1>
          <p>Формат для тех, кто хочет не просто список профессий, а спокойный и понятный план: что проверить, куда смотреть и какие шаги сделать первыми.</p>
          <Link className="primary-action" href="/contacts">
            Записаться
            <ArrowRight size={18} />
          </Link>
        </div>
        <ul>
          {items.map((item) => (
            <li key={item}><CheckCircle2 size={20} />{item}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
