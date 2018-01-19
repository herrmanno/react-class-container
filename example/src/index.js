import * as React from "react"
import * as ReactDOM from "react-dom"
import { createStore } from "redux"
import { Provider, ReduxContainer } from "../../lib"

const store = createStore((state = {name: "", value: 0}, action) => {
    switch (action.type) {
        case "SET_NAME": return {...state, name: action.payload}
        case "SET_VALUE": return {...state, value: action.payload}
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

    componentWillReceiveReduxState(state) {
        return state.name
    }
    
    getChildProps() {
        return {
            ...this.props,
            ...this.state,
            name: this.store.getState().name,
            onChangeName: (name) =>  {
                this.store.dispatch({
                    type: "SET_NAME",
                    payload: name
                })
            }
        }
    }
}

function Counter(props) {
    return <button onClick={props.onClick}>{props.value}</button>
}

class CounterContainer extends ReduxContainer(Counter) {
    componentWillReceiveReduxState(s) {
        return s.value
    }
    
    getChildProps() {
        const state = this.store.getState()
        return {
            value: state.value,
            onClick: () => this.store.dispatch({
                type: "SET_VALUE",
                payload: state.value + 1
            })
            
        }
    }
}

class Test extends React.PureComponent {
    state = {
        show: true
    }
    
    componentWillMount() {
        setTimeout(() => this.setState({show: false}), 10000)
    }
    
    
    render() {
        return (
            <React.Fragment>
                { this.state.show ? <AppContainer title="FOO"/> : null }
                <CounterContainer/>
            </React.Fragment>
        )
    }
}

ReactDOM.render(
    <Provider store={store}>
        <Test/>
    </Provider>,
document.body.firstElementChild)