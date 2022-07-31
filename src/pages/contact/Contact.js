import { useState } from 'react'
import './Contact.css'
import model from '../../assets/template-person.png'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Contact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    setName('')
    setEmail('')
    setMessage('')

    toast.success(
      `Thanks for your feedback! We'll be in touch with you shortly.`,
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

  return (
    <div id="contact">
      <div className="contact-container contact-flex">
        <div className="contact-form">
          <p className="in-touch">Let's get in touch</p>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="name">Name</label>
            <input
              name="name"
              className=""
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="email">Email</label>
            <input
              name="email"
              className=""
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="contact-message"
              placeholder="Enter your message here"
              cols="30"
              rows="10"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>

            <button type="submit">SEND MESSAGE</button>
          </form>
        </div>
        <div className="contact-img">
          <img src={model} alt="person" />
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

export default Contact
