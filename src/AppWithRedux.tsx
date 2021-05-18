import React, {useCallback, useEffect, useReducer, useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {Button, AppBar, Typography, IconButton, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import { Menu } from '@material-ui/icons';
import {
    AddTodoListAC, addTodosTC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC, FilterValuesType,
    RemoveTodoListAC, removeTodosTC, setTodosTC,
    TodolistDomainType,
    todoListsReducer, updateTodosTC
} from "./store/todolists-reducer";
import {
    addTaskAC, addTaskTC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    removeTaskTC,
    tasksReducer, updateTaskStatusTC, updateTaskTitleTC
} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TaskStatuses, TaskType} from "./api/todolists-api";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    useEffect(() => {
        dispatch(setTodosTC())
    }, [])

    let todoLists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todoLists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = useCallback((taskId: string, todoListId: string) => {
        dispatch(removeTaskTC(todoListId, taskId))
    }, [dispatch])

    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTaskTC(todoListId, title))
    }, [dispatch])

    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todoListId: string) => {
        dispatch(updateTaskStatusTC (taskId, todoListId, status))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListId: string) => {
        dispatch(updateTaskTitleTC(taskId, todoListId, newTitle))
    }, [dispatch])

    const changeTodoListFilter = useCallback((todoListId: string, newFilterValue: FilterValuesType) => {
        let action = ChangeTodoListFilterAC(todoListId, newFilterValue)
        dispatch(action)
    }, [dispatch])

    const changeTodoListTitle = useCallback((newTitle: string, todoListId: string) => {
        dispatch(updateTodosTC(todoListId, newTitle))
    }, [dispatch])

    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodosTC(todoListId))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodosTC(title))
    }, [dispatch])

//UI
    const todoListComponents = todoLists.map(tl => {

        return (
            <Grid item key={tl.id}>
            <Paper elevation={10} style={{padding: "10px"}}>
                <TodoList
                    key={tl.id}
                    todoListId={tl.id}
                    title={tl.title}
                    tasks={tasks[tl.id]}
                    removeTask={removeTask}
                    removeTodoList={removeTodoList}
                    changeTodoListFilter={changeTodoListFilter}
                    changeTodoListTitle={changeTodoListTitle}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    changeTaskTitle={changeTaskTitle}
                    filter={tl.filter}
                />
            </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;

