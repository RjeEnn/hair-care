import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { About, Cart, Catalog, Contact, Featured, Home, Item } from './pages'
import { Nav } from './components'
import { useState, useEffect } from 'react'

function App() {
  const [products, setProducts] = useState([])
  const [cartClicked, setCartClicked] = useState(false)
  const [mobileMenuClicked, setMobileMenuClicked] = useState(false)

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts()
      setProducts(products)
    }

    getProducts()
  }, [])

  useEffect(() => {
    cartClicked || (mobileMenuClicked && window.innerWidth <= 889)
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto')
  }, [cartClicked, mobileMenuClicked])

  const fetchProducts = async () => {
    const productUrl = `${process.env.REACT_APP_DATABASE_URL}/catalog`

    const res = await fetch(productUrl)
    const data = await res.json()

    return data
  }

  var prevScrollpos = window.pageYOffset
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset
    if (window.location.pathname === '/') {
      document.getElementById('site-nav').style.top = '0'
      document.getElementById('mobile-menu-btn').style.display = 'block'
      document.getElementById('mobile-cart-btn').style.display = 'block'
    } else if (prevScrollpos > currentScrollPos) {
      document.getElementById('site-nav').style.top = '0'
      document.getElementById('mobile-menu-btn').style.display = 'block'
      document.getElementById('mobile-cart-btn').style.display = 'block'
    } else if (
      window.scrollY > document.getElementById('site-nav').clientHeight
    ) {
      document.getElementById('site-nav').style.top = '-100px'
      document.getElementById('mobile-menu-btn').style.display = 'none'
      document.getElementById('mobile-cart-btn').style.display = 'none'
    }
    prevScrollpos = currentScrollPos
  }

  return (
    <Router>
      <div id="app">
        {cartClicked ? (
          <Cart
            cartId={1}
            products={products}
            setCartClicked={setCartClicked}
          />
        ) : (
          ''
        )}
        <div
          className={cartClicked ? 'overlayed' : ''}
          onClick={() => (cartClicked ? setCartClicked(false) : '')}
        ></div>
        <div>
          <Nav
            setCartClicked={setCartClicked}
            mobileMenuClicked={mobileMenuClicked}
            setMobileMenuClicked={setMobileMenuClicked}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog products={products} />} />
            <Route path="/catalog/:id" element={<Item products={products} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/featured"
              element={<Featured products={products} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
