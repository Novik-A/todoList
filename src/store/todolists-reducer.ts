import {v1} from "uuid";
import {todolistsAPI, TodoType} from "../api/todolists-api";
import {Dispatch} from "redux";

export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}

export type AddTodoListActionType = {
    type: "ADD-TODOLIST"
    title: string
    todoListId: string
}

type ChangeTodoListTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}

type ChangeTodoListFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}

export type ActionType = RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType
    | SetTodosActionType

const initialState: TodolistDomainType[] = []

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodoType & {
    filter: FilterValuesType
}

export const todoListsReducer = (todoLists: TodolistDomainType[] = initialState, action: ActionType): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODOS': {
            return action.todos.map(tl => {
                return {...tl, filter: "all"}
            })
        }
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            return [{
                id: action.todoListId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...todoLists]
        case "CHANGE-TODOLIST-TITLE":
            const todoList = todoLists.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
            }
            return [...todoLists]
        case "CHANGE-TODOLIST-FILTER": {
            const todoList = todoLists.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
            }
            return [...todoLists]
        }
        default:
            return todoLists
    }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListActionType => {
    return { type: "REMOVE-TODOLIST", id}
}

export const AddTodoListAC = (title: string): AddTodoListActionType => {
    return { type: "ADD-TODOLIST", title, todoListId: v1() }
}

export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => {
    return { type: "CHANGE-TODOLIST-TITLE", id, title }
}

export const ChangeTodoListFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListFilterActionType => {
    return { type: "CHANGE-TODOLIST-FILTER", id, filter }
}

export const setTodosAC = (todos: Array<TodoType>) => {
    return { type: 'SET-TODOS', todos} as const
}

export type SetTodosActionType = ReturnType<typeof setTodosAC>

//Thunk

export const setTodosTC = () => (dispatch: Dispatch) => {
    // 1. Side effect
    todolistsAPI.getTodo()
        .then((res) => {
            let todos = res.data
            // 2. dispatch action(thunk)
            dispatch(setTodosAC(todos))
        })
}

export const removeTodosTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTodo(todolistId)
        .then(() => {
            dispatch(RemoveTodoListAC(todolistId))
        })
}

export const addTodosTC = (title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTodo(title)
        .then((res) => {
            dispatch(AddTodoListAC(res.data.data.item.title))
        })
}

export const updateTodosTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.updateTodoTitle(todolistId, title)
        .then(() => {
            dispatch(ChangeTodoListTitleAC(todolistId, title))
        })
}

