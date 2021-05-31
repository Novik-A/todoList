import {TasksStateType} from "../AppWithRedux";
import {AddTodoListActionType, RemoveTodoListActionType, SetTodosActionType} from "./todolists-reducer";
import {TaskType, todolistsAPI} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

type UpdateTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

type ActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodosActionType
    | ReturnType<typeof setTasksAC>

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
        case "UPDATE-TASK":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task =>
                    task.id === action.taskId ? {...task, ... action.model} : task)
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

export const removeTaskAC = (taskId: string, todoListId: string) => ({type: "REMOVE-TASK", taskId, todoListId} as const)

export const addTaskAC = (task: TaskType) => ({type: "ADD-TASK", task} as const)

export const updateTaskAC = (taskId: string, model: UpdateTaskModelType, todoListId: string) => ({type: "UPDATE-TASK", taskId, model, todoListId} as const)

export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => ({type: 'SET-TASKS', todolistId, tasks} as const)


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

export const updateTaskTC = (taskId: string, todolistId: string, model: UpdateTaskModelType) => {
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
                status: task.status,
                ...model
            }).then((res) => {
                const action = updateTaskAC(taskId, res.data.data.item, todolistId)
                dispatch(action)
            })
        }
    }
}


