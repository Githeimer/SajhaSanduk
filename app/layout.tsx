import { Toaster } from 'sonner';
import "./globals.css";
import Footer from "@/components/Landing/Footer";
import {UserProvider} from "@/store/userContext"
import { Metadata } from 'next';

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = geistMono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Sajha Sanduk Dev",
  description: "Sajha Sanduk is a tool share platform dedicated for area around Kathmandu University ( KU )",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body>
        
       <UserProvider> {children}</UserProvider>
        <Toaster/>
        <Footer></Footer>
      </body>
    </html>
  );
}
// function Geist(arg0: { variable: string; subsets: string[]; }) {
//   throw new Error('Function not implemented.');
// }

