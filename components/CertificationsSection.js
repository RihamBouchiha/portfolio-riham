'use client';

export default function CertificationsSection() {
  const parascolaire = [
    {
      title: 'Responsable Communication & Présentatrice',
      org: 'Club InnoVerse, ENIAD',
      period: '2025 - 2026',
      description: 'Responsable de la communication du club, animatrice principale du podcast InnovTalks et présentatrice officielle lors des événements.'
    },
    {
      title: 'Responsable Communication',
      org: 'Club TechRise, ENIAD',
      period: '2024 - 2025',
      description: 'Gestion de la communication digitale du club technologique, organisation d’ateliers et valorisation de projets.'
    }
  ];

  const spotlight = [
    { label: 'Øquipes', year: '2025' },
    { label: 'OrientalHack 1.0 Hackathon ESS', year: '2024' },
    { label: 'UI/UX Design | freeCodeCamp', year: '2024' },
    { label: 'Responsive Web Design | freeCodeCamp', year: '2023' },
    { label: 'Public Speaking | Girls in ICT', year: '2023' }
  ];

  return (
    <section id="certifications" className="engagement-section">
      <div className="engagement-shell">
        <div className="engagement-header">
          <span className="eyebrow">Engagement & visibilité</span>
          <h2>Prise de parole, clubs et initiatives de valorisation</h2>
          <p>Une sélection d’engagements associatifs, prises de parole et actions de valorisation pour renforcer ma visibilité technique.</p>
        </div>

        <div className="engagement-grid">
          <div className="engagement-column">
            <div className="engagement-panel">
              <div className="section-top">
                <span className="pill">Parascolaire</span>
                <h3>Clubs, communication et valorisation</h3>
                <p>Engagements associatifs et projets de visibilité portés avec constance et professionnalisme.</p>
              </div>

              <div className="stack-card">
                {parascolaire.map((item) => (
                  <div key={item.title} className="engagement-card">
                    <div className="engagement-org">{item.org}</div>
                    <h3>{item.title}</h3>
                    <div className="engagement-period">{item.period}</div>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="highlight-card">
            <div className="highlight-head">
              <span className="pill">Senior Developers Hackathon</span>
              <h3>6e place sur 45 équipes</h3>
              <p className="highlight-subtitle">Un mix de hackathons, certifications et reconnaissance pour valoriser ma pratique.</p>
            </div>

            <div className="highlight-list">
              {spotlight.map((item) => (
                <div key={item.label} className="highlight-item">
                  <span>{item.label}</span>
                  <strong>{item.year}</strong>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
