import { Mail, MessageCircle, Send } from "lucide-react";

export default function ContactsPage() {
  return (
    <main className="page-shell">
      <section className="contact-layout">
        <div>
          <span className="chip">Контакты</span>
          <h1>Свяжитесь удобным способом</h1>
          <p>Можно написать в Telegram или VK, либо оставить заявку через форму. Я отвечу и помогу выбрать следующий шаг.</p>
          <div className="contact-links">
            <a href="https://t.me/" target="_blank" rel="noreferrer"><Send /> Telegram</a>
            <a href="https://vk.com/" target="_blank" rel="noreferrer"><MessageCircle /> VK</a>
            <a href="mailto:example@mail.com"><Mail /> example@mail.com</a>
          </div>
        </div>
        <form className="contact-form">
          <label>Имя<input placeholder="Ваше имя" /></label>
          <label>Контакт<input placeholder="Telegram, VK или email" /></label>
          <label>Сообщение<textarea placeholder="Коротко опишите вопрос" /></label>
          <button type="button">Отправить заявку</button>
        </form>
      </section>
    </main>
  );
}
