import React, {useCallback, useEffect} from "react";
import './App.css';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "./api/todolists-api";
import {FilterValuesType} from "./store/todolists-reducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "./store/tasks-reducer";


type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTodoListFilter: (todoListId: string, newFilterValue: FilterValuesType) => void
    changeTodoListTitle: (newTitle: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
}

export const TodoList = React.memo((props: TodoListPropsType) => {
    console.log('TodoList')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.todoListId))
    }, [])

    const addTask = useCallback((title: string) =>
        props.addTask(title, props.todoListId), [props.addTask, props.todoListId])
    const removeTodoList = () => props.removeTodoList(props.todoListId)
    const setAllFilter = useCallback(() =>
        props.changeTodoListFilter(props.todoListId, 'all'), [props.changeTodoListFilter,props.todoListId])
    const setActiveFilter = useCallback(() =>
        props.changeTodoListFilter(props.todoListId, 'active'), [props.changeTodoListFilter,props.todoListId])
    const setCompletedFilter = useCallback(() =>
        props.changeTodoListFilter(props.todoListId, 'completed'), [props.changeTodoListFilter,props.todoListId])
    const changeTodoListTitle = useCallback((title: string) =>
        props.changeTodoListTitle(title, props.todoListId), [props.changeTodoListTitle, props.todoListId])

    const onAllClickHandler = useCallback(() => props.changeTodoListFilter( props.todoListId, 'all'), [props.todoListId, props.changeTodoListFilter])
    const onActiveClickHandler = useCallback(() => props.changeTodoListFilter(props.todoListId, 'active'), [props.todoListId, props.changeTodoListFilter])
    const onCompletedClickHandler = useCallback(() => props.changeTodoListFilter(props.todoListId, 'completed'), [props.todoListId, props.changeTodoListFilter])


    let tasksForTodoList = props.tasks
    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

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
                {
                    tasksForTodoList.map(t => {
                    return <Task
                        removeTask={props.removeTask}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        task={t}
                        todoListId={props.todoListId}
                        key={t.id}
                    />
                })
                }
            </div>
            <div style={{marginTop: "5px"}}>
                <Button variant={"contained"}
                        style={{marginRight: "3px"}}
                        color={props.filter === 'all' ? "secondary" : "primary"}
                        size={"small"}
                        onClick={onAllClickHandler}>All</Button>
                <Button variant={"contained"}
                        style={{marginRight: "3px"}}
                        color={props.filter === 'active' ? "secondary" : "primary"}
                        size={"small"}
                        onClick={onActiveClickHandler}>Active</Button>
                <Button variant={"contained"}
                        color={props.filter === 'completed' ? "secondary" : "primary"}
                        size={"small"}
                        onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    );
}
)

