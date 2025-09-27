const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer">
        <div className="footer-grid">
          {/* Coluna da Marca */}
          <div className="footer-brand">
            <h2 className="brand-title">CashLens</h2>
            <p className="brand-description">
              Análise financeira inteligente para negócios de todos os tamanhos.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" title="Twitter">🐦</a>
              <a href="#" className="social-link" title="LinkedIn">💼</a>
              <a href="#" className="social-link" title="Facebook">📘</a>
            </div>
          </div>

          {/* Coluna Produto */}
          <div className="footer-column">
            <h3 className="footer-title">Produto</h3>
            <ul className="footer-links">
              <li><a href="#features">Recursos</a></li>
              <li><a href="#how-it-works">Como Funciona</a></li>
              <li><a href="#pricing">Preços</a></li>
              <li><a href="#">Integrações</a></li>
            </ul>
          </div>

          {/* Coluna Empresa */}
          <div className="footer-column">
            <h3 className="footer-title">Empresa</h3>
            <ul className="footer-links">
              <li><a href="#">Sobre Nós</a></li>
              <li><a href="#">Carreiras</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#contact">Contato</a></li>
            </ul>
          </div>

          {/* Coluna Contato */}
          <div className="footer-column">
            <h3 className="footer-title">Contato</h3>
            <ul className="contact-info">
              <li><span className="contact-icon">📧</span>contato@cashlens.com.br</li>
              <li><span className="contact-icon">📞</span>(11) 99999-9999</li>
              <li><span className="contact-icon">📍</span>Distrito-Federal, Brasil</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="copyright">© 2025 CashLens. Todos os direitos reservados.</p>
          <div className="legal-links">
            <a href="#">Termos</a>
            <a href="#">Privacidade</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;