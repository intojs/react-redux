import expect, { createSpy, spyOn, isSpy } from 'expect';
import deepFreeze from 'deep-freeze';
import { createStore, combineReducers } from 'redux';

import ReactDom from 'react-dom';
import React from 'react';


const visibilityFilter = (state = 'SHOW_ALL', action = {}) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            }
            return Object.assign({}, state, {
                completed: !state.completed
            });
        // return {
        //     ...state,
        //      completed: !state.completed    
        // }
        default:
            return state;
    }
};

const todos = (state = [], action = {}) => {
    switch (action.type) {
        case 'ADD_TODO':
            return state.concat(todo(undefined, action));
        //return [
        //    ...state,
        //    todo(undefined, action)
        //];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
        default:
            return state;
    }
};

const todoAppReducer = combineReducers({
    todos,
    visibilityFilter
});

const store = createStore(
    todoAppReducer,
    {},
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

const FilterLink = ({
    filter,
    currentFilter,
    children
}) => {
    if (filter === currentFilter) {
        return <span>{children}</span>;
    }
    return (
        <a href="#" onClick={e => {
            e.preventDefault();
            store.dispatch({
                type: 'SET_VISIBILITY_FILTER',
                filter
            });
        } }>
            {children}
        </a>
    );
};

const getVisibleTodos = (
    todos,
    filter
) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(
                t => t.completed
            );
        case 'SHOW_ACTIVE':
            return todos.filter(
                t => !t.completed
            );
    }
};

let nextTodoId = 0;

class TodoApp extends React.Component {
    render() {
        const {
            todos,
            visibilityFilter
        } = this.props;
        const visibleTodos = getVisibleTodos(
            todos,
            visibilityFilter
        );
        return (
            <div>
                <h1>Todo Application</h1>
                <input type="text" ref={node => {
                    this.input = node;
                } } />
                <button onClick={() => {
                    store.dispatch({
                        type: 'ADD_TODO',
                        text: this.input.value,
                        id: nextTodoId++
                    });
                    this.input.value = '';
                } }>
                    Add todo
                </button>
                <ul>
                    {
                        visibleTodos.map(todo =>
                            <li key={todo.id}
                                onClick={() => {
                                    store.dispatch({
                                        type: 'TOGGLE_TODO',
                                        id: todo.id
                                    });
                                } }
                                style = {{
                                    textDecoration:
                                    todo.completed ?
                                        'line-through' :
                                        'none'
                                }}>
                                {todo.text}
                            </li>
                        )
                    }
                </ul>
                <p>
                    Show:
                    {' '}
                    <FilterLink
                        filter="SHOW_ALL"
                        currentFilter = {visibilityFilter}
                        >
                        All
                    </FilterLink>
                    {' '}
                    <FilterLink
                        filter="SHOW_ACTIVE"
                        currentFilter = {visibilityFilter}
                        >
                        Active
                    </FilterLink>
                    {' '}
                    <FilterLink
                        filter="SHOW_COMPLETED"
                        currentFilter = {visibilityFilter}

                        >
                        Completed
                    </FilterLink>
                </p>
            </div>
        )
    }
}

const render = () => {
    ReactDom.render(
        <TodoApp
            {...store.getState() }
            />,
        document.getElementById('app')
    );
};

store.subscribe(render);

render();

const testAddTodo = () => {
    const stateBefore = [];
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Learn Redux'
    };
    const stateAfter = [{
        id: 0,
        text: 'Learn Redux',
        completed: false
    }];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter);
};


const testToggleTodo = () => {
    const stateBefore = [{
        id: 0,
        text: 'Learn Redux',
        completed: false
    }, {
            id: 1,
            text: 'Learn React',
            completed: false
        }];
    const action = {
        type: 'TOGGLE_TODO',
        id: 1
    };
    const stateAfter = [{
        id: 0,
        text: 'Learn Redux',
        completed: false
    }, {
            id: 1,
            text: 'Learn React',
            completed: true
        }];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter);
};

testAddTodo();

testToggleTodo();

console.log('All tests passed.');