import './FilterDropdown.css'
import { useState } from 'react'
import filterMenu from '../../assets/filter-menu.png'
import chevronDown from '../../assets/chevron-down.png'

const FilterDropdown = ({
  types,
  setTypes,
  selectedGenders,
  setSelectedGenders,
}) => {
  const [show, setShow] = useState(false)

  const showDropdown = (e) => {
    setShow(true)
  }
  const hideDropdown = (e) => {
    setShow(false)
  }

  const handleTypeCheck = (currentVal, index) => {
    const updatedTypes = [...types]
    updatedTypes[index][2] = !currentVal

    setTypes(updatedTypes)
  }

  const handleGenderCheck = (gender) => {
    gender === 'male'
      ? setSelectedGenders({
          ...selectedGenders,
          male: !selectedGenders[gender],
        })
      : setSelectedGenders({
          ...selectedGenders,
          female: !selectedGenders[gender],
        })
  }

  return (
    <div id="filter-dropdown">
      <div
        className="filters-container"
        onMouseOver={showDropdown}
        onMouseLeave={hideDropdown}
      >
        <div className="filters">
          <img src={filterMenu} alt="" />
          <p>Filters</p>
          <img src={chevronDown} alt="" />
        </div>

        <div
          className={`${
            show ? 'filters-show' : 'not-visible'
          } dropdown-menu-filters`}
        >
          <div className="types">
            <h5 className="type-header">Types</h5>
            {types.map((type, index) => (
              <div
                key={type[0]}
                className="type-container"
                onClick={() => handleTypeCheck(type[2], index)}
              >
                <div className="type-selector">
                  <input type="checkbox" checked={type[2]} readOnly />
                  <p className="type-text">{type[0]}</p>
                </div>
                <p className="type-text">{type[1]}</p>
              </div>
            ))}
          </div>

          <div className="genders">
            <h5 className="type-header">Gender</h5>
            <div
              className="gender-container"
              onClick={() => handleGenderCheck('male')}
            >
              <input type="checkbox" checked={selectedGenders.male} readOnly />
              <p className="type-text">Male</p>
            </div>
            <div
              className="gender-container"
              onClick={() => handleGenderCheck('female')}
            >
              <input
                type="checkbox"
                checked={selectedGenders.female}
                readOnly
              />
              <p className="type-text">Female</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

FilterDropdown.defaultProps = {
  selectedGenders: {
    male: true,
    female: true,
  },
}

export default FilterDropdown
