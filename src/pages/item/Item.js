import './Item.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper'
import increase from '../../assets/increase.png'
import decrease from '../../assets/decrease.png'
import cartIcon from '../../assets/add-to-cart.png'
import shampoo from '../../assets/shampoo.png'
import bigShampoo from '../../assets/big-shampoo.png'
import { ProductCard } from '../../components'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Item = ({ products }) => {
  const { id } = useParams()
  const [loadedProducts, setLoadedProducts] = useState([])
  const [productImages, setProductImages] = useState([])
  const [productFeatures, setProductFeatures] = useState([])
  const [metrics, setMetrics] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [benefits, setBenefits] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState(0)
  const [total, setTotal] = useState(0)
  const [productCount, setProductCount] = useState(0)

  useEffect(() => {
    if (products && products !== []) {
      setLoadedProducts(products)
      setProductCount(products.length)
      let productFound =
        products.find((product) => product.id === parseInt(id)) || {}
      if ('images' in productFound) {
        setProductImages(productFound.images)
      }
      if ('features' in productFound) {
        setProductFeatures(productFound.features)
      }
      if ('name' in productFound) {
        setName(productFound.name)
      }
      if ('price' in productFound) {
        setPrice(productFound.price)
      }
      if ('metrics' in productFound) {
        setMetrics(productFound.metrics)
      }
      if ('description' in productFound && 'benefits' in productFound) {
        setDescription(productFound.description)
        setBenefits(productFound.benefits)
      }
    }
  }, [products, id])

  useEffect(() => {
    setTotal(price * quantity)
  }, [price, quantity])

  const handleChange = (direction) => {
    if (direction === 'increase' && quantity < 9) {
      setQuantity(quantity + 1)
    } else if (direction === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const addToCart = async () => {
    const cartUrl = `${process.env.REACT_APP_DATABASE_URL}/cart/1`
    try {
      const res = await fetch(cartUrl)

      const cartFromServer = await res.json()
      let exists = false
      let isMaxQuantity = false

      if ('cartItems' in cartFromServer) {
        cartFromServer.cartItems.forEach((item) => {
          if (item.productId === parseInt(id)) {
            exists = true
            let newQuantity = item.quantity + quantity
            if (newQuantity <= 9) {
              item.quantity = newQuantity
            } else {
              isMaxQuantity = true
            }
          }
        })

        if (!exists) {
          cartFromServer.cartItems.push({
            productId: parseInt(id),
            quantity: quantity,
          })
        }

        if (!isMaxQuantity) {
          const req = await fetch(cartUrl, {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(cartFromServer),
          })

          if (req.ok) {
            setQuantity(1)
            toast.success(`Successfully added ${name} to cart`, {
              position: 'bottom-left',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          }
        } else {
          toast.error(
            'Failed to add item to cart - only 9 of each item may be added to the cart at a time.',
            {
              position: 'bottom-left',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          )
        }
      }
    } catch (error) {
      toast.error('Oops - something went wrong.', {
        position: 'bottom-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  const formatter = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
  })

  return (
    <div id="catalog-item">
      <div className="item-container grid-p-1">
        <div className="item-features">
          <p className="features-heading">Product Features</p>
          <ul>
            {productFeatures.map((feature) => (
              <li>{feature}</li>
            ))}
          </ul>
        </div>

        <Swiper
          cssMode={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={shampoo} alt="shampoo" />
          </SwiperSlide>
          {productImages.map((image) => (
            <SwiperSlide key={image}>
              <img src={image} alt={image} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="item-quantity-and-cart">
          <div className="item-quantity">
            <p>Quantity</p>
            <div className="item-quantity-container">
              <input
                className="increase-decrease"
                type="image"
                name="decrease"
                src={decrease}
                alt="decrease quantity"
                onClick={() => handleChange('decrease')}
              />
              <p className="item-amount">{quantity}</p>
              <input
                className="increase-decrease"
                type="image"
                name="increase"
                src={increase}
                alt="increase quantity"
                onClick={() => handleChange('increase')}
              />
            </div>
          </div>
          <div className="item-add-cart">
            <p className="lighter">Add to Cart</p>
            <input
              className="add-cart-btn"
              type="image"
              name="add-item"
              src={cartIcon}
              alt="add to cart"
              onClick={() => addToCart()}
            />
            <p>{formatter.format(total)}</p>
          </div>
        </div>
        <p className="item-name">{name}</p>
      </div>
      <div className="item-container grid-p-2">
        <div className="img-shot-and-metrics">
          <div className="img-shot">
            <img src={shampoo} alt="shampoo" />
          </div>
          <div className="item-metrics">
            {metrics.map((metric) => (
              <>
                <p className="metric-text">{metric}</p>
                <hr />
              </>
            ))}
          </div>
        </div>
        <div className="item-description-and-benefits">
          <div className="item-description">
            <p className="item-text-heading">- Description</p>
            <p className="item-text">{description}</p>
          </div>
          <div className="item-benefits">
            <p className="item-text-heading">- Benefits</p>
            <p className="item-text">{benefits}</p>
          </div>
        </div>
      </div>
      <div className="grid-p-3">
        <div className="item-container features-display">
          {productFeatures.map((feature, index) => (
            <>
              <p className="lighter">- 0{index + 1}</p>
              <p className="indent">{feature}</p>
            </>
          ))}
        </div>
        <div className="big-shot">
          <img src={bigShampoo} alt="shampoo" />
        </div>
      </div>
      <div className="item-container p-4">
        <h2 className="lighter">Related Products</h2>
        <div className="related-products">
          {productCount > 0 ? (
            <ProductCard
              product={loadedProducts[Math.floor(Math.random() * productCount)]}
            />
          ) : (
            ''
          )}
          {productCount > 0 ? (
            <ProductCard
              product={loadedProducts[Math.floor(Math.random() * productCount)]}
            />
          ) : (
            ''
          )}
          {productCount > 0 ? (
            <ProductCard
              product={loadedProducts[Math.floor(Math.random() * productCount)]}
            />
          ) : (
            ''
          )}
          {productCount > 0 ? (
            <ProductCard
              product={loadedProducts[Math.floor(Math.random() * productCount)]}
            />
          ) : (
            ''
          )}
        </div>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default Item
