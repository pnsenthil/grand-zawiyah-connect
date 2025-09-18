import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SkipLink from "../accessibility/SkipLink";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <SkipLink targetId="main-content" />
      <Header />
      <main id="main-content" role="main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
