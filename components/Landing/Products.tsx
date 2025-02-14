import React from 'react'
import MarketCard from '../ui/marketCard';
import Link from 'next/link'
import { Button } from '../ui/button';

const FeaturedProducts = [
    {
      name: "Arduino Set",
      price: 100,
      rating: 4,
      image: "https://qqtrading.com.my/image/cache/catalog/Products/Arduino/KIT/KIT-STARTER-UNO-700x700.jpg",
      category: "Electronics",
      listedBy: {
        name: "Pranay",
        avatar: "https://ui.shadcn.com/avatars/04.png",
      },
      description: "This arduino set contains jumper wires, breadboard, IR Sensor, LCD board and Servo Motor(x4)",
      listingType: true,
      slug:'arduino_set_2973'
    },
    {
      name: "Solid State Amp/Preamp Pedal",
      price: 200,
      rating: 4,
      image: "https://res.cloudinary.com/dbehu3cbs/image/upload/v1739556891/profile_images/zhzbbmrodo1kpw8dcvsv.jpg",
      category: "Robotics",
      listedBy: {
        name: "Goated Ram",
        avatar: "https://github.com/shadcn.png",
      },
      description: "The Acorn Amplifiers Solid State Amp/Preamp Pedal is an amp-in-a-box version of a certain low-watt amp that has been used by the likes of legends such as Josh Homme as a secret weapon in the studio. The pedal doubles as both a preamp and its own standalone 10w amp head complete with a dedicated speaker out. From crisp, clean highs at low gain to roaring distortion when cranked, this pedal offers a wide variety of sounds and flavors. Top it off with a 3-band EQ and a switch to add more saturation to your signal, and there's very little left to desire. They say big things often come in small packages, and this pedal is a prime example of that.",
      listingType: true,
      slug:"_solid_state_amppreamp_pedal_7807"
    },
    {
      name: "3rd Sem Notes (CS)",
      price: 300,
      rating: 4,
      image: "https://www.theopennotebook.com/wp-content/uploads/2012/05/pile-of-notes.jpg",
      category: "Books",
      listedBy: {
        name: "Himu",
        avatar: "https://res.cloudinary.com/dbehu3cbs/image/upload/v1738647532/profile_images/llgglcum5qpfldle1rgw.jpg",
      },
      description: "Complete hand written notes for sale, Computer Science II/I. Worth buying.",
      listingType: true,
      slug:'_3rd_sem_notes_(cs)_7535'
    },
    {
      name: "EDRG Set",
      price: 500,
      rating: 4,
      image: "https://m.media-amazon.com/images/I/61ug5qrIp6S._AC_UF1000,1000_QL80_.jpg",
      category: "Books",
      listedBy: {
        name: "Alvina Shrestha",
        avatar: "https://ui.shadcn.com/avatars/03.png",
      },
      description: "A buyable product that is worth your money.",
      listingType: false,
      slug:"edrg_set_6330"
    },
  ];
  
const Products = () => {
  return (
    <div className='landing_container p-5 flex flex-col gap-5 items-center'> 
   <div className='flex flex-row w-full items-center justify-around md:justify-between'>
   <h1 className=' text-xl   md:text-2xl font-inter  font-medium'>Featured Products</h1>
   <Link href={"marketplace"} scroll> <Button>Go to Marketplace</Button></Link>
   </div>
    <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-10 p-5 md:p-1 '>
    {FeaturedProducts.map((ele,index)=>{
        return <MarketCard
             key={index}
          name={ele.name}
          price={ele.price}
          rating={ele.rating}
          image={ele.image}
          category={ele.category}
          description={ele.description}
          listedBy={ele.listedBy}
          listingType={ele.listingType}
          slug={ele.slug}
        />
        
    })}
    </div>
    </div>
  )
}

export default Products