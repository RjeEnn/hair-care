import './CartItem.css'
import React, { useEffect, useState } from 'react'
import shampoo from '../../assets/shampoo.png'
import increase from '../../assets/increase.png'
import decrease from '../../assets/decrease.png'
import x from '../../assets/x.png'

const CartItem = ({
  cartItem,
  products,
  cart,
  setCart,
  triggerRemoveToast,
}) => {
  const [quantity, setQuantity] = useState(0)
  const [productId, setProductId] = useState(0)
  const [price, setPrice] = useState(0)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [quantityChanging, setQuantityChanging] = useState(false)
  const [deleteClicked, setDeleteClicked] = useState(false)

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity)
      setProductId(cartItem.productId)
    }
  }, [cartItem, products])

  useEffect(() => {
    if (products && cartItem) {
      const product = products.find((product) => product.id === productId)
      if (product) {
        setPrice(product.price * quantity)
        setName(product.name)
        setCategory(product.type)
      }
    }
  }, [products, cartItem, quantity, productId])

  const handleIncrease = async () => {
    if (cart && cartItem) {
      const cartUrl = `${process.env.REACT_APP_DATABASE_URL}/cart/${cart.id}`

      if (quantity < 9) {
        setQuantityChanging(true)

        let body = { ...cart }

        body.cartItems.forEach((item) => {
          if (item.productId === productId) {
            item.quantity += 1
          }
        })

        const res = await fetch(cartUrl, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(body),
        })

        if (res.ok) {
          setQuantity(quantity + 1)
          setQuantityChanging(false)

          const data = await res.json()
          setCart(data)
        }
      }
    }
  }

  const handleDecrease = async () => {
    if (cart && cartItem) {
      const cartUrl = `${process.env.REACT_APP_DATABASE_URL}/cart/${cart.id}`

      if (quantity > 1) {
        setQuantityChanging(true)

        let body = { ...cart }

        body.cartItems.forEach((item) => {
          if (item.productId === productId) {
            item.quantity -= 1
          }
        })

        const res = await fetch(cartUrl, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(body),
        })

        if (res.ok) {
          setQuantity(quantity - 1)
          setQuantityChanging(false)

          const data = await res.json()
          setCart(data)
        }
      }
    }
  }

  const handleRemove = async () => {
    if (cart && cartItem) {
      const cartUrl = `${process.env.REACT_APP_DATABASE_URL}/cart/${cart.id}`

      let body = { ...cart }

      body.cartItems = body.cartItems.filter(
        (item) => item.productId !== productId
      )
      triggerRemoveToast()

      const res = await fetch(cartUrl, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        const data = await res.json()
        setCart(data)
        setDeleteClicked(false)
      }
    }
  }

  const formatter = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
  })

  return (
    <div id="cart-item">
      {deleteClicked ? (
        <div className="confirm-remove">
          <p>Remove {name}?</p>
          <div className="remove-answer">
            <button
              className="remove-confirm-btn"
              onClick={() => handleRemove()}
            >
              YES
            </button>
            <button
              className="remove-confirm-btn"
              onClick={() => setDeleteClicked(false)}
            >
              NO
            </button>
          </div>
        </div>
      ) : (
        <div className="cart-item-product">
          <div className="name-and-volume">
            <div className="cart-item-image-and-name">
              <img className="cart-item-image" src={shampoo} alt="product" />
              <div className="cart-item-name-and-category">
                <p className="cart-item-name">{name}</p>
                <p className="cart-item-category">{category}</p>
              </div>
            </div>
            <p className="cart-item-size">225mL</p>
          </div>
          <div className="cart-item-quantity-container">
            <input
              className="increase-decrease"
              type="image"
              name="decrease"
              src={decrease}
              alt="decrease quantity"
              onClick={() => handleDecrease()}
              disabled={quantityChanging}
            />
            <p className="cart-item-quantity">{quantity}</p>
            <input
              className="increase-decrease"
              type="image"
              name="increase"
              src={increase}
              alt="increase quantity"
              onClick={() => handleIncrease()}
              disabled={quantityChanging}
            />
          </div>
          <div className="price-and-remove">
            <p className="cart-item-total">{formatter.format(price)}</p>
            <input
              type="image"
              name="remove"
              className="remove-btn"
              src={x}
              alt="remove item"
              onClick={() => setDeleteClicked(true)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default CartItem
