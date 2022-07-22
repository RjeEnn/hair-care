import './Nav.css'
import catalogIcon from '../../assets/catalog-icon.png'
import menuIcon from '../../assets/menu-icon.png'
import searchIcon from '../../assets/search-icon.png'
import cartIcon from '../../assets/cart-icon.png'
import { useLocation } from 'react-router-dom'

const Nav = ({ searching, setSearching, setCartClicked }) => {
  const location = useLocation().pathname

  return (
    <div id="site-nav" className={location === '/' ? '' : 'solid-bg'}>
      <a href="/" id="hair-care-title">
        <span className="bolder">Hair</span> Care
      </a>

      <div className="menu-catalog">
        <button className="nav-link nav">
          <span>
            <img className="nav-icon" src={menuIcon} alt="" />
          </span>
          Menu
        </button>
        <a className="nav-link nav" href="/catalog">
          <span>
            <img className="nav-icon" src={catalogIcon} alt="" />
          </span>
          Catalog
        </a>
      </div>

      <div className="search-cart">
        <button
          className={`nav-link nav ${searching ? 'invisible' : ''}`}
          href="/cat"
          onClick={() => setSearching(true)}
        >
          <span>
            <img
              className="search-cart-icons"
              id="search-icon"
              src={searchIcon}
              alt=""
            />
          </span>
          Search
        </button>
        <div
          className={`search-input-container ${searching ? '' : 'invisible'}`}
        >
          <input
            className="search-input"
            type="text"
            placeholder="Search Hair Products"
          />
        </div>
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
    </div>
  )
}

export default Nav
