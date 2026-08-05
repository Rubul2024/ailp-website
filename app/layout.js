import "./globals.css";

import AnnouncementBar from "@/components/layout/AnnouncementBar/AnnouncementBar";
import Header from "@/components/layout/Header/Header";

export const metadata = {
  title: "All India Labour Party",
  description: "Official Website of All India Labour Party",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AnnouncementBar />

        <Header />

        {children}
      </body>
    </html>
  );
}
