import { SiNextdotjs, SiTypescript, SiSupabase, SiCashapp,SiCloudinary } from "react-icons/si";

export function ProjectOverview() {
  return (
    <div className="bg-gray-100 p-8 rounded-md shadow-md">
      <div className="landing_container grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section: Project Description */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            What is this project about?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            This project is designed to provide an online marketplace for
            students around Kathmandu University (KU) to buy, sell, or rent
            items seamlessly. It integrates advanced features like payment
            processing with an escrow service, location tracking for products,
            and a personalized dashboard for better user experience. The aim is
            to simplify transactions and improve accessibility for students.
          </p>
        </div>

        {/* Right Section: Tech Stack */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Tech Stack Used
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Next.js Card */}
            <div className="flex items-center bg-white shadow-md rounded-md p-4">
              <SiNextdotjs className="text-4xl text-gray-800 mr-4" />
              <span className="text-lg font-medium text-gray-700">Next.js</span>
            </div>
         
            
            {/* TypeScript Card */}
            <div className="flex items-center bg-white shadow-md rounded-md p-4">
              <SiTypescript className="text-4xl text-blue-600 mr-4" />
              <span className="text-lg font-medium text-gray-700">TypeScript</span>
            </div>
            {/* Tailwind CSS Card */}
            <div className="flex items-center bg-white shadow-md rounded-md p-4">
              <SiSupabase className="text-4xl text-teal-500 mr-4" />
              <span className="text-lg font-medium text-gray-700">Supabase</span>
            </div>
            {/* Khalti API Card */}
            <div className="flex items-center bg-white shadow-md rounded-md p-4">
              <SiCashapp className="text-4xl text-purple-600 mr-4" />
              <span className="text-lg font-medium text-gray-700">Khalti API</span>

              
            </div>
            <div className="flex items-center bg-white shadow-md rounded-md p-4">
              <SiCloudinary className="text-4xl text-blue-500 mr-4" />
              <span className="text-lg font-medium text-gray-700">Cloudinary</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
