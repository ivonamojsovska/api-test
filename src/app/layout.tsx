import { SessionProvider } from "next-auth/react";

type HomeProps = {
  Component: React.ElementType;
  pageProps: any;
};

export default function RootLayout({ Component, pageProps }: HomeProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
