import './addItem.css'
import React, {ChangeEvent, useState} from 'react';
import {Box, Button, Checkbox, TextField, Typography} from "@mui/material";
import {TodoItem} from "../../interface/TodoItem";
import todoItem from "../todoItem";
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
function AddItem(props: any) {
    const [show, setShow] = useState(props.showAdd);
    const [newItem, setNewItem] = useState<TodoItem>({id: '', title: '', description:'', checked: false})

    const modifyShowStatus = (status :boolean) => {
        props.closeAdd(status);
    }
    const addItem = (newItem : todoItem) => {
        props.addItem(newItem);
    }
    const onChangeTextField = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if(event.target.name === 'title'){
            setNewItem({...newItem, title : event.target.value, description: newItem.description, checked: newItem.checked});
        }
        if(event.target.name === 'description'){
            setNewItem({...newItem, title : newItem.title, description: event.target.value, checked: newItem.checked});
        }
        if(event.target.name === 'checked'){
            setNewItem({...newItem, title : newItem.title, description: newItem.description, checked: event.target.value === 'checked'});
        }
    }
    return (
        <React.Fragment>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                className={'form-add-item'}
                noValidate
                autoComplete="off"
            >
                <TextField name={'title'} id="title" label="Title" variant="outlined" onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChangeTextField(event)} />
                <TextField name={'description'} id="description" label="Description" variant="outlined" multiline={true} onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChangeTextField(event)} />
                <Typography variant={'caption'}>
                    ¿This task is done?
                    <Checkbox {...label} defaultChecked />
                </Typography>

            </Box>
            <Button onClick={() => addItem(newItem)}>Add</Button>
            <Button onClick={() => modifyShowStatus(!show)}>Close</Button>
        </React.Fragment>
    );
}

export default AddItem;