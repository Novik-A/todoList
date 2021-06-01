import React, {useCallback, useEffect} from "react";
import {
    addTodosTC,
    changeTodolistFilterAC,
    FilterValuesType,
    removeTodosTC,
    fetchTodosTC,
    TodolistDomainType,
    updateTodosTC
} from "./todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {addTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from "./tasks-reducer";
import {TaskStatuses} from "../../api/todolists-api";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";

export const TodolistsList: React.FC = () => {
    useEffect(() => {
        dispatch(fetchTodosTC())
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
        dispatch(updateTaskTC(taskId, todoListId, {status}))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListId: string) => {
        dispatch(updateTaskTC(taskId, todoListId, {title: newTitle}))
    }, [dispatch])

    const changeTodoListFilter = useCallback((todoListId: string, newFilterValue: FilterValuesType) => {
        let action = changeTodolistFilterAC(todoListId, newFilterValue)
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

    return <>
        <Grid container style={{padding: "20px"}}>
            <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={4}>
            {todoLists.map(tl => {

                return (
                    <Grid item key={tl.id}>
                        <Paper elevation={10} style={{padding: "10px"}}>
                            <Todolist
                                key={tl.id}
                                todoListId={tl.id}
                                title={tl.title}
                                entityStatus={tl.entityStatus}
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
            })}
        </Grid>
    </>
}