
import Navbar from "@/components/Landing/Navbar";

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <Navbar></Navbar>
    <div className="landing_container flex flex-col">
     {children}
     </div>
    </>
  );
}
