import { FaWrench, FaTools, FaHammer, FaScrewdriver } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Link } from '@remix-run/react';

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="relative flex justify-center" id="Hero_container ">
      {/* Icons Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Hammer */}
        <div className="absolute animate-float top-[10%] left-[20%] text-4xl sm:text-5xl text-blue-400">
          <FaWrench />
        </div>

        {/* Tools */}
        <div className="absolute animate-float top-[5%] left-[80%] text-4xl sm:text-5xl text-yellow-500">
          <FaTools />
        </div>

        {/* Screwdriver */}
        <div className="absolute animate-float top-[70%] left-[5%] text-5xl sm:text-6xl text-green-400">
          <FaScrewdriver />
        </div>

        {/* Hammer */}
        <div className="absolute animate-float top-[60%] left-[90%] text-4xl sm:text-5xl text-red-400">
          <FaHammer />
        </div>
      </div>

      {/* Text Content */}
      <div
        className="my-20 sm:my-28 text-4xl sm:text-6xl font-black w-[70%] sm:w-[50%] self-center flex flex-col gap-4 sm:gap-8 text-center z-10"
        id="landing_quote"
      >
        <div>
          The <span className="text-[#2D20C0]">Best</span> place to
        </div>
        <div>
          <span className="text-[#EEC120]">Rent</span> your tools
        </div>
        <div>
          or <span className="text-[#2D20C0]">Lend</span>{" "}
          <span className="relative inline-block">
            <span
              className="absolute bottom-[-5%] left-[10%] h-1/2 w-[110%] bg-slate-300 z-[-1]"
              aria-hidden="true"
            ></span>
            them
          </span>
        </div>

        {/* Button */}
        <div>
          <Link to="/marketplace">
            <Button className="p-6 bg-[#2d20c0] text-white hover:bg-[#493ee8]">
              Get Started
              <FaLocationArrow className="text-white text-xl ml-2 hover:" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
