import React, { useState } from 'react';
import { Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from '@material-ui/core';
import * as Actions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';

function MultiSelectMenu(props) {
  const dispatch = useDispatch();
  const selectedRecordIds = useSelector(({ usersApp }) => usersApp.records.selectedIds);

  const [anchorEl, setAnchorEl] = useState(null);

  function openSelectedContactMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function closeSelectedContactsMenu() {
    setAnchorEl(null);
  }

  return (
    <React.Fragment>
      <IconButton
        className="p-0"
        aria-owns={anchorEl ? 'selectedContactsMenu' : null}
        aria-haspopup="true"
        onClick={openSelectedContactMenu}
      >
        <Icon>more_horiz</Icon>
      </IconButton>
      <Menu
        id="selectedContactsMenu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeSelectedContactsMenu}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              console.log('dispatch(Actions.removeContacts(selectedRecordIds));');
              closeSelectedContactsMenu();
            }}
          >
            <ListItemIcon className="min-w-40">
              <Icon>delete</Icon>
            </ListItemIcon>
            <ListItemText primary="Remove" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              console.log('dispatch(Actions.setContactsStarred(selectedRecordIds));');
              closeSelectedContactsMenu();
            }}
          >
            <ListItemIcon className="min-w-40">
              <Icon>star</Icon>
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              console.log('dispatch(Actions.setContactsUnstarred(selectedRecordIds));');
              closeSelectedContactsMenu();
            }}
          >
            <ListItemIcon className="min-w-40">
              <Icon>star_border</Icon>
            </ListItemIcon>
            <ListItemText primary="Unstarred" />
          </MenuItem>
        </MenuList>
      </Menu>
    </React.Fragment>
  );
}

export default MultiSelectMenu;

