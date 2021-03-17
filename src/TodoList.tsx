import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from './App';
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