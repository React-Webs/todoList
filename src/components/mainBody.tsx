import './todoList.css'
import React, {useContext, useEffect, useState} from 'react';
import { AppBar } from '@mui/material';
import {
    Box,
    Checkbox,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    SpeedDialIcon,
    styled,
    Typography
} from "@mui/material";
import {TodoItem} from "../interface/TodoItem";
import {Context} from "../context/context";
import SpeedDial, { SpeedDialProps } from '@mui/material/SpeedDial';
import AddIcon from '@mui/icons-material/Add';
import AddItem from "./addItem/addItem";
import todoItem from "./todoItem";
import firebase from "../firebase_config/firebase";
import SearchAppBar from "./commons/appBar";
import ListItems from "./listItems/listItems";
import Navigation from "./navigation";
const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
        bottom: theme.spacing(1),
        right: theme.spacing(1),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
        top: theme.spacing(1),
        left: theme.spacing(1),
    },
}));

function MainBody(props : any) {
    const [todoListItems, setTodoListItems] = useState<TodoItem[]>([]);
    const {todoList, updateTodoItem} = useContext(Context);
    const [direction, setDirection] = useState<SpeedDialProps['direction']>('left');
    const [show, setShow] = useState(false);

    const closeAdd = (status : boolean) => {
        setShow(status);
    }

    const addItem = (newItem : todoItem) => {
        const ref = firebase.database().ref('todoList');
        ref.push(newItem);
        updateTodoItem(newItem);
    }

    useEffect(() => {
      const itemRef = firebase.database().ref('todoList');
      itemRef.limitToLast(10).on('value', (snapshoot) => {
          let items = snapshoot.val() as TodoItem[];
          let newTodoList = [] as TodoItem[];
          for(let item in items){
              const todoItem = {
                  id: item,
                  title: items[item].title,
                  description : items[item].description,
                  checked: items[item].checked
              } as TodoItem
              newTodoList.push(todoItem);
          }
          setTodoListItems(newTodoList);
      })

    }, [todoList])

    const handleChangeCheck = (todoItem :TodoItem) => () => {
        const currentIndex = todoListItems?.indexOf(todoItem);
        if(todoItem.checked) {
            todoItem.checked = false;
        }else {
            todoItem.checked = true;
        }
        let ref = firebase.database().ref('todoList');
        ref.child(todoItem.id).update(todoItem).then(snapshot => {
            let items = snapshot.val() as TodoItem[];
            let newTodoList = [] as TodoItem[];
            for(let item in items){
                const todoItem = {
                    id: item,
                    title: items[item].title,
                    description : items[item].description,
                    checked: items[item].checked
                } as TodoItem
                newTodoList.push(todoItem);
            }
            setTodoListItems(newTodoList);
            }
        ).catch(error => ({
            errorCode: error.code,
            errorMessage : error.message
        }));
    }

    return (
        <React.Fragment>

            <ListItems />
        </React.Fragment>
    );
}

export default MainBody;