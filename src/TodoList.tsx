import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from './App';
import './App.css';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    changeTodoListTitle: (newTitle: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
}
export function TodoList(props: TodoListPropsType) {

    const addTask = (title: string) => props.addTask(title, props.todoListID)
    const removeTodoList = () => props.removeTodoList(props.todoListID)
    const setAllFilter = () => props.changeTodoListFilter('all', props.todoListID)
    const setActiveFilter = () => props.changeTodoListFilter('active', props.todoListID)
    const setCompletedFilter = () => props.changeTodoListFilter('completed', props.todoListID)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)
    const tasks = props.tasks.map(t => {
        const removeTask = () => {props.removeTask(t.id, props.todoListID)}
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
        const changeTaskTitle = (newTitle: string) =>
            props.changeTaskTitle(t.id, newTitle, props.todoListID)
        return (
            <li className={t.isDone ? 'is-done' : ''}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeTaskStatus}
                />
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <button onClick={removeTask}>X</button>
            </li>
        )
    })

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
                <button onClick={removeTodoList}>X</button>
            </h3>
            <AddItemForm addItem={addTask} />
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