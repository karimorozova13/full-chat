import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Real time chat",
  description: "Created by Kari Morozova",
};

export default function RootLayout({ children, chat }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {chat}
      </body>
    </html>
  );
}
