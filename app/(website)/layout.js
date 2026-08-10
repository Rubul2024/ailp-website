import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

export default function WebsiteLayout({ children }) {
  return (
    <>
      {/* ==========================================
          Public AILP Header
      ========================================== */}

      <Header />

      {/* ==========================================
          Public Website Content
      ========================================== */}

      <main>{children}</main>

      {/* ==========================================
          Public AILP Footer
      ========================================== */}

      <Footer />
    </>
  );
}