import Navbar from "@/components/Landing/Navbar";
import Sidebar from "@/components/marketplace/Sidebar";
export default function MarketplaceLayout({children}: Readonly<{
    children: React.ReactNode;
  }>){
return(
 <>
  <Navbar></Navbar>
        <div className="flex flex-col lg:flex-row min-h-screen bg-background">
       <Sidebar ></Sidebar>
       {children}
</div>
        </>
)
}