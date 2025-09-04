import './styles/globals.css';
import Header from '../components/Header';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-custom text-custom transition-colors duration-300">
        <Header />
        <main className="px-4 sm:px-6 lg:px-8 py-6">{children}</main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
