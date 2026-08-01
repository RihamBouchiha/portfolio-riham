import './globals.css';

export const metadata = {
  title: 'Riham Bouchiha - Portfolio',
  description: 'Portfolio de Riham Bouchiha',
  icons: {
    icon: '/riham-favicon.svg?v=2',
    shortcut: '/riham-favicon.svg?v=2',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
