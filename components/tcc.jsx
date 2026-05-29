/* tcc.jsx — O que é TCC, de forma lúdica e interativa */
const { useState: useStateT, useRef: useRefT } = React;

const TCC_NODES = {
  pensamento: {
    label: 'Pensamento', emoji: '💭', color: '#99c2c7', soft: '#d7ebed',
    kid: 'O que passa pela cabeça',
    text: 'É a voz que aparece na mente: "vou errar", "ninguém vai gostar de mim". Nem sempre ela diz a verdade!',
  },
  sentimento: {
    label: 'Sentimento', emoji: '💗', color: '#c799b2', soft: '#eed9e5',
    kid: 'O que o corpo sente',
    text: 'Medo, alegria, raiva, vergonha... Sentir é normal. A gente aprende a dar nome e tamanho para cada emoção.',
  },
  comportamento: {
    label: 'Comportamento', emoji: '🏃', color: '#99c7b2', soft: '#d7ece2',
    kid: 'O que a gente faz',
    text: 'É a atitude que vem depois: evitar, chorar, gritar — ou respirar, pedir ajuda e tentar de novo.',
  },
};
const ORDER = ['pensamento', 'sentimento', 'comportamento'];

function TccSection() {
  const ref = useReveal();
  const [active, setActive] = useStateT('pensamento');
  const [reframed, setReframed] = useStateT(false);
  const node = TCC_NODES[active];

  return (
    <section className="section tcc" id="tcc" ref={ref}>
      <div className="wrap tcc-grid">
        <div className="tcc-intro reveal-child">
          <span className="eyebrow">O que é TCC</span>
          <h2>Pensar, sentir e agir<br/>andam de mãos dadas.</h2>
          <p className="lead">
            A <strong>Terapia Cognitivo-Comportamental</strong> ajuda a criança a perceber
            como os pensamentos influenciam o que ela sente e faz — e a descobrir caminhos
            mais leves para os momentos difíceis.
          </p>

          <div className="tcc-panel" style={{ '--accent': node.color, '--accent-soft': node.soft }}>
            <div className="tcc-panel-top">
              <span className="tcc-panel-emoji">{node.emoji}</span>
              <div>
                <span className="tcc-panel-kid">{node.kid}</span>
                <h3>{node.label}</h3>
              </div>
            </div>
            <p>{node.text}</p>
          </div>

          <button className="tcc-flip" onClick={() => setReframed((r) => !r)}>
            <span className="tcc-flip-icon">{reframed ? '🌈' : '🪄'}</span>
            {reframed ? 'Ver de novo o pensamento difícil' : 'Veja a mágica da TCC neste exemplo →'}
          </button>
        </div>

        {/* diagrama do ciclo */}
        <div className="tcc-cycle reveal-child" role="group" aria-label="Ciclo pensamento, sentimento e comportamento">
          <svg className="tcc-lines" viewBox="0 0 320 300" aria-hidden="true">
            <defs>
              <marker id="arrow" markerWidth="9" markerHeight="9" refX="5" refY="4.5" orient="auto">
                <path d="M0 0 L9 4.5 L0 9 Z" fill="#c9b9b3" />
              </marker>
            </defs>
            <path className="tcc-arc" d="M150 70 Q260 90 240 190" />
            <path className="tcc-arc" d="M232 210 Q170 270 100 210" />
            <path className="tcc-arc" d="M80 190 Q60 90 140 72" />
          </svg>

          {ORDER.map((key, i) => {
            const n = TCC_NODES[key];
            const pos = ['node-top', 'node-right', 'node-left'][i];
            return (
              <button
                key={key}
                className={`tcc-node ${pos} ${active === key ? 'active' : ''}`}
                style={{ '--c': n.color, '--cs': n.soft }}
                onClick={() => setActive(key)}
                aria-pressed={active === key}
              >
                <span className="tcc-node-emoji">{n.emoji}</span>
                <span className="tcc-node-label">{n.label}</span>
              </button>
            );
          })}

          {/* exemplo no centro */}
          <div className={"tcc-example " + (reframed ? 'is-reframed' : '')}>
            <span className="tcc-example-tag">{reframed ? 'com a TCC' : 'um dia difícil'}</span>
            <p>
              {reframed
                ? '“Posso me preparar. Se errar, eu tento de novo.” — aí vem a coragem, e ela estuda com calma.'
                : '“Vou errar a prova!” — vem o medo, e a vontade é fugir e nem tentar.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { TccSection });
