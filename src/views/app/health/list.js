import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getListHealthAction } from "../../../redux/health/actions";

import ListView from "./components/list";

const mapStateToProps = (state) => ({
  data: state.health,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getListHealthAction,
    },
    dispatch
  );

const HealthList = connect(mapStateToProps, mapDispatchToProps)(ListView);

export default HealthList;
