import React, { Component } from 'react'
import Product from './product'

export default class App extends Component {
    state = {
      loading: true,
      productList: [],
    }

    componentDidMount () {

    }

    render () {
      if (this.state.loading) {
        return (<div>Loading, please wait...</div>)
      }
      if (this.state.productList.length) {
        return (
          <div>
            <h1>The product list</h1>
            { this.state.products.map((product, idx) =>
              <Product key={ idx } { ...product } />
            ) }
          </div>
        )
      } else {
        return (<div>Could not load list</div>)
      }
    }
}
