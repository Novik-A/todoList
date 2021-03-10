import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from './App';
import './App.css';

type TodoListPropsType = {
    key: string
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
}
export function TodoList(props: TodoListPropsType) {

    const [title, setTitle] = useState<string> ('')
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle) {
            props.addTask(trimmedTitle, props.todoListID)
        } else {
            setError('Title is required!')
        }
        setTitle('')
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') { addTask() }
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError('')
    }
    const removeTodoList = () => props.removeTodoList(props.todoListID)
    const setAllFilter = () => props.changeTodoListFilter('all', props.todoListID)
    const setActiveFilter = () => props.changeTodoListFilter('active', props.todoListID)
    const setCompletedFilter = () => props.changeTodoListFilter('completed', props.todoListID)
    const tasks = props.tasks.map(t => {
        const removeTask = () => {props.removeTask(t.id, props.todoListID)}
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
        return (
            <li className={t.isDone ? 'is-done' : ''}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeTaskStatus}
                />
                <span>{t.title}</span>
                <button onClick={removeTask}>X</button>
            </li>
        )
    })

    return (
        <div>
            <h3>{props.title}<button onClick={removeTodoList}>X</button></h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={title}
                    onChange={onChangeTitle}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'selected' : ''}
                        onClick={setAllFilter}>All</button>
                <button className={props.filter === 'active' ? 'selected' : ''}
                    onClick={setActiveFilter}>Active</button>
                <button className={props.filter === 'completed' ? 'selected' : ''}
                    onClick={setCompletedFilter}>Completed</button>
            </div>
        </div>
    );
}