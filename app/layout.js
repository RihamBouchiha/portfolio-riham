import './globals.css';

export const metadata = {
  title: 'Riham Bouchiha - Portfolio',
  description: 'Portfolio de Riham Bouchiha',
  icons: {
    icon: '/riham-favicon.svg',
    shortcut: '/riham-favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
