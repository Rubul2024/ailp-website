import "./globals.css";

export const metadata = {
  title: "All India Labour Party",
  description: "Official Website of All India Labour Party",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}