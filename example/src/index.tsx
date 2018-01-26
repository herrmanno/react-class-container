import * as React from "react"
import * as ReactDOM from "react-dom"
import { createStore } from "redux"
import { Provider, ReduxContainer } from "../../lib"

type State = {
    todos: Array<Todo>
    filter: Filter
}
type Todo = { id: string, text: string, done: boolean }
type Filter = "ALL" | "DONE" | "NOT_DONE"

const store = createStore((state: State = { todos: [], filter: "ALL" }, action) => {
    switch (action.type) {
        case "ADD_TODO": {
            return {
                ...state,
                todos: [
                    { text: action.payload.text, done: false, id: Math.random().toString(36) },
                    ...state.todos,
                ]
            }
        }
        case "TOGGLE_TODO": {
            const idx = state.todos.findIndex(todo => todo.id === action.payload.id)
            if (idx === -1) {
                return state
            } else {
                return {
                    ...state,
                    todos: [
                        ...state.todos.slice(0, idx),
                        { ...state.todos[idx], done: !state.todos[idx].done },
                        ...state.todos.slice(idx + 1),
                    ]
                }
            }
        }
        case "FILTER": {
            return {
                ...state,
                filter: action.payload.filter,
            }
        }
        case "RESTORE_STATE": {
            return action.payload.state
        }
        default: return state
    }
})

store.subscribe(() => {
    const data = JSON.stringify(store.getState())
    localStorage.setItem("data", data)
})

function TodoApp() {
    return (
        <div>
            <TodoInputContainer/>
            <TodoListContainer/>
            <TodoFilterbarContainer/>
        </div>
    )

}

class TodoAppContainer extends ReduxContainer(TodoApp) {

    componentWillMount() {
        try {

            const state = JSON.parse(localStorage.getItem("data"))
            this.store.dispatch({
                type: "RESTORE_STATE",
                payload: { state }
            })
        } catch (error) {
            // don't to anything
        }
    }

    getChildProps() { return {} }
}

function TodoInput(props: {value: string, onChange: React.ChangeEventHandler<any>, onSubmit: React.FormEventHandler<any>}) {
    return (
        <form onSubmit={props.onSubmit}>
            <input
                value={props.value}
                onChange={props.onChange} />
            <button
                type="submit"
                disabled={!props.value}
            >
                Add
            </button>
        </form>
    )
}

class TodoInputContainer extends ReduxContainer(TodoInput) {

    state = {
        value: ""
    }

    onChange = (e: React.ChangeEvent<any>) => {
        this.setState({ value: e.currentTarget.value })
    }

    onSubmit = (e: React.FormEvent<any>) => {
        e.preventDefault()
        this.store.dispatch({
            type: "ADD_TODO",
            payload: { text: this.state.value }
        })
        this.setState({ value: "" })
    }

    componentWillReceiveReduxState() {
        return null
    }

    getChildProps() {
        return {
            value: this.state.value,
            onChange: this.onChange,
            onSubmit: this.onSubmit
        }
    }
}

function TodoList(props: { todos: Array<Todo>, onToggleTodo(id: string): any }) {
    return (
        <ul>
            { props.todos.map(todo =>
                <li
                    key={todo.id}
                    style={{ textDecoration: todo.done ? "line-through" : null}}
                    onClick={() => props.onToggleTodo(todo.id)}
                >
                    { todo.text }
                </li>
            )}
        </ul>
    )
}

class TodoListContainer extends ReduxContainer(TodoList)<State> {
    getFilteredTodos() {
        const { todos, filter } = this.store.getState()
        return todos.filter(todo => {
            switch (filter) {
                case "ALL": return true
                case "DONE": return todo.done
                case "NOT_DONE": return !todo.done
            }
        })
    }

    onToggletodo = (id: string) => {
        this.store.dispatch({
            type: "TOGGLE_TODO",
            payload: { id }
        })
    }

    getChildProps() {
        return {
            todos: this.getFilteredTodos(),
            onToggleTodo: this.onToggletodo
        }
    }
}

function TodoFilterbar(props: {activeFilter: Filter, onFilter(filter: Filter): any}) {
    return (
        <div>
            { ["ALL", "DONE", "NOT_DONE"].map((type: Filter) =>
                <button
                    key={type}
                    disabled={type === props.activeFilter}
                    onClick={() => props.onFilter(type)}
                >
                    { type }
                </button>
            )}
        </div>
    )
}

class TodoFilterbarContainer extends ReduxContainer(TodoFilterbar)<State> {
    onFilter = (filter: Filter) => {
        this.store.dispatch({
            type: "FILTER",
            payload: { filter }
        })
    }

    componentWillReceiveReduxState(state: State) {
        return state.filter
    }

    getChildProps() {
        return {
            activeFilter: this.store.getState().filter,
            onFilter: this.onFilter,
        }
    }
}

ReactDOM.render(
    <Provider store={store}>
        <TodoAppContainer/>
    </Provider>,
document.body.firstElementChild)