import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = React.memo(function(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setEditMode(false)
            props.changeTitle(title)
        }
    }

    return (
        editMode ? <TextField
                variant={"outlined"}
                value={title}
                onChange={changeTitle}
                onBlur={offEditMode}
                onKeyPress={onKeyPressHandler}
                autoFocus
            />
        : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}
)