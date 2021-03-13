import React from "react";
import {Divider, Button, Tab, Tabs, TextField, InputAdornment, Icon, Typography,
  List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader} from '@material-ui/core';
import { Card } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { withStyles } from "@material-ui/core/styles";
import {blueGrey} from '@material-ui/core/colors/blueGrey';

const InfoTextTypography = withStyles({
  root: {
    color: 'red'
  }
})(Typography);

const SimpleItem = ({ title, onChange, value, field, errors, touched, handleBlur, required, help }) => {
  return (
    <Card elevation={2} className="play-card p-sm-10 mt-3 bg-paper">
      <List>
        <ListItem>
            <ListItemText
              primary={
                <Typography variant="subtitle1">{title}{required ? <span style={{ color: 'red' }}>*</span> : null} </Typography>}
              className="pr-200"/>
            <ListItemSecondaryAction>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  name={field}
                  aria-label={field}
                  value={value}
                  onChange={onChange}
                  onBlur={handleBlur}
                >
                  <FormControlLabel value="SI" control={<Radio />} label="SI" />
                  <FormControlLabel value="NO" control={<Radio />} label="NO" />
                </RadioGroup>
              </FormControl>
            </ListItemSecondaryAction>
        </ListItem>
        {!!help ?
          <ListItem>
            <ListItemText
              disableTypography
              primary={
                <InfoTextTypography type="body2">{help}</InfoTextTypography>
              }/>
          </ListItem>: null
        }
        {!!errors && eval(`touched.${field}`) ? (
          <ListItem>
            <ListItemText
              disableTypography
              primary={
                <Typography type="body2" style={{ color: 'red' }}>{errors}</Typography>
              }/>
          </ListItem>
        ) : null}
      </List>
    </Card>
  );
};

export default SimpleItem;