import React, { Component } from 'react';
import {Button, Tab, Tabs, InputAdornment, Icon, Typography} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Formsy from 'formsy-react';
import {FuseAnimate, FusePageCarded, FuseChipSelect} from '@fuse';
import {TextFieldFormsy} from '@fuse';
import {Link} from 'react-router-dom';

class FormViewComponent extends Component {
  render () {

    return (
      <FusePageCarded
            classes={{
                toolbar: "p-0",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                form && (
                    <div className="flex flex-1 w-full items-center justify-between">

                        <div className="flex flex-col items-start max-w-full">

                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/users" color="inherit">
                                    <Icon className="mr-4 text-20">arrow_back</Icon>
                                    Usuarios
                                </Typography>
                            </FuseAnimate>

                            {/* <div className="flex items-center max-w-full">
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    {form.images.length > 0 && form.featuredImageId ? (
                                        <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src={_.find(form.images, {id: form.featuredImageId}).url} alt={form.name}/>
                                    ) : (
                                        <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src="assets/images/ecommerce/user-image-placeholder.png" alt={form.name}/>
                                    )}
                                </FuseAnimate>
                                <div className="flex flex-col min-w-0">
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography className="text-16 sm:text-20 truncate">
                                            {form.name ? form.name : 'New User'}
                                        </Typography>
                                    </FuseAnimate>
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography variant="caption">User Detail</Typography>
                                    </FuseAnimate>
                                </div>
                            </div> */}
                        </div>
                        <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            <Button
                                className="whitespace-no-wrap"
                                variant="contained"
                                disabled={!canBeSubmitted()}
                                onClick={() => dispatch(Actions.saveUser(form))}
                            >
                                Save
                            </Button>
                        </FuseAnimate>
                    </div>
                )
            }
            contentToolbar={
                <Tabs
                    value={tabValue}
                    onChange={handleChangeTab}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="scrollable"
                    scrollButtons="auto"
                    classes={{root: "w-full h-64"}}
                >
                    <Tab className="h-64 normal-case" label="Información del usuario"/>
                </Tabs>
            }
            content={
                form && (
                    <div className="p-16 sm:p-24 max-w-2xl">
                        {tabValue === 0 &&
                        (
                          <Formsy
                              onValidSubmit={handleSubmit}
                              onValid={enableButton}
                              onInvalid={disableButton}
                              ref={formRef}
                              className="flex flex-col justify-center w-full"
                          >
                              <TextFieldFormsy
                                  className="mb-16"
                                  type="text"
                                  name="username"
                                  label="Usuario"
                                  value={form.username}
                                  validations={{
                                      minLength: 4
                                  }}
                                  validationErrors={{
                                      minLength: 'Min character length is 4'
                                  }}
                                  InputProps={{
                                      endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">person</Icon></InputAdornment>
                                  }}
                                  variant="outlined"
                                  required
                              />

                              <TextFieldFormsy
                                  className="mb-16"
                                  type="text"
                                  name="email"
                                  label="Email"
                                  value={form.email}
                                  validations="isEmail"
                                  validationErrors={{
                                      isEmail: 'Please enter a valid email'
                                  }}
                                  InputProps={{
                                      endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                                  }}
                                  variant="outlined"
                                  required
                              />
                            <FuseChipSelect
                                className="w-full my-16"
                                value={form.roles}
                                onChange={handleChipChange}
                                placeholder="Selecciones múltiples roles"
                                textFieldProps={{
                                    label: 'Roles',
                                    InputLabelProps: {
                                        shrink: true
                                    },
                                    variant: 'outlined'
                                }}
                                options={suggestions}
                                isMulti
                            />
                            {/* <FuseChipSelectFormsy
                                className="my-16"
                                name="rolesxxx"
                                value={
                                    form.roles.map(labelId => {
                                        const label = _.find(labels, {id: labelId});
                                        return label && {
                                            value: labelId,
                                            label: label.name,
                                            class: label.class
                                        }
                                    })
                                }
                                onChange={(value) => chipChange('roles', value)}
                                placeholder="Select multiple tags"
                                textFieldProps={{
                                    label: 'Roles',
                                    InputLabelProps: {
                                        shrink: true
                                    },
                                    variant : 'outlined'
                                }}
                                options={labels.map((label) => (
                                    {
                                        value: label.id,
                                        label: label.name,
                                        class: label.class
                                    }
                                ))}
                                isMulti
                                validations={{minLength: 1}}
                                validationErrors={{
                                    minLength: 'You need to select at least two'
                                }}
                                required
                            /> */}
                            <FormControl>
                            <FuseChipSelect
                                className='sm:mr-8'
                                name="roles"
                                value={
                                    form.roles.map(labelId => {
                                        const label = _.find(labels, {id: labelId});
                                        return label && {
                                            value: labelId,
                                            label: label.name,
                                            class: label.class
                                        }
                                    })
                                }
                                onChange={(value) => chipChange('roles', value)}
                                placeholder="Select multiple Labels"
                                isMulti
                                textFieldProps={{
                                    variant: "outlined"
                                }}
                                options={labels.map((label) => (
                                    {
                                        value: label.id,
                                        label: label.name,
                                        class: label.class
                                    }
                                ))}
                                onCreateOption={(name) => {
                                    // Create New Label
                                    const newLabel = new LabelModel({name});

                                    // Ad new Label to board(redux store and server)
                                    //dispatch(Actions.addLabel(newLabel));

                                    // Trigger handle chip change
                                    addNewChip('idLabels', newLabel.id);

                                    return newLabel.id;
                                }}
                            />
                            </FormControl>
                              <TextFieldFormsy
                                  className="mb-16"
                                  type="password"
                                  name="password"
                                  label="Password"
                                  validations="equalsField:password_confirm"
                                  validationErrors={{
                                      equalsField: 'Passwords do not match'
                                  }}
                                  InputProps={{
                                      endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                                  }}
                                  variant="outlined"
                                  required
                              />

                              <TextFieldFormsy
                                  className="mb-16"
                                  type="password"
                                  name="password_confirm"
                                  label="Confirm Password"
                                  validations="equalsField:password"
                                  validationErrors={{
                                      equalsField: 'Passwords do not match'
                                  }}
                                  InputProps={{
                                      endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                                  }}
                                  variant="outlined"
                                  required
                              />

                              <Button
                                  type="submit"
                                  variant="contained"
                                  color="primary"
                                  className="w-full mx-auto mt-16 normal-case"
                                  aria-label="REGISTER"
                                  disabled={!isFormValid}
                                  value="legacy"
                              >
                                  Register
                              </Button>

                          </Formsy>

                      
                        )}
                    </div>
                )
            }
            innerScroll
        />
    );
  }
}

export default FormViewComponent;