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
import {Redirect} from "react-router-dom";

type PropsType = {
    demo?: boolean
}
export const TodolistsList: React.FC<PropsType> = ({demo= false}) => {

    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(fetchTodosTC())
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodosTC(title))
    }, [dispatch])

    const removeTodolist = useCallback((todoListId: string) => {
        dispatch(removeTodosTC(todoListId))
    }, [dispatch])

    const changeTodolistFilter = useCallback((todoListId: string, newFilterValue: FilterValuesType) => {
        let action = changeTodolistFilterAC(todoListId, newFilterValue)
        dispatch(action)
    }, [dispatch])

    const changeTodolistTitle = useCallback((newTitle: string, todoListId: string) => {
        dispatch(updateTodosTC(todoListId, newTitle))
    }, [dispatch])

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

    if(!isLoggedIn) {
        return <Redirect to={'/login'} />
    }

    return <>
        <Grid container style={{padding: "20px"}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={4}>
            {todolists.map(tl => {

                return (
                    <Grid item key={tl.id}>
                        <Paper elevation={10} style={{padding: "10px"}}>
                            <Todolist
                                todolist={tl}
                                tasks={tasks[tl.id]}
                                removeTask={removeTask}
                                removeTodolist={removeTodolist}
                                changeTodolistFilter={changeTodolistFilter}
                                changeTodolistTitle={changeTodolistTitle}
                                addTask={addTask}
                                changeTaskStatus={changeTaskStatus}
                                changeTaskTitle={changeTaskTitle}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                )
            })}
        </Grid>
    </>
}