import React, {useState} from 'react';
import {Avatar, Button, Tab, Tabs, Typography} from '@material-ui/core';
import {FusePageSimple, FuseAnimate} from '@fuse';

function FormHeader (props) {
  const {title, onSubmit, onReset} = props;
  return (
    <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
        <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
            <FuseAnimate animation="transition.expandIn" delay={300}>
                <Avatar className="w-96 h-96" src="assets/images/avatars/Velazquez.jpg"/>
            </FuseAnimate>
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <Typography className="md:ml-24" variant="h4" color="inherit">{title}</Typography>
            </FuseAnimate>
        </div>

        <div className="flex items-center justify-end">
            <Button className="mr-8 normal-case" variant="contained" color="secondary" aria-label="Follow"
              onClick={onSubmit}
            >Guardar</Button>
        </div>
    </div>
  );
}

export default FormHeader;