import '@/styles/globals.css';
import { Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata = {
  title: 'Finanza Ya 💰',
  description:
    'Finanza Ya es una aplicación web para gestionar tus finanzas personales de manera fácil, intuitiva y segura. Registra ingresos, egresos, administra usuarios y visualiza reportes completos.',
  authors: [{ name: 'Sebastian Mena' }],
  keywords: [
    'Finanzas',
    'Gestión financiera',
    'Control de gastos',
    'Ingresos',
    'Egresos',
    'Reportes',
    'Finanza Ya',
  ],
  openGraph: {
    title: 'Finanza Ya 💰',
    description:
      'Gestiona tus finanzas personales con Finanza Ya. Registra ingresos, egresos y genera reportes detallados.',
    url: 'https://prevalentware-technical-test.vercel.app/',
    siteName: 'Finanza Ya',
    images: [
      {
        url: 'https://res.cloudinary.com/dafsjo7al/image/upload/v1757344358/Macbook-Air-localhost_l13rse.png',
        width: 1200,
        height: 630,
        alt: 'Finanza Ya Landing Page',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <ReactQueryProvider>{children}</ReactQueryProvider>

        <Toaster position='top-right' reverseOrder={false} />
      </body>
    </html>
  );
}
