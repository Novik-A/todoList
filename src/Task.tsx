import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./AppWithRedux";

export type TaskPropsType = {
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    changeTaskTitle: (taskID: string, newTitle: string) => void
    task: TaskType
    key: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const removeTask = () => {
        props.removeTask(props.task.id)
    }
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
        props.changeTaskStatus(props.task.id, e.currentTarget.checked)
    const changeTaskTitle = (newTitle: string) =>
        props.changeTaskTitle(props.task.id, newTitle)
    return (
        <div className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox
                color={"primary"}
                checked={props.task.isDone}
                onChange={changeTaskStatus}
            />
            <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>

            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>
    )
})