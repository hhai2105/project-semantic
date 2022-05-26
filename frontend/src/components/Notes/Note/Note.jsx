import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {ListItem, ListItemAvatar, ListItemText, Avatar, InboxIcon} from '@mui/material'

function Note(){
    return (
        <Draggable draggableId={item.id} index={index}>
            {(provided, snapshot) => (
                <ListItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={snapshot.isDragging ? classes.draggingListItem : ''}
                >
                    <ListItemAvatar>
                        <Avatar>
                            <InboxIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item.primary} secondary={item.secondary} />
                </ListItem>
            )}
        </Draggable>
    );
}
