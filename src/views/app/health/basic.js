import React, { Component } from 'react';
import { Fragment } from 'react';
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { withFormik } from "formik";
import {
    addHealth,
} from "../../../redux/health/actions";

class Basic extends Component {
    render(){
        const {
            errors, handleSubmit, isSubmitting, values, setFieldValue, setFieldTouched
        } = this.props;
        console.log(this.props);
        return (<div>Login form</div>)
    }
}

const Form = withFormik({
    validate(values){

    },
    handleSubmit(values, {props, setSubmitting}){
        const {loginUser} = props;
        const payload = {name: values.name, code: values.code};
        console.log(values);
    }
})(Basic);

const mapStateToProps = ({ state }) => {
    return {
        state
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    addHealth
}, dispatch);

const Redux = connect(
    mapStateToProps, mapDispatchToProps
)(Form);

export default Redux;