import { Field, Form } from "formik";
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
// import { useNavigate } from 'react-router-dom';

import {
  Alert,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  Collapse,
  CustomInput,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Label,
  Row,
  UncontrolledAlert,
  UncontrolledDropdown,
} from "reactstrap";

import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import {
  FormikCustomCheckbox,
  FormikRadioButtonGroup,
} from "../../../containers/form-validations/FormikFields";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import IntlMessages from "../../../helpers/IntlMessages";

import AddNewPartnerModal from "./AddNewPartnerModal";
import PartnerListItem from "./ListItem";
import PartnerApplicationMenu from "./PartnerApplicationMenu";

const options = [
  { value: "si", label: "SI" },
  { value: "no", label: "NO" },
];

const questions = [
  { id: "q1", label: "1. Hipertensión arterial no controlada (*)" },
  { id: "q2", label: "2. Enfermedades cardiovasculares graves (*)" },
  { id: "q3", label: "3. Diabetes Mellitus (*)" },
  {
    id: "q4",
    label: "4. Obesidad con IMC de 40 a mas (*)",
    help:
      "El índice de masa corporal (IMC) se determina usando la formula peso(kg) / estatura(m)^2 Ejemplo: Peso 68 kg, Estatura = 1.66 m, Cálculo IMC = 68 / (1.65)(1.65) = 24.98",
  },
  { id: "q5", label: "5. Cáncer (*)" },
  { id: "q6", label: "6. Asma moderada o grave (*)" },
  { id: "q7", label: "7. Enfermedad pulmonar crónica (*)" },
  {
    id: "q8",
    label: "8. Insuficiencia renal crónica en tratamiento con hemodiálisis (*)",
  },
  { id: "q9", label: "9. Enfermedad o tratamiento inmunosupresor (*)" },
  { id: "q10", label: "10. Edad mayor de 65 años (*)" },
  { id: "q11", label: "11. Gestación (*)" },
  { id: "q12", label: "12. Otros (*)" },
];

class PartnerFormComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownSplitOpen: false,
      modalOpen: false,
      lastChecked: null,

      displayOptionsIsOpen: false,
    };
  }

  componentDidMount() {
    this.props.getPartnerList();
  }

  toggleDisplayOptions = () => {
    this.setState({ displayOptionsIsOpen: !this.state.displayOptionsIsOpen });
  };

  toggleModal = () => {
    // let navigate = useNavigate();
    this.props.history.push("new");
    // navigate('/');
    // this.setState({
    //   modalOpen: !this.state.modalOpen
    // });
  };

  toggleSplit = () => {
    this.setState((prevState) => ({
      dropdownSplitOpen: !prevState.dropdownSplitOpen,
    }));
  };

  changeOrderBy = (column) => {
    this.props.getPartnerListWithOrder(column);
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.props.getPartnerListSearch(e.target.value);
    }
  };

  handleCheckChange = (event, id) => {
    if (this.state.lastChecked == null) {
      this.setState({ lastChecked: id });
    }

    let selectedItems = Object.assign([], this.props.partnerApp.selectedItems);
    if (selectedItems.includes(id)) {
      selectedItems = selectedItems.filter((x) => x !== id);
    } else {
      selectedItems.push(id);
    }
    this.props.selectedPartnerItemsChange(selectedItems);

    if (event.shiftKey) {
      var items = this.props.partnerApp.items;
      var start = this.getIndex(id, items, "id");
      var end = this.getIndex(this.state.lastChecked, items, "id");
      items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedItems.push(
        ...items.map((item) => {
          return item.id;
        })
      );
      selectedItems = Array.from(new Set(selectedItems));
      this.props.selectedPartnerItemsChange(selectedItems);
    }
    return;
  };

  handleChangeSelectAll = () => {
    if (this.props.partnerApp.loading) {
      if (
        this.props.partnerApp.selectedItems.length >=
        this.props.partnerApp.items.length
      ) {
        this.props.selectedPartnerItemsChange([]);
      } else {
        this.props.selectedPartnerItemsChange(
          this.props.partnerApp.items.map((x) => x.id)
        );
      }
    }
  };

  getIndex(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  }
  render() {
    const {
      values,
      isSubmitting,
      isValid,
      setFieldValue,
      setFieldTouched,
      errors,
      touched,
    } = this.props;

    const {
      items,
      searchKeyword,
      loading,
      orderColumn,
      orderColumns,
      selectedItems,
    } = this.props.data;

    const { messages } = this.props.intl;
    const { modalOpen } = this.state;

    return (
      <Fragment>
        <Row className="app-row survey-app">
          <Colxx xxs="12">
            <div className="mb-2">
              <h1>
                <IntlMessages id="menu.partner" />
              </h1>
              {!loading && (
                <div className="float-sm-right">
                  <Button
                    color="primary"
                    size="lg"
                    className="top-right-button"
                    onClick={this.toggleModal}
                  >
                    <IntlMessages id="partner.add-new" />
                  </Button>{" "}
                  <ButtonDropdown
                    isOpen={this.state.dropdownSplitOpen}
                    toggle={this.toggleSplit}
                  >
                    <div className="btn btn-primary pl-4 pr-0 check-button check-all">
                      <CustomInput
                        className="custom-checkbox mb-0 d-inline-block"
                        type="checkbox"
                        id="checkAll"
                        checked={selectedItems.length >= items.length}
                        onClick={() => this.handleChangeSelectAll()}
                        onChange={() => this.handleChangeSelectAll()}
                        label={
                          <span
                            className={`custom-control-label ${
                              selectedItems.length > 0 &&
                              selectedItems.length < items.length
                                ? "indeterminate"
                                : ""
                            }`}
                          />
                        }
                      />
                    </div>{" "}
                    <DropdownToggle
                      caret
                      color="primary"
                      className="dropdown-toggle-split pl-2 pr-2"
                    />
                    <DropdownMenu right>
                      <DropdownItem>
                        <IntlMessages id="partner.action" />
                      </DropdownItem>
                      <DropdownItem>
                        <IntlMessages id="partner.another-action" />
                      </DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </div>
              )}
              <Breadcrumb match={this.props.match} />
            </div>

            <div className="mb-2">
              <Button
                color="empty"
                id="displayOptions"
                className="pt-0 pl-0 d-inline-block d-md-none"
                onClick={this.toggleDisplayOptions}
              >
                <IntlMessages id="partner.display-options" />{" "}
                <i className="simple-icon-arrow-down align-middle" />
              </Button>
              <Collapse
                className="d-md-block"
                isOpen={this.state.displayOptionsIsOpen}
              >
                <div className="d-block mb-2 d-md-inline-block">
                  <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                    <DropdownToggle caret color="outline-dark" size="xs">
                      <IntlMessages id="partner.orderby" />
                      {orderColumn ? orderColumn.label : ""}
                    </DropdownToggle>
                    <DropdownMenu>
                      {orderColumns.map((o, index) => {
                        return (
                          <DropdownItem
                            key={index}
                            onClick={() => this.changeOrderBy(o.column)}
                          >
                            {o.label}
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                    <input
                      type="text"
                      name="keyword"
                      id="search"
                      placeholder={messages["menu.search"]}
                      defaultValue={searchKeyword}
                      onKeyPress={(e) => this.handleKeyPress(e)}
                    />
                  </div>
                </div>
              </Collapse>
            </div>
            <Separator className="mb-5" />
            <Row>
              {!loading ? (
                items.map((item, index) => (
                  <PartnerListItem
                    key={`partner_item_${index}`}
                    item={item}
                    handleCheckChange={this.handleCheckChange}
                    isSelected={
                      loading ? selectedItems.includes(item.id) : false
                    }
                  />
                ))
              ) : (
                <div className="loading" />
              )}
            </Row>
          </Colxx>
        </Row>
        {!loading && <PartnerApplicationMenu />}
        <AddNewPartnerModal
          toggleModal={this.toggleModal}
          modalOpen={modalOpen}
        />
      </Fragment>
    );
  }
}
export default PartnerFormComponent;
