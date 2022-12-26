import '../todoList.css'
import React, {useContext, useEffect, useState} from 'react';
import {
    Box,
    Checkbox,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    styled,
} from "@mui/material";
import {TodoItem} from "../../interface/TodoItem";
import {Context} from "../../context/context";
import SpeedDial, { SpeedDialProps } from '@mui/material/SpeedDial';
import AddIcon from '@mui/icons-material/Add';
import AddItem from "../addItem/addItem";
import todoItem from "../todoItem";
import firebase from "../../firebase_config/firebase";

function ListItems(props : any) {
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
            <Box component={'div'}>
                <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {todoListItems?.map((todoItem: TodoItem, index: number) => (
                            <ListItem
                                key={todoItem.title}
                                secondaryAction={
                                    <Checkbox
                                        edge="end"
                                        onChange={handleChangeCheck(todoItem)}
                                        checked={todoItem.checked === true}
                                    />
                                }
                                disablePadding
                            >
                                <ListItemButton>
                                    <ListItemText id={todoItem.title} primary={`${todoItem.title}`}/>
                                </ListItemButton>
                            </ListItem>
                        )
                    )}
                </List>
            </Box>
            <Box className={'speedDial'}>
                <SpeedDial
                    ariaLabel="SpeedDial playground example"
                    hidden={false}
                    icon={<AddIcon />}
                    direction={direction}
                    onClick={() =>  closeAdd(true)}>

                </SpeedDial>
            </Box>
            {show && (
                <Box>
                    <AddItem showAdd={show} closeAdd={closeAdd} addItem={addItem} />
                </Box>
            )}
        </React.Fragment>
    );
}

export default ListItems;