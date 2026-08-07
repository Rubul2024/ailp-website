import AnnouncementBar from "@/components/layout/AnnouncementBar/AnnouncementBar";
import Header from "@/components/layout/Header/Header";

export default function WebsiteLayout({ children }) {
  return (
    <>
      <AnnouncementBar />
      <Header />

      {children}
    </>
  );
}