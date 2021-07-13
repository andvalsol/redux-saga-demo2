import {put, takeEvery, call, all, race} from "redux-saga/effects"
import {FIND_CUSTOMER, FIND_CUSTOMER_SAGA, FIND_EMPLOYEE, FIND_EMPLOYEE_SAGA} from "../types";
import {wait} from "./CartSagas";

export function* findEmployeeSaga () {
    const url = "https://randomuser.me/api/";
    let res = yield fetch(url, { headers: { "Content-Type": "application/json" } });
    res = yield res.json();
    let employee = res.results[0];

    yield put({
        type: FIND_EMPLOYEE,
        payload: employee
    })
}

export function* findBoth() {
    const url = "https://randomuser.me/api/";
    const headers = {headers: {"Content-Type": "application/json"}}

    // We use square brackets to destructure an array
    let [employeeFinder, customerFinder] = yield all([
        call(fetch, url, headers),
        call(fetch, url, headers)
    ]);

    [employeeFinder, customerFinder] = yield all([
        employeeFinder.json(),
        customerFinder.json()
    ]);

    [employeeFinder, customerFinder] = yield all([
        employeeFinder.results[0],
        customerFinder.results[0]
    ]);

    yield all([
        put({type: FIND_EMPLOYEE, payload: employeeFinder}),
        put({type: FIND_CUSTOMER, payload: customerFinder})
    ])
}

export function* findCustomerSaga() {
    const url = "https://randomuser.me/api/";
    let res = yield fetch(url, {headers: {"Content-Type": "application/json"}});
    res = yield res.json();

    let customer = res.results[0];

    yield put({
        type: FIND_CUSTOMER,
        payload: customer
    })
}

export function* raceMe() {
    const url = "https://randomuser.me/api/";
    const setHeaders =  {headers: { "Content-Type": "application/json" } }

    const {person} = yield race({
        person: call(fetch, url, setHeaders),
        timeout: wait(1000)
    })

    if(person) console.log("Success")
    else console.log("Too slow")
}

export function* watchFindEmployeeSaga() {
    yield takeEvery(FIND_EMPLOYEE_SAGA, findEmployeeSaga)
}

export function* watchFindCustomerSaga() {
    yield takeEvery(FIND_CUSTOMER_SAGA, findCustomerSaga)
}
