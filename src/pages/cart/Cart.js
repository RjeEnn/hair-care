import { useEffect, useState } from 'react'
import { CartItems, PaymentInformation } from '../../components'
import chevronLeft from '../../assets/chevron-left.png'
import './Cart.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Cart = ({ cartId, products, setCartClicked }) => {
  const [totalPrice, setTotalPrice] = useState(0)
  const [tax, setTax] = useState(0)
  const [subtotal, setSubtotal] = useState(0)
  const [cart, setCart] = useState({ cartItems: [] })
  const [checkoutClicked, setCheckoutClicked] = useState(false)

  useEffect(() => {
    const getCart = async () => {
      const cartFromServer = await fetchCart(cartId)

      let updatedItems = [...cartFromServer.cartItems]
      let changed = false

      cartFromServer.cartItems.forEach((cartItem) => {
        let exists = products.some(
          (product) => product.id === cartItem.productId
        )

        if (exists) {
          let product = products.find(
            (product) => product.id === cartItem.productId
          )
          if (!product.inStock) {
            updatedItems = updatedItems.filter(
              (item) => item.productId !== cartItem.productId
            )
            changed = true
          }
        } else {
          updatedItems = updatedItems.filter(
            (item) => item.productId !== cartItem.productId
          )
          changed = true
        }
      })

      if (changed) {
        toast.info(
          'One or more items have gone out of stock or has become temporarily unavailable',
          {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        )
      }
      const updatedCart = await updateCartItems(updatedItems, cartId)
      setCart(updatedCart)

      let total = 0

      updatedCart.cartItems.forEach((cartItem) => {
        let product = products.find(
          (product) => product.id === cartItem.productId
        )
        total += cartItem.quantity * product.price
      })

      let tax = total * (process.env.REACT_APP_TAX_PERCENTAGE || 0.15)

      setSubtotal(total)
      setTax(tax)
      setTotalPrice(total + tax)
    }

    getCart()
  }, [cartId, products])

  useEffect(() => {
    let total = 0
    cart.cartItems.forEach((cartItem) => {
      let product = products.find(
        (product) => product.id === cartItem.productId
      )
      total += cartItem.quantity * product.price
    })

    let tax = total * (process.env.REACT_APP_TAX_PERCENTAGE || 0.15)

    setSubtotal(total)
    setTax(tax)
    setTotalPrice(total + tax)
  }, [cart, products])

  const formatter = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
  })

  const fetchCart = async (id) => {
    const cartUrl = `${process.env.REACT_APP_DATABASE_URL}/cart/${id}`

    const res = await fetch(cartUrl)
    const data = await res.json()

    return data
  }

  const updateCartItems = async (cartItems, id) => {
    const cartUrl = `${process.env.REACT_APP_DATABASE_URL}/cart/${id}`
    const body = {
      id,
      cartItems,
    }

    const res = await fetch(cartUrl, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await res.json()

    return data
  }

  const handleBack = () => {
    if (checkoutClicked) {
      setCheckoutClicked(false)
    } else {
      setCartClicked(false)
    }
  }

  const triggerRemoveToast = () => {
    toast.info(`Successfully removed item from cart`, {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  return (
    <div id="cart">
      <div id="mobile-summary" className="shopping-cart-summary">
        <div className="summary-top">
          <button className="cart-back" onClick={() => handleBack()}>
            <img src={chevronLeft} alt="back to shopping" /> Back to{' '}
            {checkoutClicked ? 'Summary' : 'Shopping'}
          </button>
          <p>Summary</p>
          <br />
          <div className="summary-text-container">
            <p className="summary-text">Subtotal</p>
            <p>{formatter.format(subtotal)}</p>
          </div>
          <div className="summary-text-container">
            <p className="summary-text">Tax</p>
            <p>{formatter.format(tax)}</p>
          </div>
        </div>
        <div className="summary-bottom">
          <div className="summary-text-container">
            <p className="summary-text">Total</p>
            <p>{formatter.format(totalPrice)}</p>
          </div>
          <button
            className={`checkout-btn ${checkoutClicked ? 'invisible-btn' : ''}`}
            onClick={() => setCheckoutClicked(true)}
            disabled={checkoutClicked}
          >
            CHECKOUT
          </button>
        </div>
      </div>
      <div className="shopping-cart">
        <button
          className="cart-back full-cart-back"
          onClick={() => handleBack()}
        >
          <img src={chevronLeft} alt="back to shopping" /> Back to{' '}
          {checkoutClicked ? 'Summary' : 'Shopping'}
        </button>
        <div className="cart-container">
          {checkoutClicked ? (
            <div className="column-flex">
              <p>Checkout</p>
              <PaymentInformation
                cartId={cart.id}
                setCartClicked={setCartClicked}
              />
            </div>
          ) : (
            <div className="cart-flex-column">
              <h1>Shopping Cart</h1>
              <CartItems
                cart={cart}
                setCart={setCart}
                products={products}
                triggerRemoveToast={triggerRemoveToast}
              />
            </div>
          )}
        </div>
      </div>
      <div id="regular-summary" className="shopping-cart-summary">
        <div className="summary-top">
          <p>Summary</p>
          <br />
          <div className="summary-text-container">
            <p className="summary-text">Subtotal</p>
            <p>{formatter.format(subtotal)}</p>
          </div>
          <div className="summary-text-container">
            <p className="summary-text">Tax</p>
            <p>{formatter.format(tax)}</p>
          </div>
        </div>
        <div className="summary-bottom">
          <div className="summary-text-container">
            <p className="summary-text">Total</p>
            <p>{formatter.format(totalPrice)}</p>
          </div>
          <button
            className={`checkout-btn ${checkoutClicked ? 'invisible-btn' : ''}`}
            onClick={() => setCheckoutClicked(true)}
            disabled={checkoutClicked || cart.cartItems.length < 1}
          >
            CHECKOUT
          </button>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
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

export default Cart
