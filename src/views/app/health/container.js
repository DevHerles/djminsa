import React, { Component } from 'react';
import { Fragment } from 'react';
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { connect } from 'react-redux';

import {
    addHealth,
} from "../../../redux/health/actions";


import Start from "./start";


class HealthContainer extends Component {
    // state = {
    //     opendDialog: false,
    // }

    // handleClickOpen = () => {
    //     this.setState({opendDialog: true});
    // }

    // handleClosdispatch(addHealth)e = () => {
    //     this.props.onCloseDialog();
    // }

    // handleAgree = () => {
    //     this.props.onConfirmResponse();
    //     this.handleClose();
    // }

    constructor(props) {
        super(props);
        //this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // handleInputChange(event) {
    //     const target = event.target;
    //     const value = target.value;
    //     const name = target.name;
    //     const { onInputChange } = this.props;
    //     onInputChange(name, value);
    // }

    handleSubmit(event) {
        event.preventDefault();
        //this.props.onFormSubmit();
        console.log('xadasdasda');
    }

    renderForm() {
        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <Breadcrumb heading="menu.health" match={this.props.match} />
                        <Separator className="mb-5" />
                    </Colxx>
                </Row>
                <Row className="mb-12">
                    <Colxx xxs="12">
                        <Start
                            health={{newHealth: "1"}}
                            onFormSubmit={this.handleSubmit}
                        />
                    </Colxx>
                </Row>
            </Fragment>
        );
    }

    render() {
        console.log('asdasdasdsad');
        return (
            <Fragment>
                {this.renderForm()}
            </Fragment>
        )
    }

}

// const mapStateToProps = ( state ) => {
//     console.log(state);
//     return {
//         newHealth:  state.health.newHealth
//     };
// };

const mapStateToProps = ({ state }) => {
    return {
        state
    };
};

const mapDispatchToProps = (dispatch) => ({
    onFormSubmit: (newHealth) => {
        dispatch(addHealth(newHealth));
    },
    // onInputChange: (name, value) => {
    //     dispatch(handleInputChange(name, value));
    // }
});

export default connect(
    mapStateToProps
)(HealthContainer);