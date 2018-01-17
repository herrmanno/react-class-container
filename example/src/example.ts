import Container from "../../src/Container"
import ReduxContainer from "../../src/ReduxContainer"
import * as React from "react"

type ReduxState = {
    data: {
        value: number
    }
}

type Props = {
    color?: string
    value: number
}

function MyComponent(p: Props) {
    return null
}


interface ContainerProps {
    value: number
}

class MyContainer extends Container(MyComponent)<ContainerProps> {
    getChildProps() {
        return {
            ...this.props,
            color: "true",
        }
    }
}

class MyReduxContainer extends ReduxContainer(MyComponent)<ReduxState, {foo: string}> {
    getChildProps() {
        return {
            ...this.store.getState().data,
            color: "true",
        }
    }
}