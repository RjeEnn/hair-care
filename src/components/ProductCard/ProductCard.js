import './ProductCard.css'
import Shampoo from '../../assets/shampoo.png'
import React from 'react'

const ProductCard = ({ product }) => {
  const formatter = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
  })

  const productUrl = `/catalog/${product.id}`

  return (
    <div className="content">
      <a href={productUrl} className="product-link">
        <div className="content-overlay"></div>
        <div className="product-card">
          <img src={Shampoo} alt="" className="product-image" />
          <p className="product-name truncated">{product.name}</p>
          <p className="product-price">{formatter.format(product.price)}</p>
        </div>
        <p className="content-text fade">View Item</p>
      </a>
    </div>
  )
}

export default ProductCard
