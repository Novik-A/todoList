import {todolistsAPI, TodoType} from "../../api/todolists-api";
import {Dispatch} from "redux";


const initialState: TodolistDomainType[] = []

export const todoListsReducer = (state: TodolistDomainType[] = initialState, action: ActionType): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODOS':
            return action.todos.map(tl => ({...tl, filter: "all"}))
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: 'all'}, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return state
    }
}

export const removeTodoListAC = (id: string) => ({ type: "REMOVE-TODOLIST", id } as const)
export const addTodoListAC = (todolist: TodoType) => ({ type: "ADD-TODOLIST", todolist } as const)
export const changeTodoListTitleAC = (id: string, title: string) => ({ type: "CHANGE-TODOLIST-TITLE", id, title } as const)
export const changeTodoListFilterAC = (id: string, filter: FilterValuesType) => ({ type: "CHANGE-TODOLIST-FILTER", id, filter } as const)
export const setTodosAC = (todos: Array<TodoType>) => ({ type: 'SET-TODOS', todos} as const)


// thunks

export const setTodosTC = () => (dispatch: Dispatch<ActionType>) => {
    // 1. Side effect
    todolistsAPI.getTodo()
        .then((res) => {
            let todos = res.data
            // 2. dispatch action(thunk)
            dispatch(setTodosAC(todos))
        })
}
export const removeTodosTC = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsAPI.deleteTodo(todolistId)
        .then(() => {
            dispatch(removeTodoListAC(todolistId))
        })
}
export const addTodosTC = (title: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsAPI.createTodo(title)
        .then((res) => {
            dispatch(addTodoListAC(res.data.data.item))
        })
}
export const updateTodosTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsAPI.updateTodoTitle(todolistId, title)
        .then(() => {
            dispatch(changeTodoListTitleAC(todolistId, title))
        })
}

// types

export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
export type AddTodoListActionType = ReturnType<typeof addTodoListAC>
export type SetTodosActionType = ReturnType<typeof setTodosAC>

type ActionType =
    | RemoveTodoListActionType
    | AddTodoListActionType
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | SetTodosActionType

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodoType & {
    filter: FilterValuesType
}