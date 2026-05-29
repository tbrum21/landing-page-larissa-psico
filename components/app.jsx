/* app.jsx — header e composição da página */
const { useState: useStateA, useEffect: useEffectA } = React;

function Header() {
  const [scrolled, setScrolled] = useStateA(false);
  useEffectA(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={"site-header " + (scrolled ? 'scrolled' : '')}>
      <a className="logo" href="#top" aria-label="Larissa Antunes — Psicóloga">
        <img src="assets/logo.png" alt="Larissa Antunes — Psicóloga" className="logo-img" />
      </a>
      <nav className="nav-links">
        <a href="#tcc" className="nav-link-text">O que é TCC</a>
        <a href="#como" className="nav-link-text">Como funciona</a>
        <a className="btn btn-whats nav-cta" href="#contato">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 00-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1012 2Zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5-4.5-.2-.2-1.3-1.7-1.3-3.3S6.7 7 7 6.7c.2-.3.5-.4.7-.4h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .5l-.4.6c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.7-.1l.8-1c.2-.2.4-.2.6-.1l1.8.9c.3.1.5.2.5.4.1.2.1.8-.1 1.3Z" />
          </svg>
          Agendar
        </a>
      </nav>
    </header>);

}

function App() {
  return (
    <React.Fragment>
      <Header />
      <main id="top">
        <Hero />
        <TccSection />
        <ComoSection />
        <ContatoSection />
      </main>
      <Footer />
    </React.Fragment>);

}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);