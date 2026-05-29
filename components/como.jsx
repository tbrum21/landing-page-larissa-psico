/* como.jsx — Como funciona a terapia infantojuvenil (jornada) */
const STEPS = [
  { n: 1, color: '#99c2c7', emoji: '☎️', title: 'Primeiro contato', text: 'Uma conversa com os pais ou responsáveis para entender a história e as principais preocupações.' },
  { n: 2, color: '#c799b2', emoji: '🧸', title: 'Acolhimento', text: 'A criança chega no seu tempo. Com brincadeira e jogos, criamos um vínculo de confiança e um espaço seguro.' },
  { n: 3, color: '#99c7b2', emoji: '🔍', title: 'Entender juntos', text: 'Avaliação cuidadosa para mapear pensamentos, emoções e comportamentos — e montar um plano sob medida.' },
  { n: 4, color: '#c79f99', emoji: '🛠️', title: 'Ferramentas da TCC', text: 'Histórias, desenhos e atividades lúdicas que ensinam a lidar com medos, raiva e ansiedade no dia a dia.' },
  { n: 5, color: '#99c2c7', emoji: '👨‍👩‍👧', title: 'Família por perto', text: 'Orientação aos pais para que o cuidado continue em casa e na escola. O progresso acontece em equipe.' },
];

function ComoSection() {
  const ref = useReveal();
  return (
    <section className="section como" id="como" ref={ref}>
      <div className="wrap">
        <div className="como-head reveal-child">
          <span className="eyebrow">Como funciona</span>
          <h2>A jornada de cada criança,<br/>a cada passo.</h2>
          <p className="lead" style={{ marginInline: 'auto' }}>
            Um caminho gentil, no ritmo da criança. Atendimento <strong>presencial e online</strong>,
            para crianças e adolescentes.
          </p>
        </div>

        <ol className="journey">
          <div className="journey-line" aria-hidden="true">
            <svg viewBox="0 0 60 1000" preserveAspectRatio="none">
              <path d="M30 0 C 0 120 60 240 30 360 C 0 480 60 600 30 720 C 0 840 60 940 30 1000"
                    fill="none" stroke="var(--rose-soft)" strokeWidth="4" strokeDasharray="2 14" strokeLinecap="round" />
            </svg>
          </div>
          {STEPS.map((s, i) => (
            <li
              key={s.n}
              className={`journey-step ${i % 2 ? 'right' : 'left'} reveal-child`}
              style={{ transitionDelay: (i * 0.08) + 's' }}
            >
              <div className="journey-card" style={{ '--c': s.color }}>
                <span className="journey-emoji">{s.emoji}</span>
                <div>
                  <span className="journey-n">passo {s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </div>
              <span className="journey-marker" style={{ background: s.color }}>{s.n}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

Object.assign(window, { ComoSection });
