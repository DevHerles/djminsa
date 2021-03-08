import React from "react";
import {Divider, Button, Tab, Tabs, TextField, InputAdornment, Icon, Typography,
  List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader} from '@material-ui/core';
import { Card } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';


const ReadOnlyField = ({ title, value }) => {
  return (
    <div className="mb-24">
        <Typography className="font-bold mb-4 text-15">{title}</Typography>
        <Typography>{value}</Typography>
    </div>
  );
};

export default ReadOnlyField;