/* shared.jsx — hooks, mascote Broto e elementos decorativos */
const { useState, useEffect, useRef, useCallback } = React;

/* Reveal-on-scroll: adiciona .in quando o elemento entra na viewport */
function useReveal(options) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          el.classList.add('in');
          io.unobserve(el);
        }
      });
    }, { threshold: 0.15, ...(options || {}) });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/* Posição global do mouse (normalizada -1..1 a partir do centro da janela) */
function useGlobalMouse() {
  const ref = useRef({ x: 0, y: 0, px: window.innerWidth / 2, py: window.innerHeight / 2 });
  const [, force] = useState(0);
  useEffect(() => {
    let raf = null;
    const onMove = (e) => {
      ref.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
        px: e.clientX, py: e.clientY,
      };
      if (!raf) raf = requestAnimationFrame(() => { raf = null; force((n) => n + 1); });
    };
    window.addEventListener('mousemove', onMove);
    return () => { window.removeEventListener('mousemove', onMove); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return ref.current;
}

/* ===========================================================
   Broto — mascote brotinho (metáfora de crescimento)
   Olhos seguem o cursor. Pisca, respira e acena.
   =========================================================== */
function Broto({ size = 220, mood = 'happy', wave = false }) {
  const wrapRef = useRef(null);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.46;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const ang = Math.atan2(dy, dx);
      const dist = Math.min(Math.hypot(dx, dy) / 90, 1);
      setPupil({ x: Math.cos(ang) * 6 * dist, y: Math.sin(ang) * 5 * dist });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    let t;
    const loop = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 160);
      t = setTimeout(loop, 2400 + Math.random() * 2600);
    };
    t = setTimeout(loop, 1800);
    return () => clearTimeout(t);
  }, []);

  const eyeRy = blink ? 0.6 : 7;

  return (
    <div ref={wrapRef} className={"broto " + (wave ? "broto-wave" : "")} style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" width={size} height={size} style={{ overflow: 'visible' }}>
        <defs>
          <radialGradient id="brotoBody" cx="38%" cy="32%" r="80%">
            <stop offset="0%" stopColor="#aed8c4" />
            <stop offset="100%" stopColor="#99c7b2" />
          </radialGradient>
        </defs>

        {/* sombra suave */}
        <ellipse cx="100" cy="184" rx="46" ry="9" fill="#72544f" opacity="0.10" className="broto-shadow" />

        {/* caule + folhas (brota de cima) */}
        <g className="broto-leaves">
          <path d="M100 64 C100 40 100 26 100 18" stroke="#7fae93" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M100 36 C84 30 70 34 64 22 C82 14 98 22 100 36 Z" fill="#8fc4a6" />
          <path d="M100 30 C116 22 132 24 140 12 C122 6 104 14 100 30 Z" fill="#a7d4bd" />
        </g>

        {/* corpo */}
        <g className="broto-body">
          <path d="M100 56
                   C146 56 162 92 162 122
                   C162 158 134 178 100 178
                   C66 178 38 158 38 122
                   C38 92 54 56 100 56 Z"
                fill="url(#brotoBody)" />

          {/* bochechas */}
          <ellipse cx="64" cy="132" rx="11" ry="8" fill="#e79a9a" opacity="0.55" />
          <ellipse cx="136" cy="132" rx="11" ry="8" fill="#e79a9a" opacity="0.55" />

          {/* olhos */}
          <g>
            <ellipse cx="78" cy="116" rx="11" ry="12" fill="#fff" />
            <ellipse cx="122" cy="116" rx="11" ry="12" fill="#fff" />
            <ellipse cx={78 + pupil.x} cy={116 + pupil.y} rx="5.4" ry={eyeRy} fill="#5a423e" style={{ transition: 'rx .08s, ry .08s' }} />
            <ellipse cx={122 + pupil.x} cy={116 + pupil.y} rx="5.4" ry={eyeRy} fill="#5a423e" style={{ transition: 'rx .08s, ry .08s' }} />
            <circle cx={76 + pupil.x} cy={113 + pupil.y} r="1.8" fill="#fff" />
            <circle cx={120 + pupil.x} cy={113 + pupil.y} r="1.8" fill="#fff" />
          </g>

          {/* boca */}
          {mood === 'happy'
            ? <path d="M88 142 Q100 154 112 142" stroke="#5a423e" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            : <circle cx="100" cy="146" r="6" fill="none" stroke="#5a423e" strokeWidth="3.2" />}
        </g>

        {/* braço esquerdo (descansando) */}
        <g className="broto-arm-left">
          <path d="M44 132 C28 130 18 124 12 116" stroke="#8fc4a6" strokeWidth="9" fill="none" strokeLinecap="round" />
          <circle cx="12" cy="115" r="8" fill="#8fc4a6" />
        </g>

        {/* braço direito (acena, se wave) */}
        <g className={"broto-arm-right " + (wave ? "broto-wave-arm" : "")} style={{ transformOrigin: '156px 130px' }}>
          <path d="M156 130 C172 124 182 112 184 100" stroke="#8fc4a6" strokeWidth="9" fill="none" strokeLinecap="round" />
          <circle cx="185" cy="98" r="8" fill="#8fc4a6" />
        </g>
      </svg>
    </div>
  );
}

/* Blob decorativo reutilizável */
function Blob({ color, size = 120, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" style={style} aria-hidden="true">
      <path fill={color} d="M60 8c20 0 44 10 50 32s-6 44-22 56-44 18-60 6S6 60 14 40 40 8 60 8Z" />
    </svg>
  );
}

Object.assign(window, { useReveal, useGlobalMouse, Broto, Blob });
