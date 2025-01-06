import ClientLayout from './ClientLayout';

export const metadata = {
  title: 'Your App Name',
  description: 'Your app description',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientLayout>{children}</ClientLayout>;
}