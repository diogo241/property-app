import '@/assets/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';

export const metadata = {
  title: 'Property Demo App',
  keywords: 'rental, property, real estate',
  description: 'Demo app to find properties',
};

export default function MainLayout({ children }) {
  return (
    <AuthProvider>
      <html>
        <body>
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
