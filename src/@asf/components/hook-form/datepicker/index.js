import 'date-fns';
import React from "react";
import {Grid} from '@material-ui/core';
import { useFormContext, Controller } from "react-hook-form";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const MuiDatePicker = (props) => {
  const { name, required, errorobj } = props;
  let isError = false;
  let errorMessage = "";
  if (errorobj && errorobj.hasOwnProperty(name)) {
    isError = true;
    errorMessage = errorobj[name].message;
  }
  return (
    <React.Fragment>
      <KeyboardDatePicker
        format="dd-MM-yyyy"
        fullWidth={true}
        maxDate={new Date()}
        InputLabelProps={{
          className: required ? "required-label" : "",
          required: required || false,
        }}
        clearable
        error={isError}
        helperText={errorMessage}
        {...props}
      />
    </React.Fragment>
  );
};

function FormDatePicker(props) {
  const { control } = useFormContext();
  const { name, label } = props;

  return (
    <React.Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <Controller
          as={MuiDatePicker}
          name={name}
          control={control}
          label={label}
          defaultValue={null}
          {...props}
        />
      </Grid>
      </MuiPickersUtilsProvider>
    </React.Fragment>
  );
}

export default FormDatePicker;
