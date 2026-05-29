/* hero.jsx — hero animado e interativo */
const { useState: useStateH, useEffect: useEffectH, useRef: useRefH, useCallback: useCbH } = React;

/* formas que flutuam ao fundo, com parallax pelo mouse */
const HERO_SHAPES = [
  { type: 'cloud',   color: '#ffffff', x: '8%',  y: '18%', s: 120, depth: 0.5,  dur: 13 },
  { type: 'cloud',   color: '#ffffff', x: '74%', y: '12%', s: 90,  depth: 0.3,  dur: 16 },
  { type: 'balloon', color: '#c799b2', x: '84%', y: '40%', s: 64,  depth: 1.4,  dur: 9 },
  { type: 'balloon', color: '#99c2c7', x: '12%', y: '58%', s: 54,  depth: 1.1,  dur: 11 },
  { type: 'star',    color: '#e6b95e', x: '64%', y: '24%', s: 30,  depth: 1.8,  dur: 7 },
  { type: 'star',    color: '#c79f99', x: '30%', y: '14%', s: 22,  depth: 2.0,  dur: 8 },
  { type: 'blobS',   color: '#d7ece2', x: '5%',  y: '38%', s: 70,  depth: 0.7,  dur: 14 },
  { type: 'blobS',   color: '#eed9e5', x: '88%', y: '66%', s: 80,  depth: 0.9,  dur: 12 },
  { type: 'dot',     color: '#99c7b2', x: '46%', y: '8%',  s: 16,  depth: 2.4,  dur: 6 },
  { type: 'dot',     color: '#c799b2', x: '92%', y: '22%', s: 12,  depth: 2.6,  dur: 7 },
  { type: 'dot',     color: '#99c2c7', x: '20%', y: '78%', s: 14,  depth: 2.2,  dur: 6.5 },
];

function ShapeSVG({ type, color, size }) {
  if (type === 'cloud') return (
    <svg width={size} height={size * 0.62} viewBox="0 0 100 62" aria-hidden="true">
      <path fill={color} d="M26 52c-12 0-22-8-22-19 0-10 9-18 20-17 3-9 12-14 21-12 8 2 13 8 14 16 9-1 17 5 17 14 0 10-9 18-20 18Z" />
    </svg>
  );
  if (type === 'balloon') return (
    <svg width={size} height={size * 1.3} viewBox="0 0 60 78" aria-hidden="true">
      <ellipse cx="30" cy="30" rx="26" ry="29" fill={color} />
      <ellipse cx="22" cy="20" rx="6" ry="9" fill="#fff" opacity="0.4" />
      <path d="M30 59 l-4 6 h8 Z" fill={color} />
      <path d="M30 65 q6 8 0 13" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
  if (type === 'star') return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path fill={color} d="M12 1l2.6 6.4L21 9l-5 4.4L17.6 21 12 17l-5.6 4L8 13.4 3 9l6.4-1.6Z" />
    </svg>
  );
  if (type === 'dot') return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill={color} /></svg>
  );
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden="true">
      <path fill={color} d="M60 8c20 0 44 10 50 32s-6 44-22 56-44 18-60 6S6 60 14 40 40 8 60 8Z" />
    </svg>
  );
}

/* partículas que surgem ao clicar/tocar na cena */
const POP_KINDS = [
  { c: '#c799b2', shape: 'heart' },
  { c: '#99c2c7', shape: 'star' },
  { c: '#99c7b2', shape: 'circle' },
  { c: '#c79f99', shape: 'heart' },
  { c: '#e6b95e', shape: 'star' },
];
function Pop({ shape, c }) {
  if (shape === 'heart') return (
    <svg width="34" height="34" viewBox="0 0 24 24"><path fill={c} d="M12 21s-7.5-4.7-10-9.3C.3 8.4 1.8 4.5 5.3 4.5c2 0 3.4 1.2 4.2 2.4.8-1.2 2.2-2.4 4.2-2.4 3.5 0 5 3.9 3.3 7.2C19.5 16.3 12 21 12 21Z"/></svg>
  );
  if (shape === 'star') return (
    <svg width="32" height="32" viewBox="0 0 24 24"><path fill={c} d="M12 1l2.6 6.4L21 9l-5 4.4L17.6 21 12 17l-5.6 4L8 13.4 3 9l6.4-1.6Z"/></svg>
  );
  return <svg width="26" height="26" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill={c}/></svg>;
}

function Hero() {
  const m = useGlobalMouse();
  const heroRef = useRefH(null);
  const [pops, setPops] = useStateH([]);
  const [loaded, setLoaded] = useStateH(false);
  const idRef = useRefH(0);

  useEffectH(() => { const t = setTimeout(() => setLoaded(true), 120); return () => clearTimeout(t); }, []);

  const spawn = useCbH((clientX, clientY, count = 1) => {
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const baseX = clientX - r.left;
    const baseY = clientY - r.top;
    const next = [];
    for (let i = 0; i < count; i++) {
      const k = POP_KINDS[Math.floor(Math.random() * POP_KINDS.length)];
      idRef.current += 1;
      next.push({
        id: idRef.current,
        x: baseX + (Math.random() - 0.5) * 40,
        y: baseY + (Math.random() - 0.5) * 20,
        dx: (Math.random() - 0.5) * 120,
        rot: (Math.random() - 0.5) * 120,
        sc: 0.7 + Math.random() * 0.7,
        ...k,
      });
    }
    setPops((p) => [...p, ...next]);
    next.forEach((n) => setTimeout(() => setPops((p) => p.filter((x) => x.id !== n.id)), 1500));
  }, []);

  const onPointer = (e) => {
    if (e.target.closest('a, button')) return;   // não dispara em cima dos botões
    spawn(e.clientX, e.clientY, 5);
  };

  const words = ["Um", "espaço", "seguro", "para", "a", "infância", "florescer"];

  return (
    <header className="hero" ref={heroRef} onPointerDown={onPointer}>
      {/* gradiente de céu */}
      <div className="hero-sky" aria-hidden="true" />
      <div className="hero-hill" aria-hidden="true" />

      {/* formas flutuantes com parallax */}
      <div className="hero-shapes" aria-hidden="true">
        {HERO_SHAPES.map((sh, i) => (
          <div
            key={i}
            className="float-shape"
            style={{
              left: sh.x, top: sh.y,
              transform: `translate(${-m.x * sh.depth * 26}px, ${-m.y * sh.depth * 22}px)`,
              animationDuration: sh.dur + 's',
            }}
          >
            <div className="float-bob" style={{ animationDuration: (sh.dur * 0.8) + 's' }}>
              <ShapeSVG type={sh.type} color={sh.color} size={sh.s} />
            </div>
          </div>
        ))}
      </div>

      {/* partículas de clique */}
      <div className="pop-layer" aria-hidden="true">
        {pops.map((p) => (
          <span key={p.id} className="pop" style={{ left: p.x, top: p.y, '--dx': p.dx + 'px', '--rot': p.rot + 'deg', '--sc': p.sc }}>
            <Pop shape={p.shape} c={p.c} />
          </span>
        ))}
      </div>

      <div className="hero-inner wrap">
        <div className={"hero-copy " + (loaded ? 'loaded' : '')}>
          <h1 className="hero-title">
            {words.map((w, i) => (
              <span className="word-mask" key={i}>
                <span className="word" style={{ animationDelay: (0.35 + i * 0.07) + 's' }}>{w}&nbsp;</span>
              </span>
            ))}
          </h1>
          <p className="hero-sub">
            Atendimento psicológico para crianças e adolescentes na abordagem da
            <strong> Terapia Cognitivo-Comportamental</strong> — com escuta, brincadeira e muito cuidado.
          </p>
          <div className="hero-cta">
            <a className="btn btn-whats" href="#contato">
              <WhatsIcon /> Agendar uma conversa
            </a>
            <a className="btn btn-ghost" href="#tcc">Como funciona →</a>
          </div>
          <p className="hero-hint">
            <span className="hint-tap">✦</span> dica: clique na cena e veja o que acontece
          </p>
        </div>

        <div className="hero-mascot" style={{ transform: `translate(${m.x * 14}px, ${m.y * 10}px)` }}>
          <div className="mascot-ring" aria-hidden="true" />
          <Broto size={300} wave={true} />
          <button className="mascot-bubble" onClick={() => spawn(window.innerWidth * 0.72, window.innerHeight * 0.42, 8)}>
            Oi! 👋
          </button>
        </div>
      </div>

      <a href="#tcc" className="scroll-cue" aria-label="Rolar para baixo">
        <span /> 
      </a>
    </header>
  );
}

function WhatsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 00-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1012 2Zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5-4.5-.2-.2-1.3-1.7-1.3-3.3S6.7 7 7 6.7c.2-.3.5-.4.7-.4h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .5l-.4.6c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.7-.1l.8-1c.2-.2.4-.2.6-.1l1.8.9c.3.1.5.2.5.4.1.2.1.8-.1 1.3Z"/>
    </svg>
  );
}

Object.assign(window, { Hero });
