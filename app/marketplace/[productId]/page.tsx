import React from 'react'

const Product = async ({params}:{params:Promise<{productId:String}>}) => {
    const productId= (await params).productId;

  return (
    <div className='landing_container'>
        <h1>Product: {productId}</h1>
    </div>
  )
}

export default Product;