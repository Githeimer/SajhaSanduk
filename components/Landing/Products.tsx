import React from 'react'
import MarketCard from '../ui/marketCard';
import Link from 'next/link'
import { Button } from '../ui/button';

const FeaturedProducts = [
    {
      name: "Arduino Set",
      price: 150,
      rating: 4,
      image: "https://qqtrading.com.my/image/cache/catalog/Products/Arduino/KIT/KIT-STARTER-UNO-700x700.jpg",
      category: "Robotics",
      listedBy: {
        name: "Larry ",
        avatar: "https://ui.shadcn.com/avatars/04.png",
      },
      description: "Random product too plain dont buy jk rent rent rent",
      listingType: true,
    },
    {
      name: "Soldering Iron Set",
      price: 200,
      rating: 4,
      image: "https://a1autozone.co.uk/wp-content/uploads/2022/06/WWS-GLK9-Y02S-Soldering-Gun-Picture.png",
      category: "Robotics",
      listedBy: {
        name: "Goated Ram",
        avatar: "https://github.com/shadcn.png",
      },
      description: "Another random product, better suited for renting.",
      listingType: true,
    },
    {
      name: "3rd Sem Notes (CS)",
      price: 500,
      rating: 4,
      image: "https://www.theopennotebook.com/wp-content/uploads/2012/05/pile-of-notes.jpg",
      category: "Study",
      listedBy: {
        name: "CR Kta",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW4nZ4G82StJYNgPRfYDBKbXdo1q1jHZj-TA&s",
      },
      description: "Yet another rentable product with a good daily rate.",
      listingType: true,
    },
    {
      name: "EDRG Set",
      price: 120,
      rating: 4,
      image: "https://m.media-amazon.com/images/I/61ug5qrIp6S._AC_UF1000,1000_QL80_.jpg",
      category: "Study",
      listedBy: {
        name: "Pasale Didi",
        avatar: "https://ui.shadcn.com/avatars/03.png",
      },
      description: "A buyable product that is worth your money.",
      listingType: true,
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
        />
        
    })}
    </div>
    </div>
  )
}

export default Products