import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Cart, Catalog, Featured, Home, Item } from './pages'
import { Nav } from './components'
import { useState, useEffect } from 'react'

function App() {
  const [searching, setSearching] = useState(false)
  const [products, setProducts] = useState([])
  const [cartClicked, setCartClicked] = useState(false)

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts()
      setProducts(products)
    }

    getProducts()
  }, [])

  useEffect(() => {
    cartClicked
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto')
  }, [cartClicked])

  const fetchProducts = async () => {
    const productUrl = `${process.env.REACT_APP_DATABASE_URL}/catalog`

    const res = await fetch(productUrl)
    const data = await res.json()

    return data
  }

  const handleSearchToggle = () => {
    if (searching) {
      setSearching(false)
    }
  }

  var prevScrollpos = window.pageYOffset
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset
    if (prevScrollpos > currentScrollPos) {
      document.getElementById('site-nav').style.top = '0'
    } else if (
      window.scrollY > document.getElementById('site-nav').clientHeight
    ) {
      document.getElementById('site-nav').style.top = '-100px'
    }
    prevScrollpos = currentScrollPos
  }

  return (
    <Router>
      <div
        id="app"
        className={cartClicked ? 'no-scroll' : ''}
        onClick={() => handleSearchToggle()}
      >
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
            searching={searching}
            setSearching={setSearching}
            setCartClicked={setCartClicked}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog products={products} />} />
            <Route path="/catalog/:id" element={<Item products={products} />} />
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
