import {all} from "redux-saga/effects";

import {watchAddToCartSaga, watchRemoveFromCartSaga} from "./CartSagas";
import {watchFindCustomerSaga, watchFindEmployeeSaga} from "./UserSagas";

export default function* rootSaga() {
    yield all([
        watchAddToCartSaga(),
        watchRemoveFromCartSaga(),
        watchFindEmployeeSaga(),
        watchFindCustomerSaga(),
    ])
}
