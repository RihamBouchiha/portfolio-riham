'use client'; // Ajoute ceci en haut pour gérer l'état
import './globals.css'
import { useState } from 'react'

export default function RootLayout({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <html lang="fr">
      {/* On applique une classe "dark-mode" au body si isDarkMode est vrai */}
      <body suppressHydrationWarning={true} className={isDarkMode ? 'dark-mode' : ''}>
        {/* On passe la fonction de switch à tes composants via un artifice simple ou un contexte, 
            mais ici on va juste utiliser le CSS global pour faire simple */}
        {children}
      </body>
    </html>
  )
}