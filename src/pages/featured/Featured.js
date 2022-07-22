import './Featured.css'
import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Keyboard } from 'swiper'
import shampoo from '../../assets/shampoo.png'
import arrow from '../../assets/arrow-forward.png'

const Featured = ({ products }) => {
  const [featuredIds, setFeaturedIds] = useState([])
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    const getIds = async () => {
      const featuredIdsFromServer = await fetchFeaturedIds()
      return setFeaturedIds(featuredIdsFromServer)
    }

    getIds()
  }, [])

  useEffect(() => {
    let foundProducts = []
    if (products) {
      featuredIds.forEach((id) => {
        foundProducts.push(products.find((product) => id === product.id))
      })
      setFeaturedProducts(foundProducts)
    }
  }, [featuredIds, products])

  const fetchFeaturedIds = async () => {
    const featuredUrl = `${process.env.REACT_APP_DATABASE_URL}/featured/1`

    let res = await fetch(featuredUrl)
    if (res.ok) {
      let data = await res.json()
      if ('productIds' in data) {
        return data.productIds
      }
    }
    return []
  }

  const formatter = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
  })

  return (
    <div id="featured-products">
      <Swiper
        slidesPerView={1.1}
        spaceBetween={0}
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Keyboard]}
        className="mySwiper"
      >
        {featuredProducts.map((feature) =>
          feature !== undefined ? (
            <SwiperSlide className="feature-slider" key={feature.id}>
              <div className="featured-product-container">
                <div className="feature-name-container">
                  <div className="feature-purpose">
                    <p className="purpose-head">Product Purpose</p>
                    <p>Damage Repair</p>
                    <p className="purpose-head">Product Type</p>
                    <p>{feature.type}</p>
                  </div>
                  <h1>{feature.name}</h1>
                </div>
                <div className="feature-img-container">
                  <img src={shampoo} alt="shampoo" />
                </div>
                <div className="feature-explore-container">
                  <p>{formatter.format(feature.price)}</p>
                  <a href={`/catalog/${feature.id}`}>
                    Explore{' '}
                    <span>
                      <img src={arrow} alt="arrow" />
                    </span>
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ) : (
            ''
          )
        )}
      </Swiper>
    </div>
  )
}

export default Featured
