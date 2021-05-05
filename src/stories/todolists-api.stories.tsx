import React, {useEffect, useState} from 'react';
import {todolistAPI} from "../api/todolists-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodo()
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodo('ReactTTTTT')
            .then( (res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'b440dfec-3f3d-4ba2-a733-0c4045adbe4f';
        todolistAPI.deleteTodo(todolistId)
            .then( (res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.updateTodoTitle('b440dfec-3f3d-4ba2-a733-0c4045adbe4f', 'REACT>>>>>>>>>')
        .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const getTasks = () => {
            todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'}
                   value={todolistId}
                   onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
            <button onClick={getTasks}>get tasks</button>
        </div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const createTask = () => {
        todolistAPI.createTask(todolistId, title)
            .then( (res) => {
                setState(res.data);
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'}
                   value={todolistId}
                   onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
            <input placeholder={'title'}
                   value={title}
                   onChange={(e) => {setTitle(e.currentTarget.value)}}/>
            <button onClick={createTask}>create task</button>
        </div>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const deleteTask = () => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then( (res) => {
                setState(res.data);
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'}
                   value={todolistId}
                   onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
            <input placeholder={'taskId'}
                   value={taskId}
                   onChange={(e) => {setTaskId(e.currentTarget.value)}}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '6215af7d-83ce-450d-8b62-9a8d8ab002ca'
        const taskId = 'b70cf24e-1064-4ff0-ae0f-ebf1b9651785'
        const task = {
            "title":"AXIOS",
            "description":null,
            "status":0,
            "priority":1,
            "startDate":null,
            "deadline":null
        }
        todolistAPI.updateTaskTitle(todolistId, taskId, task, 'XXXXXXX')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}