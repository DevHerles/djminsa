import { combineReducers } from "redux";
import { dCandidateReducers } from "./dCandidate";
import { dAuthenticationReducers } from "./dAuthentication";

export const reducers = combineReducers({
    dCandidate: dCandidateReducers,
    dAuthentication: dAuthenticationReducers,
})