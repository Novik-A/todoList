import {
    addTodolistAC, changeTodolistEntityStatusAC, changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, TodolistDomainType,
    todoListsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {RequestStatusType} from "../../app/app-reducer";

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {
            id: todolistId1,
            title: "What to learn",
            order: 1,
            addedDate: '',
            filter: "all",
            entityStatus: "idle"
        },
        {
            id: todolistId2,
            title: "What to buy",
            order: 1,
            addedDate: '',
            filter: "all",
            entityStatus: "idle"
        }
    ]
})

test('correct todolist should be removed', () => {
    const endState = todoListsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    const newTodolist = {
        id: v1(),
        title: "New Todolist",
        order: 1,
        addedDate: '',
        filter: "all",
        entityStatus: "idle"
    }

    const endState = todoListsReducer(startState, addTodolistAC(newTodolist))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolist.title);
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todoListsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const endState = todoListsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('correct entity status of todolist should be changed', () => {

    let newStatus: RequestStatusType = "loading";

    const endState = todoListsReducer(startState, changeTodolistEntityStatusAC(todolistId2, 'loading'));

    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe('loading');
});
