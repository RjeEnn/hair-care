import './SortDropdown.css'
import { useState } from 'react'
import filterMenu from '../../assets/filter-menu.png'
import chevronDown from '../../assets/chevron-down.png'

const SortDropdown = ({ ascending, setAscending }) => {
  const [show, setShow] = useState(false)

  const showDropdown = (e) => {
    setShow(true)
  }
  const hideDropdown = (e) => {
    setShow(false)
  }

  return (
    <div id="sort-dropdown">
      <div
        className="s-container"
        onMouseOver={showDropdown}
        onMouseLeave={hideDropdown}
      >
        <div className="s">
          <img src={filterMenu} alt="" />
          <p>Sort By</p>
          <img src={chevronDown} alt="" />
        </div>

        <div
          className={`${show ? 'sort-show' : 'not-visible'} dropdown-menu-sort`}
        >
          <div className="sort">
            <div
              className={`sort-container ${ascending ? 'highlight' : ''}`}
              onClick={() => setAscending(true)}
            >
              <p className="type-text">Ascending</p>
            </div>
            <div
              className={`sort-container ${ascending ? '' : 'highlight'}`}
              onClick={() => setAscending(false)}
            >
              <p className="type-text">Descending</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

SortDropdown.defaultProps = {
  ascending: true,
}

export default SortDropdown
