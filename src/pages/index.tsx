import { type GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { useRouter } from "next/router";
import LandingLayout from "~/layouts/LandingLayout";

export default function Home() {
  const t = useTranslations();
  const { locale } = useRouter();
  const router = useRouter();
  const currentPath = router.asPath;
  if (!locale) {
    return "loading...";
  }

  return (
    <>
      <LandingLayout title="ACME Jobs">
        <div className="w-100 bg-neutral flex h-full flex-col items-center justify-center py-16">
          <div className="font-kalam font-regular mb-16 text-center text-6xl">
            Best Position ever found
          </div>
          <p className="mb-8 max-w-md text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button className="bg-success-light rounded-md px-16 py-4 text-sm font-medium text-white hover:bg-opacity-80 focus:shadow-none">
            Start free trial
          </button>
        </div>

        <footer className="w-100 container relative m-auto flex flex-col py-5 gap-4 lg:gap-0 lg:flex-row">
          <div className="w-100 lg:border-r border-black px-14 lg:w-1/2">
            <span className="self-center whitespace-nowrap text-2xl font-semibold">
              ACME
            </span>
            <div className="lg:ml-auto w-full lg:max-w-[70%]">
              <div className="font-kalam font-regular mb-3 text-lg">
                Ready to get started?
              </div>
              <p className="font-kalam font-light leading-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
          <div className="w-100 relative px-14 align-text-bottom lg:w-1/2">
            <div className="relative bottom-0 lg:absolute flex gap-3">
              <span>© 2010 — 2020</span>
              <span>Privacy — Terms</span>
            </div>
          </div>
        </footer>
      </LandingLayout>
    </>
  );
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const locale = ctx.locale ?? "en";

  return {
    props: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      messages: (await import(`../../locales/${locale}.json`)).default,
    },
  };
}
