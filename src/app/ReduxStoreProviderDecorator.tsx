import React from 'react'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {tasksReducer} from '../features/TodolistsList/tasks-reducer'
import {todoListsReducer} from '../features/TodolistsList/todolists-reducer'
import {AppRootStateType} from "./store";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer
})

const initialGlobalState = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus: "idle"},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus: "loading"}
    ] ,
    tasks: {
        "todolistId1": [
            {
                id: '1',
                title: 'CSS',
                description: '',
                todoListId: '',
                order: 1,
                status: 0,
                priority: 1,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: '2',
                title: 'JS',
                description: '',
                todoListId: '',
                order: 1,
                status: 1,
                priority: 1,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: '3',
                title: 'React',
                description: '',
                todoListId: '',
                order: 1,
                status: 2,
                priority: 1,
                startDate: '',
                deadline: '',
                addedDate: ''
            }
        ],
        "todolistId2": [
            {
                id: '1',
                title: 'bread',
                description: '',
                todoListId: '',
                order: 1,
                status: 0,
                priority: 1,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: '2',
                title: 'milk',
                description: '',
                todoListId: '',
                order: 1,
                status: 1,
                priority: 1,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: '3',
                title: 'tea',
                description: '',
                todoListId: '',
                order: 1,
                status: 2,
                priority: 1,
                startDate: '',
                deadline: '',
                addedDate: ''
            }
        ]
    },
    app: {
        status: 'idle',
        error: null
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>
)


