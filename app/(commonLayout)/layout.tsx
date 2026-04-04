import Footer from "@/components/layouts/Footer";
import HeroSection from "@/components/layouts/HeroSection";
import Navbar from "@/components/layouts/Navbar";


export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>

      <Navbar></Navbar>
      <HeroSection></HeroSection>
      {children}
      <Footer></Footer>

    </div>
  );
}