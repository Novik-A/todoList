import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";
import {RequestStatusType} from "../../app/app-reducer";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(false)
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }
    const addItemHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }

    return (
        <div>
            <TextField variant={"outlined"}
                       error={!!error}
                       value={title}
                       disabled={disabled}
                       onChange={changeTitle}
                       onKeyPress={onKeyPressHandler}
                       label={"Title"}
                       helperText={error && "Title is required!"}
            />
            <IconButton color={"primary"} onClick={addItemHandler} disabled={disabled}>
                <AddBox/>
            </IconButton>
        </div>
    )
}
)