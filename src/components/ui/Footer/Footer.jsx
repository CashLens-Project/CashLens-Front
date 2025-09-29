import "./footer.css";

import logo from '../../../assets/logo.png';
import { FiTwitter, FiInstagram, FiLinkedin, FiFacebook } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="footer" aria-labelledby="footer-heading">
      <div className="footer__container">
        <h2 id="footer-heading" className="sr-only">Rodapé do site</h2>

        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">
              <img
                src={logo}
                alt="Logo CashLens"
                width={36}
                height={36}
                decoding="async"
                style={{ borderRadius: 10, objectFit: "cover" }}
              />
              <span className="footer__logo-text">CashLens</span>
            </div>
            <p className="footer__desc">
              Análise financeira inteligente para negócios de todos os tamanhos.
            </p>
            <nav className="footer__social" aria-label="Redes sociais">
              <a href="#" aria-label="Twitter" className="footer__social-link" target="_blank" rel="noreferrer">
                <FiTwitter size={18} aria-hidden="true" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" aria-label="Instagram" className="footer__social-link" target="_blank" rel="noreferrer">
                <FiInstagram size={18} aria-hidden="true" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" aria-label="LinkedIn" className="footer__social-link" target="_blank" rel="noreferrer">
                <FiLinkedin size={18} aria-hidden="true" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" aria-label="Facebook" className="footer__social-link" target="_blank" rel="noreferrer">
                <FiFacebook size={18} aria-hidden="true" />
                <span className="sr-only">Facebook</span>
              </a>
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
