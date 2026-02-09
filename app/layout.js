import './globals.css'

// C'est ici qu'on définit le Favicon et le Titre de l'onglet
export const metadata = {
  title: 'Riham Bouchiha - Portfolio',
  description: 'Portfolio de Riham Bouchiha',
  icons: {
    icon: 'logo.png', // Assure-toi d'avoir ton image nommée favicon.ico dans le dossier 'public' ou 'app'
    // Ou si tu as un PNG : icon: '/mon-logo.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      {/* On ajoute suppressHydrationWarning pour éviter les erreurs 
        si une extension de navigateur modifie le code HTML 
      */}
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}