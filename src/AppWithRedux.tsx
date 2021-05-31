import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
    addTodosTC,
    changeTodoListFilterAC,
    FilterValuesType,
    removeTodosTC,
    setTodosTC,
    TodolistDomainType,
    updateTodosTC
} from "./store/todolists-reducer";
import {addTaskTC, removeTaskTC, updateTaskTC} from "./store/tasks-reducer";
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
        dispatch(updateTaskTC (taskId, todoListId, {status}))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListId: string) => {
        dispatch(updateTaskTC(taskId, todoListId, {title: newTitle}))
    }, [dispatch])

    const changeTodoListFilter = useCallback((todoListId: string, newFilterValue: FilterValuesType) => {
        let action = changeTodoListFilterAC(todoListId, newFilterValue)
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

