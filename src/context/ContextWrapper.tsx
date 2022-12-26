import React, {useState, useEffect} from 'react';
import {Context} from "./context";
import {TodoItem} from "../interface/TodoItem";
import MainBody from "../components/mainBody";

function ContextWrapper(props?: any) {
    const [todoList, setTodoList] = useState<TodoItem[]>([]);

    useEffect(() => {
        createTodoList();
    },[])

    const updateStatusTodoItem = (todoItem: TodoItem) => {
        const currentIndex = todoList.indexOf(todoItem);
        if(currentIndex === -1){
            todoList.push(todoItem)
        }else{
            todoList.splice(currentIndex, 1, todoItem);
        }
        setTodoList(todoList);
        sessionStorage.setItem('todoList', JSON.stringify(todoList));
    }

    const createTodoList = () => {
        const todoList  = [{
            title: "Example",
            description : "Description",
            checked : true
        },{
            title: "Example 2",
            description : "Description",
            checked : true
        },{
            title: "Example 3",
            description : "Description",
            checked : true
        },{
            title: "Example 4",
            description : "Description",
            checked : true
        }
        ] as TodoItem[];
        setTodoList(todoList);
        sessionStorage.setItem('todoList', JSON.stringify(todoList));
    }

    return (
        <Context.Provider value={{todoList: todoList, updateTodoItem: updateStatusTodoItem}}>
            {props.children}
        </Context.Provider>
    );
}

export default ContextWrapper;