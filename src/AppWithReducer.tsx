import React, {useReducer, useState} from 'react';
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

function AppWithReducer() {
    const todoList_1 = v1()
    const todoList_2 = v1()
    let [todoLists, dispatchTodoList] = useReducer(todoListsReducer, [
        {id: todoList_1, title: 'What to learn', filter: 'all'},
        {id: todoList_2, title: 'What to buy', filter: 'all'},
    ])
    let [tasks, dispatchTasks] = useReducer(tasksReducer,{
        [todoList_1]: [
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: false}
        ],
        [todoList_2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Meat', isDone: false}
        ]
    })

    function removeTask(taskID: string, todoListID: string) {
        let action = removeTaskAC(taskID, todoListID)
        dispatchTasks(action)
    }

    function addTask(title: string, todoListID: string) {
        let action = addTaskAC(title, todoListID)
        dispatchTasks(action)
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        let action = changeTaskStatusAC(taskID, isDone, todoListID)
        dispatchTasks(action)
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        let action = changeTaskTitleAC(taskID, newTitle, todoListID)
        dispatchTasks(action)
    }

    function changeTodoListFilter(todoListID: string, newFilterValue: FilterValuesType) {
        let action = ChangeTodoListFilterAC(todoListID, newFilterValue)
        dispatchTodoList(action)
    }

    function changeTodoListTitle(newTitle: string, todoListID: string) {
        let action = ChangeTodoListTitleAC(todoListID, newTitle)
        dispatchTodoList(action)
    }

    function removeTodoList(todoListID: string) {
        let action = RemoveTodoListAC(todoListID)
        dispatchTodoList(action)
        dispatchTasks(action)
    }

    function addTodoList(title: string) {
        let action = AddTodoListAC(title)
        dispatchTodoList(action)
        dispatchTasks(action)
    }

//UI
    const todoListComponents = todoLists.map(tl => {
        let tasksForTodoList = tasks[tl.id]
        if (tl.filter === 'active') {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
        }
        if (tl.filter === 'completed') {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
        }
        return (
            <Grid item key={tl.id}>
            <Paper elevation={10} style={{padding: "10px"}}>
                <TodoList
                    key={tl.id}
                    todoListID={tl.id}
                    title={tl.title}
                    tasks={tasksForTodoList}
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

export default AppWithReducer;

