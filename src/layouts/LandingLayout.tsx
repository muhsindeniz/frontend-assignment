import Head from "next/head";
import Header from "~/components/Header/Header";

interface LandingLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children, title }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <main className="pt-16">{children}</main>
    </div>
  );
};

export default LandingLayout;
