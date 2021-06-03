import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../../api/todolists-api";
import {RequestStatusType} from "../../../../app/app-reducer";

export type TaskPropsType = {
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    task: TaskType
    todolistId: string
    disabled: boolean
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = useCallback(() => props.removeTask(props.task.id, props.todolistId), [props.task.id, props.todolistId])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }, [props.task.id, props.todolistId])

    const onTitleChangeHandler = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle, props.todolistId)
    }, [props.task.id, props.todolistId])

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
            disabled={props.disabled}
        />

        <EditableSpan title={props.task.title} changeTitle={onTitleChangeHandler} disabled={props.disabled}/>
        <IconButton onClick={onClickHandler} disabled={props.disabled}>
            <Delete/>
        </IconButton>
    </div>
})