import React from 'react';
import {Typography, ListItem, Icon} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import _ from '@lodash';

function HistoryListItem(props)
{
    const { item } = props;
    return (
        <ListItem
            className="border-solid border-b-1 py-16 px-0 sm:px-8"
            onClick={(ev) => {
                ev.preventDefault();
                console.log('dispatch(Actions.openEditTodoDialog(props.todo))');
            }}
            dense
            button
        >
            <div className="flex flex-1 flex-col relative overflow-hidden pl-8">
                <Typography
                    variant="subtitle1"
                    className="todo-title truncate"
                >
                    {item?.date}
                </Typography>
            </div>
            <div className="px-8 flex flex-row">
                <Typography
                    color="textSecondary"
                    className="todo-notes truncate"
                >
                    {item?.condition}
                </Typography>
                {item.condition === 'APTO' ? (
                    <Icon style={{color: green[500]}}>error_outline</Icon>
                ) : (
                    <Icon style={{color: red[500]}}>error</Icon>
                )}
            </div>
        </ListItem>
    );
}

export default HistoryListItem;
