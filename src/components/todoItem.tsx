import React, {useContext} from 'react';
import {TodoItem} from "../interface/TodoItem";
import {Box, Checkbox, List, ListItem, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";
import {Context} from "../context/context";

function TodoItem(props? : TodoItem) {
    const {todoList, updateTodoItem} = useContext(Context);
    const handleChangeCheck = (todoItem :TodoItem) =>{
        updateTodoItem(todoItem);
    }
    return (
        <React.Fragment>
            <Box component={'div'}>
                <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {todoList.map((todoItem: TodoItem, index: number) => {
                        const labelId = `checkbox-list-secondary-label-${todoItem.title}`;
                        return (<ListItem
                            key={todoItem.title}
                            secondaryAction={
                                <Checkbox
                                    edge="end"
                                    onChange={() => handleChangeCheck(todoItem)}
                                    checked={todoItem.checked}
                                    inputProps={{'aria-labelledby': labelId}}
                                />
                            }
                            disablePadding
                        >
                            <ListItemButton>
                                <ListItemText id={todoItem.title} primary={`${todoItem.title}`}/>
                            </ListItemButton>
                        </ListItem>
                    );
                    })}
                </List>

            </Box>
        </React.Fragment>
    );
}

export default TodoItem;