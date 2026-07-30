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
            <article className="feature-card">
              <div className="feature-media">
                <a href="https://youtu.be/wXkBrFJWra8?si=2tmdsTbIlWIM6HQ_" target="_blank" rel="noreferrer">
                  <img src="https://img.youtube.com/vi/wXkBrFJWra8/hqdefault.jpg" alt="InnoVerse" />
                </a>
              </div>
              <div className="feature-body">
                <span className="pill">Clubs & engagement</span>
                <h3>InnoVerse • ENIAD</h3>
                <p>Animation de podcast, communication digitale et valorisation de projets innovants avec un focus sur l’impact et le partage.</p>
                <div className="meta-row">
                  <span>Podcast</span>
                  <span>Production</span>
                </div>
              </div>
            </article>

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

          <aside className="highlight-card">
            <div className="highlight-head">
              <span className="pill">Senior Developers Hackathon</span>
              <h3>6e place sur 45 équipes</h3>
              <p className="highlight-subtitle">Résultats marquants, hackathons et certifications valorisées sur le plan technique.</p>
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
