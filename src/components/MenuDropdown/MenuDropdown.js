import './MenuDropdown.css'

const MenuDropdown = ({ show }) => {
  return (
    <div className={`${show ? 'menu-show' : 'not-visible'} dropdown-menu-menu`}>
      <div className="menu">
        <div className="menu-container">
          <a href="/about" className="type-text">
            About Us
          </a>
        </div>
        <div className="menu-container">
          <a href="/featured" className="type-text">
            Featured Products
          </a>
        </div>
        <div className="menu-container">
          <a href="/contact" className="type-text">
            Contact
          </a>
        </div>
      </div>
    </div>
  )
}

export default MenuDropdown
