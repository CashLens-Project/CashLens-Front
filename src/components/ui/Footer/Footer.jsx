import './footer.css';

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="navbar-brand" style={{ color: '#fff', marginBottom: '1rem' }}>CashLens</div>
            <p style={{ marginBottom: '1rem' }}>
              Análise financeira inteligente para negócios de todos os tamanhos.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a href="#" title="Twitter">Twitter</a>
              <a href="#" title="LinkedIn">LinkedIn</a>
              <a href="#" title="Facebook">Facebook</a>
            </div>
          </div>
          
          <div>
            <h3 className="footer-title">Produto</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li><a href="#features">Recursos</a></li>
              <li><a href="#how-it-works">Como Funciona</a></li>
              <li><a href="#pricing">Preços</a></li>
              <li><a href="#">Integrações</a></li>
            </ul>
          </div>
          <div>
            <h3 className="footer-title">Empresa</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li><a href="#">Sobre Nós</a></li>
              <li><a href="#">Carreiras</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#contact">Contato</a></li>
            </ul>
          </div>
          <div>
            <h3 className="footer-title">Contato</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li>Email: contato@cashlens.com.br</li>
              <li>Telefone: (11) 99999-9999</li>
              <li>Distrito-Federal, Brasil</li>
            </ul>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #374151', marginTop: '2rem', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <p style={{ margin: 0 }}>© 2025 CashLens. Todos os direitos reservados.</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
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
