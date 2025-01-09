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
      description: "Random Ass product too plain dont buy jk rent rent rent",
      listingType: "rent",
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
      listingType: "rent",
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
      listingType: "sale",
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
      listingType: "sale",
    },
  ];
  
const Products = () => {
  return (
    <div className='landing_container p-5 flex flex-col gap-5'> 
   <div className='flex flex-row justify-between items-center'>
   <h1 className='text-2xl font-inter font-medium'>Featured Products</h1>
   <Link href={"marketplace"}> <Button>Go to Marketplace</Button></Link>
   </div>
    <div className='grid md:grid-cols-4 gap-10 p-5 md:p-1 '>
    {FeaturedProducts.map((ele,index)=>{
        return <Link href={"#"} key={index}>
             <MarketCard
          name={ele.name}
          price={ele.price}
          rating={ele.rating}
          image={ele.image}
          category={ele.category}
          description={ele.description}
          listedBy={ele.listedBy}
          listingType={ele.listingType}
        />
        </Link>
    })}
    </div>
    </div>
  )
}

export default Products