import {v1} from "uuid";
import {todolistsAPI, TodoType} from "../api/todolists-api";
import {Dispatch} from "redux";

export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
export type AddTodoListActionType = ReturnType<typeof addTodoListAC>
export type SetTodosActionType = ReturnType<typeof setTodosAC>

type ActionType =
    | RemoveTodoListActionType
    | AddTodoListActionType
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
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

export const removeTodoListAC = (id: string) => ({ type: "REMOVE-TODOLIST", id } as const)

export const addTodoListAC = (title: string) => ({ type: "ADD-TODOLIST", title, todoListId: v1() } as const)

export const changeTodoListTitleAC = (id: string, title: string) => ({ type: "CHANGE-TODOLIST-TITLE", id, title } as const)

export const changeTodoListFilterAC = (id: string, filter: FilterValuesType) => ({ type: "CHANGE-TODOLIST-FILTER", id, filter } as const)

export const setTodosAC = (todos: Array<TodoType>) => ({ type: 'SET-TODOS', todos} as const)


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
            dispatch(removeTodoListAC(todolistId))
        })
}

export const addTodosTC = (title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTodo(title)
        .then((res) => {
            dispatch(addTodoListAC(res.data.data.item.title))
        })
}

export const updateTodosTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.updateTodoTitle(todolistId, title)
        .then(() => {
            dispatch(changeTodoListTitleAC(todolistId, title))
        })
}

