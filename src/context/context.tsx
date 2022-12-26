import {createContext, Dispatch, SetStateAction} from 'react';
// @ts-ignore
import {TodoItem} from '../interface/TodoItem';

export const Context = createContext({
    todoList: [] as TodoItem[],
    updateTodoItem : (todoItem : TodoItem) => {}
})

