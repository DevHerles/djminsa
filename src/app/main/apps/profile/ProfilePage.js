import React, {useEffect, useState, Component} from 'react';
import {Avatar, Button, Tab, Tabs, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {FusePageSimple, FuseAnimate} from '@fuse';
import {withRouter} from 'react-router-dom';
import AboutTab from './tabs/AboutTab';
import {useDispatch, useSelector} from 'react-redux';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import * as Actions from './store/actions';

const useStyles = makeStyles(theme => ({
    layoutHeader: {
        height                        : 320,
        minHeight                     : 320,
        [theme.breakpoints.down('md')]: {
            height   : 240,
            minHeight: 240
        }
    }
}));
const API_PATH='users';

function ProfilePage(props)
{
  const dispatch = useDispatch();
  const profile = useSelector(({profileApp}) => profileApp.profile);
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    function updateProfileState() {
      const params = props.match.params;
      const {id} = params;

      if(id === 'new') {
        dispatch.$inject(Actions.newProfile());
      } else {
        console.log(props.match.params);
        dispatch(Actions.getById(API_PATH, "6042a254ab94b74b82f1fb7c"));
      }
    }
    updateProfileState();
  }, [dispatch, props.match.params]);
  
  function handleTabChange(event, value)
  {
    setSelectedTab(value);
  }
  
  return (
    <FusePageSimple
      classes={{
          header : classes.layoutHeader,
          toolbar: "px-16 sm:px-24"
      }}
      header={
          <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
              <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
                  <FuseAnimate animation="transition.expandIn" delay={300}>
                      <Avatar className="w-96 h-96" src="assets/images/avatars/Velazquez.jpg"/>
                  </FuseAnimate>
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                      <Typography className="md:ml-24" variant="h4" color="inherit">{profile?.data?.name} {profile?.data?.first_name} {profile?.data?.last_name}</Typography>
                  </FuseAnimate>
              </div>

              <div className="flex items-center justify-end">
                  <Button className="mr-8 normal-case" variant="contained" color="secondary" aria-label="Follow">Follow</Button>
                  <Button className="normal-case" variant="contained" color="primary" aria-label="Send Message">Send Message</Button>
              </div>
          </div>
      }
      contentToolbar={
          <Tabs
              value={0}
              indicatorColor="secondary"
              textColor="secondary"
              variant="scrollable"
              scrollButtons="off"
              classes={{
                  root: "h-64 w-full border-b-1"
              }}
          >
              <Tab
                  classes={{
                      root: "h-64"
                  }} label="About"/>
          </Tabs>
      }
      content={
          <div className="p-16 sm:p-24">
              <AboutTab data={profile.data}/>
          </div>
      }
    />
  );
}

export default withReducer('profileApp', reducer)(ProfilePage);
