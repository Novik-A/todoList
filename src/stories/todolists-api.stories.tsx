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
    const [todolistId, setTodolistId] = useState<string>('')
    const deleteTodo = () => {
        todolistAPI.deleteTodo(todolistId)
            .then( (res) => {
            setState(res.data);
        })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'}
                   value={todolistId}
                   onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
            <button onClick={deleteTodo}>delete todolist</button>
        </div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const updateTodoTitle = () => {
        todolistAPI.updateTodoTitle(todolistId, title)
        .then((res) => {
                setState(res.data)
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
            <button onClick={updateTodoTitle}>update task title</button>
        </div>
    </div>
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const getTasks = () => {
            todolistAPI.getTasks(todolistId)
            .then((res) => {
                console.log(res)
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
                console.log(res)
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
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(1)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const startDate = ''
    const deadline = ''

    const updateTask = () => {
        todolistAPI.updateTask(todolistId, taskId, {title, description, status, priority, startDate, deadline})
            .then((res) => {
                setState(res.data)
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
            <input placeholder={'task title'}
                   value={title}
                   onChange={(e) => {setTitle(e.currentTarget.value)}}/>
            <input placeholder={'description'}
                   value={description}
                   onChange={(e) => {setDescription(e.currentTarget.value)}}/>
            <input placeholder={'status'}
                   value={status}
                   onChange={(e) => {setStatus(+e.currentTarget.value)}}/>
            <input placeholder={'priority'}
                   value={priority}
                   onChange={(e) => {setPriority(+e.currentTarget.value)}}/>
            <button onClick={updateTask}>update task</button>
        </div>
    </div>
}