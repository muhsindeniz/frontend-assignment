import Header from "../components/Header";
import Footer from "../components/Footer";
import React from "react";
import Head from "next/head";

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, title }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <main className="pt-16 pl-4">{children}</main>
      <Footer />
    </div>
  );
};

export default AppLayout;
