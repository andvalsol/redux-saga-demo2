// noinspection DuplicatedCode
import {put, takeEvery, takeLatest,} from "redux-saga/effects"
import {ADD_TO_CART, ADD_TO_CART_SAGA, REMOVE_FROM_CART, REMOVE_FROM_CART_SAGA} from "../types";

// Test fake async behaviour
export const wait = (ms) => new Promise((res) => setTimeout(res, ms)) // Always resolve

const total = (newCart) => {
    let totalVal = 0;
    for (let i = 0; i < newCart.length; i++) {
        totalVal += newCart[i].price;
    }
    return totalVal;
};

export function* addToCartSaga(action) {
    // Here we receive the action and we need to get the item and the cart
    // Remember! that sagas are middlewares between actions and reducers
    const {item, cart} = action.payload

    const newCart = [...cart, item];
    const newTotal = total(newCart);

    yield wait(1000)

    yield put({
        type: ADD_TO_CART,
        payload: {
            newCart,
            newTotal
        }
    })
}

export function* removeFromCartSaga (action) {
    const {item, cart} = action.payload

    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== item.id);
    const newTotal = total(hardCopy);

    yield put({
        type: REMOVE_FROM_CART, // This one will be listened by the reducer
        payload: {
            newTotal,
            newCart: hardCopy
        },
    })
}

// Watch every time that the ADD_TO_CART_SAGA is called
export function* watchAddToCartSaga() {
    // yield takeEvery(ADD_TO_CART_SAGA, addToCartSaga)
    yield takeLatest(ADD_TO_CART_SAGA, addToCartSaga) // This will wait for the latest action and execute it
}

// Watch every time that the REMOVE_FROM_CART_SAGA is called
export function* watchRemoveFromCartSaga() {
    yield takeEvery(REMOVE_FROM_CART_SAGA, removeFromCartSaga)
}
