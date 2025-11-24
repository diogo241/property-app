import '@/assets/styles/globals.css';

export const metadata = {
  title: 'Property Demo App',
  keywords: 'rental, property, real estate',
  description: 'Demo app to find properties',
};

export default function MainLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
