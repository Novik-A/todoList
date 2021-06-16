import {todolistsAPI, TodoType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {SetIsLoggedInActionType} from "../Login/auth-reducer";


const initialState: TodolistDomainType[] = []

export const todoListsReducer = (state: TodolistDomainType[] = initialState, action: ActionType): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODOS':
            return action.todos.map(tl => ({...tl, filter: "all", entityStatus: 'idle'}))
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        case 'login/SET-IS-LOGGED-IN':
            return action.value ? state : []
        default:
            return state
    }
}

// actions
export const removeTodolistAC = (id: string) => ({ type: "REMOVE-TODOLIST", id } as const)
export const addTodolistAC = (todolist: TodoType) => ({ type: "ADD-TODOLIST", todolist } as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({ type: "CHANGE-TODOLIST-TITLE", id, title } as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({ type: "CHANGE-TODOLIST-FILTER", id, filter } as const)
export const setTodosAC = (todos: Array<TodoType>) => ({ type: 'SET-TODOS', todos} as const)
export const changeTodolistEntityStatusAC  = (id: string, entityStatus: RequestStatusType) =>
    ({ type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, entityStatus} as const)

// thunks
export const fetchTodosTC = () => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTodo()
        .then((res) => {
            dispatch(setTodosAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
}
export const removeTodosTC = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId,'loading'))
    todolistsAPI.deleteTodo(todolistId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
}
export const addTodosTC = (title: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTodo(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
}
export const updateTodosTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId,'loading'))
    todolistsAPI.updateTodoTitle(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(todolistId, title))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(changeTodolistEntityStatusAC(todolistId,'succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
}

// types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodosActionType = ReturnType<typeof setTodosAC>

type ActionType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>
    | SetTodosActionType
    | SetAppStatusActionType
    | SetAppErrorActionType
    | SetIsLoggedInActionType

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodoType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}