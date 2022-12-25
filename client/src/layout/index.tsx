import { FC, ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SWRConfig } from 'swr';
import { useFetchOptions } from '../hooks/useFetchOptions';
import Footer from './footer';
import Header from './header';

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const options = useFetchOptions();

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
    });
  }, [pathname]);

  return (
    <SWRConfig value={options}>
      <Header />
      <main
        className="mt-14 animate-fade-in container px-2 mx-auto py-6 min-h-screen"
        key={pathname}
      >
        {children}
      </main>
      <Footer />
    </SWRConfig>
  );
};

export default Layout;
