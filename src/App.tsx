import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todoList_1 = v1()
    const todoList_2 = v1()
    const [todoLists, setTodolists] = useState<Array<TodoListType>>([
        {id: todoList_1, title: 'What to learn', filter: 'all'},
        {id: todoList_2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TaskStateType> ({
        [todoList_1]: [
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: false}
        ],
        [todoList_2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Meat', isDone: false}
        ]
    })

    function removeTask(taskID: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks({...tasks})
    }

    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone:false
        }
        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({...tasks})
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        const task = tasks[todoListID].find(t => t.id === taskID)
        if(task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeTodoListFilter(newFilterValue: FilterValuesType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if(todoList) {
            todoList.filter = newFilterValue
            setTodolists([...todoLists])
        }
    }
    function removeTodoList(todoListID: string) {
        setTodolists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }
//UI
    const todoListComponents = todoLists.map(tl => {
        let tasksForTodoList = tasks[tl.id]
        if (tl.filter === 'active') {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
        }
        if (tl.filter === 'completed') {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
        }
        return <TodoList
            key={tl.id}
            todoListID={tl.id}
            title={tl.title}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            removeTodoList={removeTodoList}
            changeTodoListFilter={changeTodoListFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            filter={tl.filter}
        />
    })

    return (
        <div className="App">
            { todoListComponents }
        </div>
    );
}

export default App;

