import {
    all,
    call,
    fork,
    put,
    takeEvery
} from "redux-saga/effects";
import {
    getDateWithFormat
} from "../../helpers/Utils";

import {
    PARTNER_GET_LIST,
    PARTNER_ADD_ITEM
} from "../actions";

import {
    getPartnerListSuccess,
    getPartnerListError,
    addPartnerItemSuccess,
    addPartnerItemError
} from "./actions";

import partners from "../../data/partners.json";

import partnerService from '../../services/partner.service';

const getPartnerListRequest = async () => {
    return await partnerService.getAll()
    .then(partner => partner)
    .catch(error => error);

    // return await new Promise((success, fail) => {
    //         setTimeout(() => {
    //             success(partners.data);
    //         }, 1000);
    //     })
    //     .then(response => response)
    //     .catch(error => error);
};

function* getPartnerListItems() {
    try {
        const response = yield call(getPartnerListRequest);
        yield put(getPartnerListSuccess(response));
    } catch (error) {
        yield put(getPartnerListError(error));
    }
}

const addPartnerItemRequest = async item => {
    let items = partners.data;
    item.id = items.length + 1;
    item.createDate = getDateWithFormat();
    items.splice(0, 0, item);

    return await partnerService.create(item)
    .then(response => response)
    .catch(error => error);
    
    // return await new Promise((success, fail) => {
    //         setTimeout(() => {
    //             success(items);
    //         }, 1000);
    //     })
    //     .then(response => response)
    //     .catch(error => error);
};

function* addPartnerItem({
    payload
}) {
    try {
        const response = yield call(addPartnerItemRequest, payload);
        console.log(response);
        if (!response.message) {
            console.log("response.data:", response.data);
            yield put(addPartnerItemSuccess(response.data));
        } else {
            yield put(addPartnerItemError(response.message));
        }
    } catch (error) {
        console.log(error);
        yield put(addPartnerItemError(error));
    }
}

export function* watchGetList() {
    yield takeEvery(PARTNER_GET_LIST, getPartnerListItems);
}

export function* wathcAddItem() {
    yield takeEvery(PARTNER_ADD_ITEM, addPartnerItem);
}

export default function* rootSaga() {
    yield all([
        fork(watchGetList),
        fork(wathcAddItem)
    ]);
}