import React from "react";
import {Divider, Button, Tab, Tabs, TextField, InputAdornment, Icon, Typography,
  List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader} from '@material-ui/core';
import { Card } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';


const SimpleItem = ({ title, onChange, value, field }) => {
  return (
    <Card elevation={2} className="play-card p-sm-10 pt-3 bg-paper">
      <List>
        <ListItem>
            <ListItemIcon className="min-w-40">
                <Icon>notifications</Icon>
            </ListItemIcon>
            <ListItemText primary={title}/>
            <ListItemSecondaryAction>
            <FormControl component="fieldset">
                <RadioGroup
                    row
                    name={field}
                    aria-label={field}
                    value={value}
                    onChange={onChange}
                >
                    <FormControlLabel value="SI" control={<Radio />} label="SI" />
                    <FormControlLabel value="NO" control={<Radio />} label="NO" />
                </RadioGroup>
            </FormControl>
            </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Card>
  );
};

export default SimpleItem;