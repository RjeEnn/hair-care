import { useState } from 'react'
import './PaymentInformation.css'

const PaymentInformation = ({ totalPrice }) => {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [nameOnCard, setNameOnCard] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvc, setCvc] = useState('')
  const [useCard, setUseCard] = useState(true)
  const [agree, setAgree] = useState(false)
  const [mockLogin, setMockLogin] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!useCard) {
      if (mockLogin) {
        setLoading(true)
        await new Promise((r) => setTimeout(r, 2000))
        setLoading(false)
      }
    } else {
      setLoading(true)
      await new Promise((r) => setTimeout(r, 2000))
      setLoading(false)
    }
  }

  return (
    <div id="payment-info">
      <h1>Payment Information</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          name="email"
          className="checkout-input-100"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="checkout-split">
          <input
            name="firstName"
            className="checkout-input-50"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <input
            name="lastName"
            className="checkout-input-50"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="payment-selection">
          <p className="how-to-pay">How would you like to pay?</p>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              id="card"
              value="card"
              checked={useCard}
              onChange={() => setUseCard(true)}
              required
            />
            Pay With Debit Card
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="paymentMethod"
              id="paypal"
              value="paypal"
              checked={!useCard}
              onChange={() => setUseCard(false)}
            />
            Pay With PayPal
          </label>
        </div>

        <div className={`card-payment ${useCard ? '' : 'not-visible'}`}>
          <input
            name="nameOnCard"
            className="checkout-input-100"
            type="text"
            placeholder="Name on Card"
            value={nameOnCard}
            onChange={(e) => setNameOnCard(e.target.value)}
            required={useCard}
          />
          <input
            name="cardNumber"
            className="checkout-input-100"
            type="number"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required={useCard}
          />

          <div className="checkout-split">
            <input
              name="expiryDate"
              className="checkout-input-50"
              type="text"
              placeholder="Expiry Date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required={useCard}
            />
            <input
              name="cvc"
              className="checkout-input-50"
              type="number"
              placeholder="CVC"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              required={useCard}
            />
          </div>
        </div>

        <div className={`paypal-payment ${useCard ? 'not-visible' : ''}`}>
          <a
            href="https://www.google.com"
            target="_blank"
            rel="noreferrer"
            onClick={() => setMockLogin(true)}
          >
            Click here to login to Paypal
          </a>
        </div>

        <label>
          <input
            type="checkbox"
            name="agree-terms"
            id="agree-terms"
            checked={agree}
            onChange={(e) => setAgree(!agree)}
            required
          />
          <strong>I agree to Hair Care terms and conditions</strong>
        </label>
        <br />

        <button
          type="submit"
          className="process-btn"
          value="PROCESS PAYMENT"
          disabled={loading}
        >
          {loading ? (
            <div className={loading ? 'loader' : ''}></div>
          ) : (
            'PROCESS PAYMENT'
          )}
        </button>
      </form>
    </div>
  )
}

export default PaymentInformation
