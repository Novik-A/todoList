import axios from 'axios'
import {RequestStatusType} from "../app/app-reducer";


const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        'API-KEY': 'fdde2ff6-05bd-41ac-ad86-490f6bc2a074'
    }
})

// api
export const todolistsAPI = {
    getTodo() {
        return instance.get<Array<TodoType>>(`todo-lists`)
    },
    createTodo(title: string) {
        return instance.post<ResponseType<{ item: TodoType }>>(`todo-lists`, {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, taskTitle: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskType) {
        return instance.put<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{userId: number}>>(`auth/login`, data)
    },
    me() {
        return instance.get<ResponseType<{id: number, email: string, login: string}>>(`auth/me`)
    },
    logout() {
        return instance.delete<ResponseType>(`auth/login`)
    }
}


// types
export type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    addedDate: string
    entityStatus?: RequestStatusType
}
type GetTasksResponseType = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
export type UpdateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}