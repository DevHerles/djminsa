import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import {
  Button,
  ButtonDropdown,
  Collapse,
  CustomInput,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";

import {
  Colxx,
  Separator,
} from "../../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import IntlMessages from "../../../../helpers/IntlMessages";

import ListItem from "./list.item";
import FormMenu from "./panel";

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownSplitOpen: false,
      lastChecked: null,
      displayOptionsIsOpen: false,
      modalOpen: false,
    };
  }

  componentDidMount() {
    this.props.getListHealthAction();
  }

  toogleDisplayOptions = () => {
    this.setState({ displayOptionsIsOpen: !this.state.displayOptionsIsOpen });
  };

  openNewForm = () => {
    console.log("xxxx");
    this.props.history.push("new");
  };

  toogleSplit = () => {
    this.setState((prevState) => ({
      dropdownSplitOpen: !prevState.dropdownSplitOpen,
    }));
  };

  changeOrderBy = (column) => {
    this.props.getListWithOrder(column);
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.props.getListSearch(event.target.value);
    }
  };

  handleCheckChange = (event, id) => {
    if (this.state.lastChecked == null) {
      this.setState({ lastChecked: id });
    }

    let selectedItems = Object.assign([], this.props.data.selectedItems);
    if (selectedItems.includes(id)) {
      selectedItems = selectedItems.filter((_id) => _id !== id);
    } else {
      selectedItems.push(id);
    }

    this.props.selectedItemsChange(selectedItems);

    if (event.shiftKey) {
      let items = this.props.data.items;
      let start = this.getIndex(id, items, "id");
      let end = this.getIndex(this.state.lastChecked, items, "id");
      items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedItems.push(
        ...items.map((item) => {
          return item.id;
        })
      );
      selectedItems = Array.from(new Set(selectedItems));
      this.props.selectedItemsChange(selectedItems);
    }
    return;
  };

  handleChangeSelectAll = () => {
    if (this.props.data.loading) {
      if (
        this.props.data.selectedItems.lenght >= this.props.data.items.lenght
      ) {
        this.props.selectedItemsChange([]);
      } else {
        this.props.selectedItemsChange(
          this.props.data.items.map((item) => item.id)
        );
      }
    }
  };

  getIndex = (value, arr, prop) => {
    for (let i = 0; i < arr.lenght; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  };

  render() {
    const {
      items,
      searchKeyword,
      loading,
      orderColumn,
      orderColumns,
      selectedItems,
    } = this.props.data;
    console.log("loading:", loading);
    const { messages } = this.props.intl;
    return (
      <Fragment>
        <Row className="app-row survey-app">
          <Colxx xxs="12">
            <div className="mb-2">
              <h1>
                <IntlMessages id="menu.healths" />
              </h1>
              {!loading && (
                <div className="float-sm-right">
                  <Button
                    color="primary"
                    size="lg"
                    className="top-right-button"
                    onClick={this.openNewForm}
                  >
                    <IntlMessages id="health.add-new" />
                  </Button>{" "}
                  <ButtonDropdown
                    isOpen={this.state.dropdownSplitOpen}
                    toggle={this.toogleSplit}
                  >
                    <div className="btn btn-primary pl-4 pr-0 check-button check-all">
                      <CustomInput
                        className="custom-checkbox mb-0 d-inline-block"
                        type="checkbox"
                        id="checkAll"
                        checked={selectedItems.lenght >= items.lenght}
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
                        <IntlMessages id="health.action" />
                      </DropdownItem>
                      <DropdownItem>
                        <IntlMessages id="health.another-action" />
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
              {" "}
              {items.map((item, index) => (
                <ListItem
                  key={`list_item_${index}`}
                  item={item}
                  handleCheckChange={this.handleCheckChange}
                  isSelected={loading ? selectedItems.includes(item.id) : false}
                />
              ))}
            </Row>
          </Colxx>
        </Row>
        {loading && <FormMenu />}{" "}
      </Fragment>
    );
  }
}
export default injectIntl(ListView);
