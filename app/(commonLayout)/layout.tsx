import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";


export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>

      <main className="min-h-screen pt-12"></main>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>

    </div>
  );
}