/* contato.jsx — Contato / Agendamento + rodapé */

const WPP_NUMBER = '5500000000000'; // placeholder — trocar pelo número real
const WPP_MSG = encodeURIComponent('Olá, Larissa! Gostaria de saber mais sobre o atendimento infantil. 🌱');
const IG_USER = 'larissaantunes.psi'; // placeholder
const PHONE_DISPLAY = '(00) 00000-0000'; // placeholder

function ContatoIcon({ type }) {
  if (type === 'whats') return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1012 2Zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5-4.5-.2-.2-1.3-1.7-1.3-3.3S6.7 7 7 6.7c.2-.3.5-.4.7-.4h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .5l-.4.6c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.7-.1l.8-1c.2-.2.4-.2.6-.1l1.8.9c.3.1.5.2.5.4.1.2.1.8-.1 1.3Z" /></svg>);

  if (type === 'phone') return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8a15.5 15.5 0 006.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 013 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1.1l-2.2 2.1Z" /></svg>);

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c2.7 0 3 0 4.1.1 1 0 1.7.2 2.3.5.6.2 1.1.5 1.6 1 .5.5.8 1 1 1.6.3.6.4 1.2.5 2.3C21.9 9 22 9.3 22 12s0 3-.1 4.1c0 1-.2 1.7-.5 2.3a4.3 4.3 0 01-1 1.6c-.5.5-1 .8-1.6 1-.6.3-1.2.4-2.3.5-1.1 0-1.4.1-4.1.1s-3 0-4.1-.1c-1 0-1.7-.2-2.3-.5a4.3 4.3 0 01-1.6-1 4.3 4.3 0 01-1-1.6c-.3-.6-.4-1.2-.5-2.3C2 15 2 14.7 2 12s0-3 .1-4.1c0-1 .2-1.7.5-2.3a4.3 4.3 0 011-1.6c.5-.5 1-.8 1.6-1 .6-.3 1.2-.4 2.3-.5C9 2 9.3 2 12 2Zm0 5a5 5 0 100 10 5 5 0 000-10Zm0 2a3 3 0 110 6 3 3 0 010-6Zm5.3-3.4a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4Z" /></svg>);

}

function ContatoSection() {
  const ref = useReveal();
  return (
    <section className="section contato" id="contato" ref={ref}>
      <div className="contato-shapes" aria-hidden="true">
        <div className="cs cs1" /><div className="cs cs2" /><div className="cs cs3" />
      </div>
      <div className="wrap contato-card reveal-child">
        <div className="contato-mascot"><Broto size={150} wave={true} /></div>
        <span className="eyebrow">Vamos conversar</span>
        <h2>O primeiro passo pode<br />começar com um “oi”.</h2>
        <p className="lead" style={{ marginInline: 'auto' }}>
          Tem alguma dúvida ou quer agendar uma conversa? Escolha o canal que for mais confortável para você.
        </p>

        <div className="contato-methods">
          <a className="contato-method m-whats" href={`https://wa.me/${WPP_NUMBER}?text=${WPP_MSG}`} target="_blank" rel="noopener">
            <span className="cm-icon"><ContatoIcon type="whats" /></span>
            <span className="cm-text"><strong>WhatsApp</strong><small>Resposta rapidinha</small></span>
          </a>
          <a className="contato-method m-phone" href={`tel:+${WPP_NUMBER}`}>
            <span className="cm-icon"><ContatoIcon type="phone" /></span>
            <span className="cm-text"><strong>Telefone</strong><small>{PHONE_DISPLAY}</small></span>
          </a>
          <a className="contato-method m-ig" href={`https://instagram.com/${IG_USER}`} target="_blank" rel="noopener">
            <span className="cm-icon"><ContatoIcon type="ig" /></span>
            <span className="cm-text"><strong>Instagram</strong><small>@{IG_USER}</small></span>
          </a>
        </div>

        <p className="contato-note">🌿 Atendimento presencial e online · crianças e adolescentes</p>
      </div>
    </section>);

}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <img src="assets/logo.png" alt="Larissa Antunes — Psicóloga" className="footer-logo" style={{ width: "180px", height: "180px" }} />
        <p className="footer-tag">Psicologia infantojuvenil · Terapia Cognitivo-Comportamental</p>
        <p className="footer-crp">Larissa Antunes · Psicóloga · CRP 04/84722</p>
        <p className="footer-credit">Feito com cuidado 🌱 · © {new Date().getFullYear()}</p>
      </div>
    </footer>);

}

Object.assign(window, { ContatoSection, Footer });