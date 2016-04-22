import expect, { createSpy, spyOn, isSpy } from 'expect';
import deepFreeze from 'deep-freeze';

import { combineReducers } from 'redux';

const todoApp = combineReducers({
	todos,
	
});

const todos = (state = [], action = {}) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ];
            // Alternative method using concat.
            // return state.concat({
            // 	id: action.id,
            // 	text: action.text,
            // 	completed: false
            // });
            break;
        case 'TOGGLE_TODO':
        	return state.map((todo) => {
        		if (action.id === todo.id) {
        			// Alternative.
        			// return Object.assign({}, todo, {
        			// 	completed: !todo.completed
        			// });

        			return {
        				...todo,
        				completed: !todo.completed
        			}
        		} else {
        			return todo;
        		}
        	});
        default:
            return state;
    }
};

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
    },{
        id: 1,
        text: 'Learn React',
        completed: false
    }];
    const action  = {
    	type: 'TOGGLE_TODO',
    	id: 1
    };
    const stateAfter = [{
        id: 0,
        text: 'Learn Redux',
        completed: false
    },{
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
