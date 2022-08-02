import './Catalog.css'
import { useState, useEffect } from 'react'
import { ProductCard, FilterDropdown, SortDropdown } from '../../components'
import chevronLeft from '../../assets/chevron-left.png'
import noResults from '../../assets/no-results.png'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Catalog = ({ products }) => {
  const [displayedProducts, setDisplayedProducts] = useState(products)
  const [ascending, setAscending] = useState(true)
  const [loading, setLoading] = useState(true)
  const [types, setTypes] = useState([])
  const [selectedGenders, setSelectedGenders] = useState({
    male: true,
    female: true,
  })

  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const getTypes = () => {
      let productTypes = []
      let typeCounts = {}
      products.map((product) => productTypes.push(product.type))

      productTypes.forEach((productType) => {
        typeCounts[productType] = (typeCounts[productType] || 0) + 1
      })

      return Object.entries(typeCounts)
    }

    if (searchParams.has('q')) {
      setDisplayedProducts(
        products.filter(
          (product) =>
            product.name
              .toLowerCase()
              .includes(searchParams.get('q').toLowerCase()) ||
            product.type
              .toLowerCase()
              .includes(searchParams.get('q').toLowerCase())
        )
      )
    } else {
      setDisplayedProducts(products)
    }

    let typeCounts = getTypes()
    typeCounts.map((type) => type.push(true))
    setTypes(typeCounts)
  }, [products, searchParams])

  useEffect(() => {
    setLoading(false)
  }, [displayedProducts])

  useEffect(() => {
    setLoading(true)
    let updatedByType = []
    let updatedByGender = []

    const getUpdatedProductsByType = () => {
      let updated = []
      types.forEach((type) => {
        if (type[2] === true) {
          updated = updated.concat(
            products.filter((product) => product.type === type[0])
          )
        }
      })

      return updated
    }

    const getUpdatedProductsByGender = (productList) => {
      let updated = []

      if (selectedGenders.male === true && selectedGenders.female === true) {
        updated = productList.filter(
          (product) =>
            product.genders.includes('male') ||
            product.genders.includes('female')
        )
      } else if (selectedGenders.male === true) {
        updated = productList.filter((product) =>
          product.genders.includes('male')
        )
      } else if (selectedGenders.female === true) {
        updated = productList.filter((product) =>
          product.genders.includes('female')
        )
      } else {
        updated = []
      }

      return updated
    }

    updatedByType = getUpdatedProductsByType()
    updatedByGender = getUpdatedProductsByGender(updatedByType)

    if (searchParams.has('q')) {
      updatedByGender = updatedByGender.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(searchParams.get('q').toLowerCase()) ||
          product.type
            .toLowerCase()
            .includes(searchParams.get('q').toLowerCase())
      )
    }

    if (ascending === true) {
      setDisplayedProducts(
        updatedByGender.sort((a, b) => a.name.localeCompare(b.name))
      )
    } else {
      setDisplayedProducts(
        updatedByGender.sort((a, b) => b.name.localeCompare(a.name))
      )
    }
  }, [selectedGenders, types, products, ascending, searchParams])

  return (
    <div id="catalog">
      <div className="banner">
        <div className="name-and-back">
          <a href="/">
            <img src={chevronLeft} alt="" className="catalog-back" />
          </a>
          <h5 className="catalog-title">Catalog</h5>
        </div>

        <div className="sort-and-filter">
          <FilterDropdown
            types={types}
            setTypes={setTypes}
            products={products}
            selectedGenders={selectedGenders}
            setSelectedGenders={setSelectedGenders}
          />
          <SortDropdown ascending={ascending} setAscending={setAscending} />
        </div>
      </div>
      {searchParams.get('q') ? (
        <div className="search-query">
          <p className="lighter">
            Showing search results for '{searchParams.get('q')}'
          </p>
          <button onClick={() => navigate('/catalog', { replace: true })}>
            Clear Search?
          </button>
        </div>
      ) : (
        ''
      )}
      <div className="container-catalog">
        <div className="products">
          {displayedProducts.length <= 0 ? (
            <div
              className={`container no-products ${
                loading ? 'not-visible' : ''
              }`}
            >
              <img className="no-results" src={noResults} alt="" />
              <p>Nothing to see here</p>
              <p className="lighter">
                try adjusting you search filters to get more results
              </p>
            </div>
          ) : (
            displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Catalog
