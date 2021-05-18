import axios from 'axios'

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        'API-KEY': 'fdde2ff6-05bd-41ac-ad86-490f6bc2a074'
    }
})

export type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type CommonResponseType<T = {}> = {
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
}
type GetTasksResponseType = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}

type UpdateTaskType = {
    title: string
    description: string | null
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
}

export const todolistsAPI = {
    getTodo() {
        return instance.get<Array<TodoType>>(`todo-lists`)
    },
    createTodo(title: string) {
        return instance.post<CommonResponseType<{ item: TodoType }>>(`todo-lists`, {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, taskTitle: string) {
        return instance.post<CommonResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskType) {
        return instance.put<CommonResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}
