import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Product extends Component {
  render () {
    const { name, price } = this.props
    return (
      <li className="product">
        <h3>{ name }</h3>
        <div>${ price }</div>
      </li>
    )
  }
}

Product.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
}
