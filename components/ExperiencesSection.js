'use client';

export default function ExperiencesSection() {
  const experiences = [
    {
      id: 1,
      company: 'NTT Data',
      role: 'Stage',
      period: 'En cours',
      desc: 'Agent IA de service client interne : classification des emails et messages Teams, réponses initiales et routage automatique des demandes.',
      tags: ['Python', 'Microsoft Graph', 'Teams', 'LangChain', 'Work queues'],
      link: 'https://www.nttdata.com',
      logo: '/logo.png'
    },
    {
      id: 2,
      company: '3LM Solutions',
      role: 'Stage',
      period: 'En cours',
      desc: 'Superviseur IA - Lot 5 : scoring, résumé et debriefing post-appel pour évaluer la qualité commerciale, synthétiser les appels, générer des conseils et suivre la progression.',
      tags: ['GPT-5.5', 'NestJS', 'PostgreSQL', 'pgvector', 'Qdrant'],
      link: 'https://www.3lmsolutions.com',
      logo: '/gusto2.png'
    },
    {
      id: 3,
      company: 'Commune de Tanger',
      role: 'Technical Internship',
      period: '2025',
      desc: 'Development of a Flutter app for urban lighting management with geolocation.',
      tags: ['React Native', 'PostgreSQL'],
      link: 'https://fr.tanger.ma/',
      logo: '/commune.png'
    },
    {
      id: 4,
      company: 'Activ Digital',
      role: 'Technical Internship',
      period: '2024',
      desc: 'HR application for managing employees, leave, and payroll, optimizing internal processes.',
      tags: ['React', 'Node.js', 'MongoDB', 'Express.js'],
      link: 'https://activdigital.ma/#hero',
      logo: '/activ.png'
    },
    {
      id: 5,
      company: 'ESTF',
      role: 'Academic Project',
      period: '2023-24',
      desc: 'Architecture of a real-time hotel booking platform.',
      tags: ['html', 'css', 'javascript', 'JQuery', 'MySQL'],
      link: 'http://www.est-usmba.ac.ma/',
      logo: '/estf.png'
    },
    {
      id: 6,
      company: 'D3 Soft',
      role: 'Introductory Internship',
      period: '2023',
      desc: 'Payroll management application for companies, including payslip generation and employee management.',
      tags: ['Windev', 'MariaDB'],
      link: 'https://www.d3soft.ma/',
      logo: '/d.png'
    }
  ];

  return (
    <section id="experiences" className="exp-section">
      <div className="exp-shell">
        <div className="exp-header">
          <span className="eyebrow">MY PATH</span>
          <h2>Professional Experience</h2>
          <p>Étapes clés d’un parcours mêlant innovation, développement et communication technique.</p>
        </div>

        <div className="exp-layout">
          <div className="exp-list">
            {experiences.map((exp) => (
              <div key={exp.id} className="exp-card">
                <div className="exp-card-body">
                  <div className="exp-card-header">
                    <div className="exp-card-logo">
                      <img src={exp.logo} alt={`${exp.company} logo`} />
                    </div>
                    <div className="exp-card-title">
                      <h3 className="exp-role">{exp.role}</h3>
                      <span className="exp-company">@ {exp.company}</span>
                    </div>
                    <span className="exp-period">{exp.period}</span>
                  </div>

                  <p className="exp-desc">{exp.desc}</p>

                  <div className="exp-tags">
                    {exp.tags?.map((tag) => (
                      <span key={tag} className="exp-tag">{tag}</span>
                    ))}
                  </div>

                  <a href={exp.link} target="_blank" rel="noreferrer" className="visit-chip" aria-label={`Visiter le site de ${exp.company}`}>
                    Visiter le site ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}