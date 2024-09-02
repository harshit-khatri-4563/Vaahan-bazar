import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/navbar";
import Footer from "@/components/Footer/Footer";

import { ClerkProvider } from "@clerk/nextjs";




const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Vaahan-Bazar",
  description: "Buy the vehicle of your dreams!",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className} >
          
          <Navbar/>
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
