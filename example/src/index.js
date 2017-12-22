import * as React from "react"
import * as ReactDOM from "react-dom"
import { createStore } from "redux"
import { Provider, ReduxContainer } from "../../lib"

const store = createStore((state = "", action) => {
    switch (action.type) {
        case "SET_NAME": return action.payload
        default: return state
    }
})


/*
    PROPS
    -----
    ready: boolean
    title: string
    name: string
    onChangeName(name: string): any
*/

function App(props) {
    return <main>
        {!props.ready ? (
            <span>Waiting...</span>
        ) : (
            <React.Fragment>
                <h2>{ props.title }</h2>
                <input value={props.name} onChange={e => props.onChangeName(e.target.value)} />
                <code>{ props.name }</code>
            </React.Fragment>
        )}
    </main>
}

class AppContainer extends ReduxContainer(App) {
    state = {
        ready: false
    }

    componentWillMount() {
        setTimeout(
            () => this.setState({ ready: true}),
            1000)
    }
    
    getChildProps() {
        return {
            ...this.props,
            ...this.state,
            name: this.store.getState(),
            onChangeName: (name) =>  {
                this.store.dispatch({
                    type: "SET_NAME",
                    payload: name
                })
            }
        }
    }
}

ReactDOM.render(
    <Provider store={store}>
        <AppContainer title="FOO_BAR"/>
    </Provider>,
document.body)