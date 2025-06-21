import Header from './components/include/Header';

export const metadata = {
  title: '내 앱',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
