import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo(function(props: AddItemFormPropsType) {
    console.log('Add')
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(false)
        if (e.key === 'Enter') {
            addItem()
        }
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
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
                       onChange={changeTitle}
                       onKeyPress={onKeyPressHandler}
                       label={"Title"}
                       helperText={error && "Title is required!"}
            />
            <IconButton color={"primary"} onClick={addItem}>
                <AddBox/>
            </IconButton>

        </div>
    )
}
)