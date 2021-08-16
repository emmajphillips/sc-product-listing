import React, { useState } from 'react'

import products from './data/products.json'

const App = () => {
  const initialProductState = Object.entries(products)

  const [priceOrder, setPriceOrder] = useState('')
  const [productListings, setProductListings] = useState(initialProductState)

  const handleChange = (event) => {
    const order = event.target.value
    setPriceOrder(order)

    if (order === 'ascending') {
      const ascendingProducts = productListings.sort(([, aValue], [, bValue]) => {
        return aValue.price - bValue.price
      })
      setProductListings(ascendingProducts)
    }

    if (order === 'descending') {
      const descendingProducts = productListings.sort(([, aValue], [, bValue]) => {
        return bValue.price - aValue.price
      })
      setProductListings(descendingProducts)
    }

    if (!order) {
      setProductListings(initialProductState)
    }
  } 

  const handleSearch = (event) => {
    const query = new RegExp(event.target.value, 'i')
    const filteredListings = productListings.filter(([, productDetails]) => {
      return productDetails.title.match(query)
    })
    setProductListings(filteredListings)
  }

  return (
    <>
      <h1>Products</h1>
      <form>
        <select name="price-order" value={priceOrder} onChange={handleChange}>
          <option value="">Sort price</option>
          <option value="ascending">Price: Low to high</option>
          <option value="descending">Price: High to low</option>
        </select>
      </form>
      <form>
        <label>Search</label>
        <input type="text" onChange={handleSearch}/>
      </form>
      <form>
        <label>Filter by size</label>
        <input type="checkbox" name="small" value="S"/>
        <label htmlFor="small">S</label>
        <input type="checkbox" name="medium" value="M"/>
        <label htmlFor="medium">M</label>
        <input type="checkbox" name="large" value="L"/>
        <label htmlFor="large">L</label>
      </form>
      <div className="column">
        <div className="product-container">
          {productListings.map(([productId, productDetails]) => (
            <div className="product-card" key={productId}>
              <h2>{productDetails.title}</h2>
              <p>Size: {productDetails.size}</p>
              <h3>${productDetails.price}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
