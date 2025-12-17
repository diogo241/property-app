import '@/assets/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalProvider } from '@/context/GlobalContext';

export const metadata = {
  title: 'Property Demo App',
  keywords: 'rental, property, real estate',
  description: 'Demo app to find properties',
};

export default function MainLayout({ children }) {
  return (
    <AuthProvider>
      <GlobalProvider>
        <html>
          <body>
            <Navbar />
            {children}
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </GlobalProvider>
    </AuthProvider>
  );
}
