import { Button } from "@/components/ui/button"
import Link  from "next/link"
import { FaGithub } from "react-icons/fa";



export default function Footer() {
  return (
    <footer className="bg-[#141414] text-white py-6">
      <div className="landing_container mx-auto flex justify-between items-center px-3">
        {/* Left side: Project info */}
        <div>
          <p className="text-3xl font-[inter] font-semibold">Sajha <span className="text-[#493be7]">Sanduk</span></p>
          <p className="text-sm">3rd Semester Project KU</p>
        </div>

        {/* Right side: Links */}
        <div className="flex flex-col items-center justify-center text-left lg:flex-row ">
          <Link href="/" >
            <Button variant="link" className=" text-white ">Home</Button>
          </Link>
          <Link href="/dashboard" >
            <Button variant="link" className=" text-white ">Dashboard</Button>
          </Link>
          <Link href="/marketplace">
            <Button variant="link" className="text-white ">Marketplace</Button>
          </Link>
          <Link href={"https://tally.so/r/3EN1el"}>
          <Button variant="link" className="text-white ">Contact</Button>
          </Link>
        </div>
      </div>

      {/* Bottom section: Copyright */}
     
      <div className="text-center text-sm text-gray-600 mt-4">
       <div className="landing_container flex flex-col justify-center items-center gap-2">
       <p>&copy; {new Date().getFullYear()} Sajha Sanduk. All rights reserved.</p>
       <Link href={"https://github.com/Githeimer/SajhaSanduk"} prefetch={false}>
       <div className="flex flex-col justify-center items-center">
        <FaGithub className="text-white text-3xl"></FaGithub>
        <h2 className="text-white">Link to Github</h2>
        </div></Link>
       </div>
      </div>
    </footer>
  )
}
