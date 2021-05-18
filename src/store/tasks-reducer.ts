import {TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType, SetTodosActionType} from "./todolists-reducer";
import {TaskStatuses, TaskType, todolistsAPI} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskId: string
    todoListId: string
}

type AddTaskActionType = {
    type: "ADD-TASK"
    task: TaskType
}

type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    todoListId: string
    taskId: string
    status: TaskStatuses
}

type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    title: string
    todoListId: string
}

export type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodosActionType
    | SetTasksActionType

let initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'SET-TASKS': {
            let stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        case 'SET-TODOS': {
            let stateCopy = {...state}
            action.todos.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todoListId] = newTasks;
            return stateCopy;
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task =>
                    task.id === action.taskId ? {...task, status: action.status} : task)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task =>
                    task.id === action.taskId ? {...task, title: action.title} : task)
            }
        case "ADD-TODOLIST":
            return {...state, [action.todoListId]: []}
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskId, todoListId}
}

export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: "ADD-TASK", task}
}

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todoListId: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", taskId, status, todoListId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", taskId, title, todoListId}
}

export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
    return {type: 'SET-TASKS', todolistId, tasks} as const
}

export type SetTasksActionType = ReturnType<typeof setTasksAC>

// Thunk

export const fetchTasksTC = (todolistId: string) =>
    (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                let tasks = res.data.items
                const action = setTasksAC(todolistId, tasks)
                dispatch(action)
            })
    }

export const removeTaskTC = (todolistId: string, taskId: string) =>
    (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                dispatch(removeTaskAC(taskId, todolistId));
            })
    }

export const addTaskTC = (todolistId: string, taskTitle: string) =>
    (dispatch: Dispatch) => {
        todolistsAPI.createTask(todolistId, taskTitle)
            .then((res) => {
                dispatch(addTaskAC(res.data.data.item));
            })
    }

export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })

        if (task) {
            todolistsAPI.updateTask(todolistId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status
            }).then((res) => {
                const action = changeTaskStatusAC(taskId, res.data.data.item.status, todolistId)
                dispatch(action)
            })
        }
    }
}

export const updateTaskTitleTC = (taskId: string, todolistId: string, title: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

// так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
// те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком  // чтобы у неё отобрать остальные св-ва

        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })

        if (task) {
            todolistsAPI.updateTask(todolistId, taskId, {
                title: title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status
            }).then((res) => {
                const action = changeTaskTitleAC(taskId, res.data.data.item.title, todolistId)
                dispatch(action)
            })
        }
    }
}

