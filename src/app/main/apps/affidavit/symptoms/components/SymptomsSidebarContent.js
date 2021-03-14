import React from 'react';
import { Avatar, Divider, Icon, List, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate, NavLinkAdapter } from '@fuse';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  listItem: {
    color: 'inherit!important',
    textDecoration: 'none!important',
    height: 40,
    width: 'calc(100% - 16px)',
    borderRadius: '0 20px 20px 0',
    paddingLeft: 24,
    paddingRight: 12,
    '&.active': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText + '!important',
      pointerEvents: 'none',
      '& .list-item-icon': {
        color: 'inherit'
      }
    },
    '& .list-item-icon': {
      marginRight: 16
    }
  }
}));

function SymptomsSidebarContent(props) {
  const record = useSelector(({ affidavitSymptomsApp }) => affidavitSymptomsApp.record);
  const classes = useStyles(props);

  return (
    <div className="p-0 lg:p-24 lg:pr-4">
      <FuseAnimate animation="transition.slideLeftIn" delay={200}>
        <Paper className="rounded-0 shadow-none lg:rounded-8 lg:shadow-1">
          <div className="p-24 flex items-center">
            <Avatar className="mr-12" alt={record.name} src={record.avatar} />
            <Typography>{record.name}</Typography>
          </div>
          <Divider />
          <List>
            <ListItem
              button
              component={NavLinkAdapter}
              to={'/apps/affidavit/symptoms/all'}
              activeClassName="active"
              className={classes.listItem}
            >
              <Icon className="list-item-icon text-16" color="action">people</Icon>
              <ListItemText className="truncate pr-0" primary="Todas las declaraciones" disableTypography={true} />
            </ListItem>
            <ListItem
              button
              component={NavLinkAdapter}
              to={'/apps/affidavit/symptoms/fit'}
              activeClassName="active"
              className={classes.listItem}
            >
              <Icon className="list-item-icon text-16" color="action">check</Icon>
              <ListItemText className="truncate pr-0" primary="Aptos" disableTypography={true} />
            </ListItem>
            <ListItem
              button
              component={NavLinkAdapter}
              to={'/apps/affidavit/symptoms/notfit'}
              activeClassName="active"
              className={classes.listItem}
            >
              <Icon className="list-item-icon text-16" color="action">clear</Icon>
              <ListItemText className="truncate pr-0" primary="No aptos" disableTypography={true} />
            </ListItem>
          </List>
        </Paper>
      </FuseAnimate>
    </div>
  );
}

export default SymptomsSidebarContent;
