import {addTaskAC, updateTaskAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {TasksStateType} from '../../app/App';
import {addTodoListAC, removeTodoListAC, TodolistDomainType, todoListsReducer} from "./todolists-reducer";
import {TaskStatuses} from "../../api/todolists-api";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: '1',
                title: 'CSS',
                description: '',
                todoListId: '',
                order: 1,
                status: 0,
                priority: 1,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: '2',
                title: 'JS',
                description: '',
                todoListId: '',
                order: 1,
                status: 1,
                priority: 1,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: '3',
                title: 'React',
                description: '',
                todoListId: '',
                order: 1,
                status: 2,
                priority: 1,
                startDate: '',
                deadline: '',
                addedDate: ''
            }
        ],
        "todolistId2": [
            {
                id: '1',
                title: 'bread',
                description: '',
                todoListId: '',
                order: 1,
                status: 0,
                priority: 1,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: '2',
                title: 'milk',
                description: '',
                todoListId: '',
                order: 1,
                status: 1,
                priority: 1,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: '3',
                title: 'tea',
                description: '',
                todoListId: '',
                order: 1,
                status: 2,
                priority: 1,
                startDate: '',
                deadline: '',
                addedDate: ''
            }
        ]
    };
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy()
});

test('correct task should be added to correct array', () => {

    const action = addTaskAC({
        id: '111',
        title: 'juce',
        description: '',
        todoListId: 'todolistId2',
        order: 0,
        status: TaskStatuses.New,
        priority: 0,
        startDate: '',
        deadline: '',
        addedDate: ''
    });

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juce');
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {

    const action = updateTaskAC("1", {status: 2}, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][0].status).toBe(2);
    expect(endState["todolistId1"][0].status).toBe(0);
});

test('title of specified task should be changed', () => {

    const action = updateTaskAC("2", {title: "beer"}, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("beer");
    expect(endState["todolistId1"][1].title).toBe("JS");
});

test('new array should be added when new todolist is added', () => {

    const action = addTodoListAC("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: TodolistDomainType[] = [];

    const action = addTodoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todoListId);
    expect(idFromTodolists).toBe(action.todoListId);
});

test('property with todolistId should be deleted', () => {

    const action = removeTodoListAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});
