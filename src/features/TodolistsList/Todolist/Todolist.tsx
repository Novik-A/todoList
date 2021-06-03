import React, {useCallback, useEffect} from "react";
import '../../../app/App.css';
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {FilterValuesType, TodolistDomainType} from "../todolists-reducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "../tasks-reducer";


type TodolistPropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    removeTodolist: (todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTodolistFilter: (todoListId: string, newFilterValue: FilterValuesType) => void
    changeTodolistTitle: (newTitle: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    demo?: boolean
}

export const Todolist = React.memo(({demo = false, ...props}: TodolistPropsType) => {
    const dispatch = useDispatch()

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTasksTC(props.todolist.id))
    }, [])

    const addTask = useCallback((title: string) =>
        props.addTask(title, props.todolist.id), [props.addTask, props.todolist.id])
    const removeTodolist = () => props.removeTodolist(props.todolist.id)
    const changeTodolistTitle = useCallback((title: string) =>
        props.changeTodolistTitle(title, props.todolist.id), [props.changeTodolistTitle, props.todolist.id])
    const onAllClickHandler = useCallback(() =>
        props.changeTodolistFilter( props.todolist.id, 'all'), [props.todolist.id, props.changeTodolistFilter])
    const onActiveClickHandler = useCallback(() =>
        props.changeTodolistFilter(props.todolist.id, 'active'), [props.todolist.id, props.changeTodolistFilter])
    const onCompletedClickHandler = useCallback(() =>
        props.changeTodolistFilter(props.todolist.id, 'completed'), [props.todolist.id, props.changeTodolistFilter])


    let tasksForTodoList = props.tasks
    if (props.todolist.filter === 'active') {
        tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.todolist.title} changeTitle={changeTodolistTitle} disabled={props.todolist.entityStatus === 'loading'} />

                <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
            <div style={{listStyle: "none", paddingLeft: "0"}}>
                {
                    tasksForTodoList.map(t => {
                        const disabled = props.todolist.entityStatus === 'loading' || t.entityStatus === 'loading'
                    return <Task
                        removeTask={props.removeTask}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        task={t}
                        todolistId={props.todolist.id}
                        disabled={disabled}
                        key={t.id}
                    />
                })
                }
            </div>
            <div style={{marginTop: "5px"}}>
                <Button variant={"contained"}
                        style={{marginRight: "3px"}}
                        color={props.todolist.filter === 'all' ? "secondary" : "primary"}
                        size={"small"}
                        onClick={onAllClickHandler}>All</Button>
                <Button variant={"contained"}
                        style={{marginRight: "3px"}}
                        color={props.todolist.filter === 'active' ? "secondary" : "primary"}
                        size={"small"}
                        onClick={onActiveClickHandler}>Active</Button>
                <Button variant={"contained"}
                        color={props.todolist.filter === 'completed' ? "secondary" : "primary"}
                        size={"small"}
                        onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    );
}
)

