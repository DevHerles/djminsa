import React from 'react';
import {Icon} from '@material-ui/core';

function FormRow(props){
  const {icon, children} = props;
  return (
    <div className="flex flex-col md:flex-row">
        <div className="min-w-48 pt-20 hidden md:block">
            <Icon color="action">{icon}</Icon>
        </div>
        {children}
    </div>
  );
}

export default FormRow;