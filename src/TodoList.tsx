import React, {ChangeEvent, KeyboardEvent, useState, useCallback} from "react";
import {FilterValuesType, TaskType} from './AppWithRedux';
import './App.css';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton, TextField} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


type TodoListPropsType = {
    key: string
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTodoListFilter: (todoListID: string, newFilterValue: FilterValuesType) => void
    changeTodoListTitle: (newTitle: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
}

export function TodoList(props: TodoListPropsType) {

    const addTask = useCallback((title: string) => props.addTask(title, props.todoListID), [])
    const removeTodoList = () => props.removeTodoList(props.todoListID)
    const setAllFilter = useCallback(() => props.changeTodoListFilter(props.todoListID, 'all'), [])
    const setActiveFilter = useCallback(() => props.changeTodoListFilter(props.todoListID, 'active'), [])
    const setCompletedFilter = useCallback(() => props.changeTodoListFilter(props.todoListID, 'completed'), [])
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)
    let tasksForTodoList = props.tasks
    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter(t => t.isDone === false)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter(t => t.isDone === true)
    }
    const tasks = tasksForTodoList.map(t => {
        const removeTask = () => {
            props.removeTask(t.id, props.todoListID)
        }
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
        const changeTaskTitle = (newTitle: string) =>
            props.changeTaskTitle(t.id, newTitle, props.todoListID)
        return (
            <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                <Checkbox
                    color={"primary"}
                    checked={t.isDone}
                    onChange={changeTaskStatus}
                    />
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>

                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </div>
        )
    })

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>

                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div style={{listStyle: "none", paddingLeft: "0"}}>
                {tasks}
            </div>
            <div style={{marginTop: "5px"}}>
                <Button variant={"contained"}
                        style={{marginRight: "3px"}}
                        color={props.filter === 'all' ? "secondary" : "primary"}
                        size={"small"}
                        onClick={setAllFilter}>All</Button>
                <Button variant={"contained"}
                        style={{marginRight: "3px"}}
                        color={props.filter === 'active' ? "secondary" : "primary"}
                        size={"small"}
                        onClick={setActiveFilter}>Active</Button>
                <Button variant={"contained"}
                        color={props.filter === 'completed' ? "secondary" : "primary"}
                        size={"small"}
                        onClick={setCompletedFilter}>Completed</Button>
            </div>
        </div>
    );
}