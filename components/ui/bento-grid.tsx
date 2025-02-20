import Image from "next/image";
import { cn } from "@/lib/utils";

type BentoItem = {
  title: string;
  description: string;
  image: string;
  className?: string;
};

const bentoItems: BentoItem[] = [
  {
    title: "Marketplace for Students",
    description:
      "Marketplace for Students around KU so they can sell their items or rent as needed",
    image:
      "https://i.pinimg.com/originals/aa/11/51/aa115176122f1be0a676fd607050fc8a.gif",
    className: "md:col-span-2",
  },
  {
    title: "Payment Integration with eSewa",
    description: "Easier and Seamless Payment",
    image:
      "https://raw.githubusercontent.com/khalti/khalti-sdk-android/master/images/all.png",
  },
  {
    title: "Active Location of Product Lister",
    description: "Locate the product to get it easily.",
    image: "https://i.ibb.co/3NQHWXS/vertMap.png",
  },
  {
    title: "Personalized Dashboard",
    description: "Step back in time to explore ancient civilizations and architectural marvels.",
    image:
      "https://landing.moqups.com/img/templates/wireframes/ecommerce-dashboard.png",
    className: "md:col-span-2",
  },
];

export function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-gray-100 " id="about">
      {bentoItems.map((item, index) => (
        <div
          key={index}
          className={cn(
            "group relative overflow-hidden  rounded-none md:rounded-md shadow-md h-64",
            item.className
          )}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 z-10 pointer-events-none"  />
          {/* Image */}
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover w-full h-full"
           
          />
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-between p-4 z-20">
            <div>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
   
    </div>
  );
}
