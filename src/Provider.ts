import * as React from "react"
import {Store} from "redux"
import * as Proptypes from "prop-types"


class Provider extends React.PureComponent<{ store: Store<any> }, {}> {
    static childContextTypes = {
        store: Proptypes.any.isRequired
    }

    getChildContext() {
        return { store: this.props.store }
    }

    render() {
        return React.Children.only(this.props.children)
    }
}


export default Provider