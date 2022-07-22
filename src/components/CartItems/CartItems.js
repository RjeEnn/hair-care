import CartItem from '../CartItem/CartItem'
import './CartItems.css'

const CartItems = ({ cart, products, setCart, triggerRemoveToast }) => {
  return (
    <div id="cart-items">
      <div className="cart-heading-container">
        <p className="cart-headings">Item</p>
        <p className="cart-headings">Size</p>
        <p className="cart-headings">Quantity</p>
        <p className="cart-headings">Price</p>
      </div>
      <div className="cart-items-container">
        {/* <CartItem cartItem={cart.cartItems[0]} products={products} /> */}
        {cart.cartItems.map((cartItem) => (
          <CartItem
            key={cartItem.productId}
            cartItem={cartItem}
            cart={cart}
            setCart={setCart}
            products={products}
            triggerRemoveToast={triggerRemoveToast}
          />
        ))}
      </div>
    </div>
  )
}

export default CartItems
