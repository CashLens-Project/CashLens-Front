import { useEffect } from 'react';
import NavBar from '../../components/ui/NavBar.jsx';
import placeholderImg from '../../assets/placeholder.png';
import Footer from '../../components/ui/Footer.jsx';

export default function HomeView() {

  useEffect(() => {
    const anchors = document.querySelectorAll('a[href^="#"]');
    const handleClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    };
    anchors.forEach((a) => a.addEventListener('click', handleClick));
    return () => {
      anchors.forEach((a) => a.removeEventListener('click', handleClick));
    };
  }, []);

  const features = [
    {
      colorClass: 'icon-blue',
      icon: '💰',
      title: 'DRE Simplificada',
      description:
        'Visualize seu Demonstrativo de Resultados de forma clara e intuitiva, com análises automáticas de margens.',
    },
    {
      colorClass: 'icon-green',
      icon: '📈',
      title: 'Linha do Tempo de Fluxo de Caixa',
      description:
        'Antecipe entradas e saídas com nossa linha do tempo interativa para melhor planejamento financeiro.',
    },
    {
      colorClass: 'icon-purple',
      icon: '📊',
      title: 'Visualização Waterfall',
      description:
        'Entenda como cada componente impacta seu lucro final com nossa visualização em cascata.',
    },
    {
      colorClass: 'icon-yellow',
      icon: '🔄',
      title: 'Reconciliação Automática',
      description:
        'Concilie facilmente vendas com pagamentos recebidos, identificando discrepâncias automaticamente.',
    },
    {
      colorClass: 'icon-red',
      icon: '🧪',
      title: 'Simulação "E Se"',
      description:
        'Teste diferentes cenários e veja instantaneamente o impacto em seus resultados financeiros.',
    },
    {
      colorClass: 'icon-indigo',
      icon: '⚡',
      title: 'Insights de IA (Em Breve)',
      description:
        'Nossa IA identificará padrões e sugerirá oportunidades de melhoria em suas finanças.',
    },
  ];

  const steps = [
    {
      colorClass: 'step-blue',
      number: '1',
      title: 'Conecte seus dados',
      description:
        'Integre com seu ERP, planilhas ou bancos de dados. Suportamos múltiplos formatos.',
    },
    {
      colorClass: 'step-green',
      number: '2',
      title: 'Visualize dashboards',
      description:
        'Acesse análises prontas em segundos, sem necessidade de configuração complexa.',
    },
    {
      colorClass: 'step-purple',
      number: '3',
      title: 'Tome decisões melhores',
      description:
        'Identifique oportunidades e riscos com clareza para direcionar seu negócio.',
    },
  ];

  const benefits = [
    {
      colorClass: 'icon-blue',
      icon: '⏱️',
      title: 'Economize tempo',
      description: 'Reduza em até 80% o tempo gasto no fechamento financeiro mensal.',
    },
    {
      colorClass: 'icon-green',
      icon: '👁️',
      title: 'Visibilidade completa',
      description: 'Tenha clareza sobre suas margens em diferentes níveis de análise.',
    },
    {
      colorClass: 'icon-purple',
      icon: '🔮',
      title: 'Previsibilidade',
      description: 'Antecipe problemas de fluxo de caixa com semanas de antecedência.',
    },
  ];

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100%' }}>
      <NavBar />

      {/* Hero Section */}
      <section className="hero-gradient section" id="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 style={{ fontSize: '2.25rem', lineHeight: 1.2, fontWeight: 700, marginBottom: '1.5rem' }}>
                <span className="gradient-text">Entenda e projete suas vendas, lucros e despesas em um só lugar</span>
              </h1>
              <p style={{ fontSize: '1.125rem', color: 'var(--muted)', marginBottom: '2rem' }}>
                Insights em tempo real para tomar decisões financeiras mais inteligentes. Visualize seu fluxo de
                caixa e projeções com precisão.
              </p>
              <div className="button-group">
                <a href="#pricing" className="button-primary">
                  Comece seu Teste Grátis
                </a>
                <a href="#how-it-works" className="button-secondary">
                  Saiba Mais
                </a>
              </div>
            </div>
            <div className="hero-image">
              <img src={placeholderImg} alt="Dashboard Financeiro" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section">
        <div className="container">
          <h2 className="section-title">Recursos Poderosos</h2>
          <p className="section-subtitle">
            Tudo que você precisa para gerenciar suas finanças com confiança
          </p>
          <div className="grid grid-cols-2">
            {features.map((feat, idx) => (
              <div className="feature-card" key={idx}>
                <div className={`feature-icon ${feat.colorClass}`}>{feat.icon}</div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text)' }}>
                  {feat.title}
                </h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section" style={{ background: '#f9fafb' }}>
        <div className="container">
          <h2 className="section-title">Como Funciona</h2>
          <p className="section-subtitle">Integração simples e resultados imediatos</p>
          <div className="grid grid-cols-2">
            {steps.map((step, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div className={`step-circle ${step.colorClass}`} style={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: '1.5rem' }}>
                  {step.number}
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text)' }}>
                  {step.title}
                </h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>{step.description}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '4rem', textAlign: 'center' }}>
            <img src={placeholderImg} alt="Processo CashLens" style={{ width: '100%', maxWidth: '640px', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }} />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-2" style={{ alignItems: 'center' }}>
            <div>
              <h2 className="section-title">Transforme sua gestão financeira</h2>
              <div style={{ marginTop: '2rem' }}>
                {benefits.map((benefit, idx) => (
                  <div key={idx} style={{ display: 'flex', marginBottom: '1.5rem' }}>
                    <div
                      className={`feature-icon ${benefit.colorClass}`}
                      style={{ width: '2rem', height: '2rem', marginRight: '1rem', fontSize: '1rem' }}
                    >
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.25rem' }}>
                        {benefit.title}
                      </h3>
                      <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img src={placeholderImg} alt="Benefícios CashLens" style={{ width: '100%', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Call To Action */}
      <section id="pricing" className="section hero-gradient">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Comece hoje mesmo</h2>
          <p className="section-subtitle">
            Planos a partir de{' '}
            <span style={{ fontWeight: 700, color: 'var(--accent)' }}>R$299/mês</span>. Teste grátis por 14 dias, sem
            necessidade de cartão de crédito.
          </p>
          <div className="button-group" style={{ justifyContent: 'center' }}>
            <a href="#" className="button-primary">
              Comece seu Teste Grátis
            </a>
            <a href="#" className="button-secondary">
              Ver Planos Completos
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}