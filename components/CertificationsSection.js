'use client';

export default function CertificationsSection() {
  const engagements = [
    {
      title: 'Responsable Communication & Présentatrice',
      org: 'Club InnoVerse, ENIAD',
      period: '2025 - 2026',
      description: 'Responsable de la communication du club, animatrice principale du podcast InnovTalks, conception, animation et production des épisodes, présentatrice officielle lors des événements.'
    },
    {
      title: 'Responsable Communication',
      org: 'Club TechRise, ENIAD',
      period: '2024 - 2025',
      description: 'Gestion de la communication digitale du club technologique, organisation d’événements et ateliers tech.'
    }
  ];

  return (
    <section
      id="certifications"
      style={{
        minHeight: '90vh',
        width: '100%',
        background: 'var(--bg-color)',
        padding: '4rem 5%',
        boxSizing: 'border-box',
        color: 'var(--text-main)'
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        .engagement-wrapper {
          max-width: 1000px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .engagement-title {
          font-size: 2.2rem;
          font-family: serif;
          margin-bottom: 0.6rem;
        }
        .engagement-subtitle {
          color: var(--text-sub);
          margin: 0 0 1.5rem;
          line-height: 1.6;
        }
        .engagement-card {
          border: 1px solid rgba(166, 128, 100, 0.25);
          border-radius: 18px;
          padding: 1.3rem 1.4rem;
          background: rgba(255,255,255,0.03);
        }
        .engagement-card h3 {
          margin: 0 0 0.35rem;
          font-size: 1.15rem;
        }
        .engagement-org {
          color: #a68064;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .engagement-period {
          color: var(--text-sub);
          font-size: 0.9rem;
          margin-bottom: 0.6rem;
        }
        .engagement-card p {
          margin: 0;
          color: var(--text-sub);
          line-height: 1.7;
          font-size: 0.95rem;
        }
        @media (max-width: 768px) {
          .engagement-title { font-size: 1.8rem; }
        }
      `}} />

      <div className="engagement-wrapper">
        <h2 className="engagement-title">Engagement, prise de parole, compétitions et certifications.</h2>
        <p className="engagement-subtitle">
          Une sélection de mes initiatives associatives, interventions publiques et expériences de valorisation de projets.
        </p>

        <div className="engagement-card">
          <h3>Clubs & engagement associatif</h3>
          <div style={{ marginTop: '1rem' }}>
            <a href="https://youtu.be/wXkBrFJWra8?si=2tmdsTbIlWIM6HQ_" target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginBottom: '0.8rem' }}>
              <img src="https://img.youtube.com/vi/wXkBrFJWra8/hqdefault.jpg" alt="InnoVerse" style={{ width: '100%', maxWidth: '360px', borderRadius: '12px' }} />
            </a>
          </div>
        </div>

        {engagements.map((item) => (
          <div key={item.title} className="engagement-card">
            <div className="engagement-org">{item.org}</div>
            <h3>{item.title}</h3>
            <div className="engagement-period">{item.period}</div>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}