import expect, { createSpy, spyOn, isSpy } from 'expect';
import deepFreeze from 'deep-freeze';
import { createStore, combineReducers } from 'redux';

import 'fetch';
import ReactDom from 'react-dom';
import React from 'react';

import {reposForUser} from './services/api';
import RepositoryList from './components/repository-list';
import Test from './components/test.jsx!';

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

const todoApp = combineReducers({
    todos,
    visibilityFilter
});

const store = createStore(
    todoApp,
    {},
    window.devToolsExtension ? window.devToolsExtension() : f => f
);



class HelloWorld extends React.Component {

    render() {
        return (
            <div>
                <h2>intojs</h2>
                <RepositoryList />
                <Test />
            </div>
        )
    }
};

ReactDom.render(<HelloWorld />, document.querySelector('#app'));








// const todoApp = (state = {}, action) => {
//     return {
//         todos: todos(
//             state.todos,
//             action
//         ),
//         visibilityFilter: visibilityFilter(
//             state.visibilityFilter,
//             action
//         )
//     };
// };

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
