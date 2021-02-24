import classnames from "classnames";
import React, { Component } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Badge, NavItem } from "reactstrap";

import ApplicationMenu from "../../../../components/common/ApplicationMenu";
import IntlMessages from "../../../../helpers/IntlMessages";
import { getPartnerListWithFilter } from "../../../../redux/partner/actions";

class FormRightMenu extends Component {
  constructor(props) {
    super();
  }

  addFilter = (column, value) => {
    this.props.getPartnerListWithFilter(column, value);
  };

  render() {
    const {
      items,
      filter,
      allItems,
      loading,
      labels,
      categories,
    } = this.props.data;

    return (
      <ApplicationMenu>
        <PerfectScrollbar
          option={{
            suppressScrollX: true,
            wheelPropagation: false,
          }}
        >
          <div className="p-4">
            <p className="text-muted text-small">
              <IntlMessages id="partner.status" />
            </p>
            <ul className="list-unstyled mb-5">
              <NavItem className={classnames({ active: !filter })}>
                <NavLink to="#" onClick={(e) => this.addFilter("", "")}>
                  <i className="simple-icon-reload" />
                  <IntlMessages id="partner.all-tasks" />
                  <span className="float-right">
                    {loading && allItems.length}
                  </span>
                </NavLink>
              </NavItem>
              <NavItem
                className={classnames({
                  active:
                    filter &&
                    filter.column === "status" &&
                    filter.value === "PENDING",
                })}
              >
                <NavLink
                  to="#"
                  onClick={(e) => this.addFilter("status", "PENDING")}
                >
                  <i className="simple-icon-refresh" />
                  <IntlMessages id="partner.pending-tasks" />
                  <span className="float-right">
                    {loading &&
                      items.filter((x) => x.status === "PENDING").length}
                  </span>
                </NavLink>
              </NavItem>
              <NavItem
                className={classnames({
                  active:
                    filter &&
                    filter.column === "status" &&
                    filter.value === "COMPLETED",
                })}
              >
                <NavLink
                  to="#"
                  onClick={(e) => this.addFilter("status", "COMPLETED")}
                >
                  <i className="simple-icon-check" />
                  <IntlMessages id="partner.completed-tasks" />
                  <span className="float-right">
                    {loading &&
                      items.filter((x) => x.status === "COMPLETED")
                        .length}
                  </span>
                </NavLink>
              </NavItem>
            </ul>
            <p className="text-muted text-small">
              <IntlMessages id="partner.categories" />
            </p>
            <ul className="list-unstyled mb-5">
              {categories.map((c, index) => {
                return (
                  <NavItem key={index}>
                    <div onClick={(e) => this.addFilter("category", c)}>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input"
                          defaultChecked={
                            filter &&
                            filter.column === "category" &&
                            filter.value === c
                          }
                        />
                        <label className="custom-control-label">{c}</label>
                      </div>
                    </div>
                  </NavItem>
                );
              })}
            </ul>
            <p className="text-muted text-small">
              <IntlMessages id="partner.labels" />
            </p>
            <div>
              {labels.map((l, index) => {
                return (
                  <p className="d-sm-inline-block mb-1" key={index}>
                    <NavLink
                      to="#"
                      onClick={(e) => this.addFilter("label", l.label)}
                    >
                      <Badge
                        className="mb-1"
                        color={`${
                          filter &&
                          filter.column === "label" &&
                          filter.value === l.label
                            ? l.color
                            : "outline-" + l.color
                        }`}
                        pill
                      >
                        {l.label}
                      </Badge>
                    </NavLink>
                  </p>
                );
              })}
            </div>
          </div>
        </PerfectScrollbar>
      </ApplicationMenu>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.partner,
  };
};
export default connect(mapStateToProps, { getPartnerListWithFilter })(
  FormRightMenu
);
