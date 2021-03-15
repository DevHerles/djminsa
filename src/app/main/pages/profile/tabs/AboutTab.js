import React, {useEffect, useState} from 'react';
import {Avatar, AppBar, Button, Card, CardContent, Icon, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Toolbar, Typography} from '@material-ui/core';
import {FuseAnimateGroup} from '@fuse';
import {withRouter} from 'react-router-dom';
import * as Actions from '../store/actions';
import {useDispatch, useSelector} from 'react-redux';
import ReadOnlyField from '../components/ReadOnlyField';

function AboutTab(props)
{
    // const dispatch = useDispatch();
    // const profiles = useSelector(({profileApp}) => profileApp.profiles.data);
    // const [data, setData] = useState(profiles);
    
    const { data } = props;

    // if ( !form )
    // {
    //     return null;
    // }

    // const {general, work, contact, groups, friends} = form;

    return (
        <div className="md:flex max-w-full">

            <div className="flex flex-col flex-1 md:pr-32">
                <FuseAnimateGroup
                    enter={{
                        animation: "transition.slideUpBigIn"
                    }}
                >
                    <Card className="w-full mb-16">
                        <AppBar position="static" elevation={0}>
                            <Toolbar className="pl-16 pr-8">
                                <Typography variant="subtitle1" color="inherit" className="flex-1">
                                    Información general
                                </Typography>
                            </Toolbar>
                        </AppBar>

                        <CardContent>
                            <ReadOnlyField title="Tipo de usuario" value={data?.partner_type}/>
                            <ReadOnlyField title="Tipo de documento" value={data?.doc_type}/>
                            <ReadOnlyField title="Número de documento" value={data?.doc_number}/>
                            <ReadOnlyField title="Apellido paterno" value={data?.first_name}/>
                            <ReadOnlyField title="Apellido materno" value={data?.last_name}/>
                            <ReadOnlyField title="Nombres" value={data?.name}/>
                            <ReadOnlyField title="Fecha de nacimiento" value={data?.dob}/>
                            <ReadOnlyField title="Tipo de seguro" value={data?.assurance}/>
                        </CardContent>
                    </Card>
                </FuseAnimateGroup>
            </div>

            <div className="flex flex-col flex-1 md:pr-32">
                <FuseAnimateGroup
                    enter={{
                        animation: "transition.slideUpBigIn"
                    }}
                >
                    <Card className="w-full mb-16">
                        <AppBar position="static" elevation={0}>
                            <Toolbar className="pl-16 pr-8">
                                <Typography variant="subtitle1" color="inherit" className="flex-1">
                                    Datos laborales
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <CardContent>
                            <ReadOnlyField title="Dirección" value={data?.address}/>
                            <ReadOnlyField title="Celular" value={data?.cellphone}/>
                            <ReadOnlyField title="Correo electrónico" value={data?.email}/>
                        </CardContent>
                    </Card>

                    <Card className="w-full mb-16">
                        <AppBar position="static" elevation={0}>
                            <Toolbar className="pl-16 pr-8">
                                <Typography variant="subtitle1" color="inherit" className="flex-1">
                                    Datos de salud
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <CardContent>
                            <ReadOnlyField title="¿Posee declaración jurada de salud?" value={data?.hasHealth}/>
                            <ReadOnlyField title="¿Posee declaración jurada de sintomatología?" value={data?.hastSymptoms}/>
                            <ReadOnlyField title="Seguimiento de estado de salud" value={data?.email}/>
                        </CardContent>
                    </Card>
                </FuseAnimateGroup>
            </div>
        </div>
    );
}

export default withRouter(AboutTab);
