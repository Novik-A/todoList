import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {Button, AppBar, Typography, IconButton, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import { Menu } from '@material-ui/icons';
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListsReducer
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    let todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = useCallback((taskID: string, todoListID: string) => {
        let action = removeTaskAC(taskID, todoListID)
        dispatch(action)
    }, [dispatch])

    const addTask = useCallback((title: string, todoListID: string) => {
        let action = addTaskAC(title, todoListID)
        dispatch(action)
    }, [dispatch])

    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {
        let action = changeTaskStatusAC(taskID, isDone, todoListID)
        dispatch(action)
    }, [dispatch])

    const changeTaskTitle = useCallback((taskID: string, newTitle: string, todoListID: string) => {
        let action = changeTaskTitleAC(taskID, newTitle, todoListID)
        dispatch(action)
    }, [dispatch])

    const changeTodoListFilter = useCallback((todoListID: string, newFilterValue: FilterValuesType) => {
        let action = ChangeTodoListFilterAC(todoListID, newFilterValue)
        dispatch(action)
    }, [dispatch])

    const changeTodoListTitle = useCallback((newTitle: string, todoListID: string) => {
        let action = ChangeTodoListTitleAC(todoListID, newTitle)
        dispatch(action)
    }, [dispatch])

    const removeTodoList = useCallback((todoListID: string) => {
        let action = RemoveTodoListAC(todoListID)
        dispatch(action)
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        let action = AddTodoListAC(title)
        dispatch(action)
    }, [dispatch])

//UI
    const todoListComponents = todoLists.map(tl => {

        return (
            <Grid item key={tl.id}>
            <Paper elevation={10} style={{padding: "10px"}}>
                <TodoList
                    key={tl.id}
                    todoListID={tl.id}
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

