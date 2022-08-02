import './Nav.css'
import catalogIcon from '../../assets/catalog-icon.png'
import menuIcon from '../../assets/menu-icon.png'
import menu from '../../assets/menu.png'
import searchIcon from '../../assets/search-icon.png'
import cartIcon from '../../assets/cart-icon.png'
import mobileCart from '../../assets/cart-mobile.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import MenuDropdown from '../MenuDropdown/MenuDropdown'

const Nav = ({ setCartClicked, mobileMenuClicked, setMobileMenuClicked }) => {
  const location = useLocation().pathname
  const navigate = useNavigate()

  const [searchItem, setSearchItem] = useState('')
  const [show, setShow] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()

    navigate(`catalog?q=${searchItem}`)
    setMobileMenuClicked(false)
  }

  return (
    <div
      id="site-nav"
      className={`${location === '/' ? '' : 'solid-bg'} ${
        mobileMenuClicked ? 'nav-menu-expand' : ''
      }`}
    >
      <a href="/" id="hair-care-title">
        <span className="bolder">Hair</span> Care
      </a>

      <div className="menu-catalog">
        <button className="nav-link nav" onClick={() => setShow(!show)}>
          <span>
            <img className="nav-icon" src={menuIcon} alt="" />
          </span>
          Menu
        </button>
        <MenuDropdown show={show} />
        <a className="nav-link nav" href="/catalog">
          <span>
            <img className="nav-icon" src={catalogIcon} alt="" />
          </span>
          Catalog
        </a>
      </div>

      <div className="search-cart">
        <form onSubmit={(e) => handleSearch(e)} className="search-form">
          <input
            className="search-input"
            type="text"
            placeholder="Search Hair Products"
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
          />
          <button type="submit" disabled={searchItem === ''}>
            <img src={searchIcon} alt="search" />
          </button>
        </form>
        <button
          className="nav-link nav"
          id="cart-btn"
          onClick={() => setCartClicked(true)}
        >
          <span>
            <img className="search-cart-icons" src={cartIcon} alt="" />
          </span>
          Cart
        </button>
      </div>

      <div className="mobile-menu">
        <hr className={mobileMenuClicked ? '' : 'invisible'} />
        <input
          id="mobile-menu-btn"
          type="image"
          name="mobile menu"
          src={menu}
          alt="mobile menu"
          onClick={() => setMobileMenuClicked(!mobileMenuClicked)}
        />
        <input
          id="mobile-cart-btn"
          type="image"
          name="mobile cart"
          src={mobileCart}
          alt="mobile cart"
          onClick={() => setCartClicked(true)}
        />
        <div
          className={`mobile-menu-items ${
            mobileMenuClicked ? '' : 'invisible'
          }`}
        >
          <form onSubmit={(e) => handleSearch(e)} className="search-form">
            <input
              className="search-input"
              type="text"
              placeholder="Search Hair Products"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
            />
            <button type="submit" disabled={searchItem === ''}>
              <img src={searchIcon} alt="search" />
            </button>
          </form>
          <a href="/about">About</a>
          <a href="/featured">Featured Products</a>
          <a href="/catalog">Product Catalog</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
    </div>
  )
}

export default Nav
