import React, {useEffect, useState, useRef, Fragment} from 'react';
import {Button, Tab, Tabs, InputAdornment, Icon, Typography} from '@material-ui/core';
import Formsy from 'formsy-react';
import {orange} from '@material-ui/core/colors';
import {makeStyles} from '@material-ui/styles';
import {FuseAnimate, FusePageCarded} from '@fuse';
import {useForm} from '@fuse/hooks';
import {TextFieldFormsy} from '@fuse';
import {Link} from 'react-router-dom';
import _ from '@lodash';
import {useDispatch, useSelector} from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from './store/actions';
import reducer from './store/reducers';

const useStyles = makeStyles(theme => ({
    userImageFeaturedStar: {
        position: 'absolute',
        top     : 0,
        right   : 0,
        color   : orange[400],
        opacity : 0
    },
    userImageUpload      : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
    },
    userImageItem        : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover'               : {
            '& $userImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured'            : {
            pointerEvents                      : 'none',
            boxShadow                          : theme.shadows[3],
            '& $userImageFeaturedStar'      : {
                opacity: 1
            },
            '&:hover $userImageFeaturedStar': {
                opacity: 1
            }
        }
    }
}));

const API_PATH='users';

function User(props)
{
    const dispatch = useDispatch();
    const record = useSelector(({usersApp}) => usersApp.record.data);

    const {form, setForm} = useForm(null);
    const [isNew, setIsNew] = useState(true);
    const [id, setId] = useState();

    useEffect(() => {
        function updateFormState()
        {
            const params = props.match.params;
            const {id} = params;
            setId(id);
            if ( id === 'new' )
            {
                dispatch(Actions.newRecord());
                //console.log('new');
            }
            else
            {
                console.log(props.match.params);
                dispatch(Actions.getById(API_PATH, id));
                setIsNew(false);
            }
        }

        updateFormState();
    }, [dispatch, props.match.params]);

    useEffect(() => {
        if (
            (record.data && !form) ||
            (record.data && form && record.data._id !== form._id)
        )
        {
            setForm(record.data);
            if (record.data._id) {
                setIsNew(false);
            }
        }
    }, [form, record.data, setForm]);


    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);

    function disableButton()
    {
        setIsFormValid(false);
    }

    function enableButton()
    {
        setIsFormValid(true);
    }

    function handleSubmit(model)
    {
        if(isNew) {
            dispatch(Actions.create('auth/signup', model));
        } else {
            dispatch(Actions.updateById(API_PATH, id, model));
        }
    }

    return (
        <FusePageCarded
            classes={{
                toolbar: "p-0",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                record && (
                    <div className="flex flex-1 w-full items-center justify-between">

                        <div className="flex flex-col items-start max-w-full">

                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/users" color="inherit">
                                    <Icon className="mr-4 text-20">arrow_back</Icon>
                                    Usuarios
                                </Typography>
                            </FuseAnimate>
                        </div>
                    </div>
                )
            }
            contentToolbar={
                <Tabs
                    value={0}
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
                record && (
                    <div className="p-16 sm:p-24 max-w-2xl">
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
                                  autoComplete="off"
                                  value={record.username}
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
                                  autoComplete="off"
                                  value={record.email}
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

                              <TextFieldFormsy
                                  className="mb-16"
                                  type="password"
                                  name="password"
                                  label="Password"
                                  autoComplete="off"
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
                              
                            { isNew ? 
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
                            :
                            <Fragment>
                                <div className="flex flex-col items-start max-w-full">
                                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button"
                                        to={`/apps/partners/${record.partner_id}`} color="inherit">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Empleado
                                    </Typography>
                                </FuseAnimate>
                                </div>
                                <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className="w-full mx-auto mt-16 normal-case"
                                aria-label="REGISTER"
                                disabled={!isFormValid}
                                value="legacy"
                            >
                                Update
                            </Button>
                            </Fragment>
                            }
                          </Formsy>

                      
                    </div>
                )
            }
            innerScroll
        />
    )
}

export default withReducer('usersApp', reducer)(User);
