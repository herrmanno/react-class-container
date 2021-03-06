import * as React from "react"
import { Store } from "redux"
import * as Proptypes from "prop-types"

/**
 * Provides a given Redux-Store to child components via context
 */
class Provider extends React.Component<{ store: Store<any> }, {}> {
  static childContextTypes = {
    store: Proptypes.any.isRequired
  }

  getChildContext(): any {
    return { store: this.props.store }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}

export default Provider
