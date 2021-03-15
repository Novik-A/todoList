import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm (props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string> ('')
    const [error, setError] = useState<boolean>(false)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
        }
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }

    return(
        <div>
            <input
                className={error ? 'error' : ''}
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={addItem}>+</button>
            {error && <div className={'error-message'}>Title is required!</div>}
        </div>
    )
}