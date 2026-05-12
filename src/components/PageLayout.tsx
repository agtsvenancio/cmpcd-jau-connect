import { ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import AccessibilityToolbar from "./AccessibilityToolbar";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => (
  <>
    <SiteHeader />
    <main id="main-content" className="pt-16" tabIndex={-1}>{children}</main>
    <SiteFooter />
    <AccessibilityToolbar />
  </>
);

export default PageLayout;
