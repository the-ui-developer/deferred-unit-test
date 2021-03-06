import React, { Component } from 'react'
import Product from './product'
import request from './libs/request'
export default class App extends Component {
    state = {
      loading: true,
      productGroups: [],
    }

    async componentDidMount () {
      try {
        const products = await request('/api/products/list')
        Promise.all(
          products
            .map(async product => {
              let data
              try {
                data = await request(`/api/product/details/${product.id}`)
              } catch (e) {}
              return data
                ? Object.assign(product, data)
                : {}
            })
        ).catch(e => {
          return []
        })
          .then((products) => {
            const anyMissing = false
            const productGroups =
            Object.values(
              products
                .filter(product => product.type && product.name && product.price)
                .reduce((groups, product) => {
                  if (!(product.type in groups)) {
                    groups[product.type] = []
                  }
                  groups[product.type].push(product)
                  return groups
                }, {})
            )
              .filter(group => group.length)
            this.setState({
              anyMissing,
              loading: false,
              productGroups,
            })
          })
      } catch (e) {
        console.error(e)
      }
    }

    render () {
      const { loading, productGroups } = this.state
      if (loading) {
        return (<div>Loading, please wait...</div>)
      }
      if (productGroups.length) {
        return (
          <section>
            <h1>The product list</h1>
            { productGroups.map((products, idx) => (
              <div key={ idx }>
                <h2> { products[0].type }</h2>
                <ul>
                  { products.map(product =>
                    <Product key={ product.id } { ...product } />
                  ) }
                </ul>
              </div>
            )
            ) }
          </section>
        )
      } else {
        return (<div>Could not load list</div>)
      }
    }
}
