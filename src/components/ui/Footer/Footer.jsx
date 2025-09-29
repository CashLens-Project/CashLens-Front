import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer" aria-labelledby="footer-heading">
      <div className="footer__container">
        <h2 id="footer-heading" className="sr-only">Rodapé do site</h2>

        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-mark" aria-hidden="true">CL</span>
              <span className="footer__logo-text">CashLens</span>
            </div>
            <p className="footer__desc">
              Análise financeira inteligente para negócios de todos os tamanhos.
            </p>
            <nav className="footer__social" aria-label="Redes sociais">
              <a href="#" aria-label="Twitter" className="footer__social-link">Twitter</a>
              <a href="#" aria-label="LinkedIn" className="footer__social-link">LinkedIn</a>
              <a href="#" aria-label="Facebook" className="footer__social-link">Facebook</a>
            </nav>
          </div>

          <div>
            <h3 className="footer__title">Produto</h3>
            <ul className="footer__list">
              <li><a href="#features">Recursos</a></li>
              <li><a href="#how-it-works">Como Funciona</a></li>
              <li><a href="#pricing">Preços</a></li>
              <li><a href="#">Integrações</a></li>
            </ul>
          </div>

          <div>
            <h3 className="footer__title">Empresa</h3>
            <ul className="footer__list">
              <li><a href="#">Sobre Nós</a></li>
              <li><a href="#">Carreiras</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#contact">Contato</a></li>
            </ul>
          </div>

          <div>
            <h3 className="footer__title">Contato</h3>
            <ul className="footer__list">
              <li><a href="mailto:contato@cashlens.com.br">contato@cashlens.com.br</a></li>
              <li><a href="tel:+5511999999999">(11) 99999-9999</a></li>
              <li>Distrito Federal, Brasil</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2025 CashLens. Todos os direitos reservados.</p>
          <nav className="footer__legal" aria-label="Legal">
            <a href="#">Termos</a>
            <a href="#">Privacidade</a>
            <a href="#">Cookies</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
