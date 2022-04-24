import {takeEvery, put, call} from 'redux-saga/effects'
//call - блокирующий вызов функции
//еще есть эффект fork - он указывает middleware выполнить неблокирующий вызов переданной функции
// fork используется для одновременного выполнения нескольких функций - по типу Promise.all() - при ошибке валится
// spawn - тоже неблокирующий, но создает паралельную задачу в корне саги, сам процесс не привязан к родителю - по типу Promise.allSettled() - не валится при ошибке в одной из функций
// export default function* rootSaga(){
//     yield spawn(saga1); //auth
//     yield spawn(saga2); //users
//     yield spawn(saga3); //payments
// }
/*const sagas = [saga1, saga2, saga3];
const retrySagas = sagas.map(saga => {
    return spawn (function* (){
        while (true){
            try {
                yield call(saga);
                break;
            }catch (e) {
             console.log(e)
            }
        }
    })
})
yield all(retrySagas)*/
// all - запускает нескользко эффектов параллельно и ждет их завершения (если хоть один из них будет блокирующим,
// то all будет блокирующим, если всу будут неблокирующие - то all будет неблокирующим) - типа Promise.all()
// join - заблокировать не блокирующую задачу и получить ее результат
// select - получить данные из store, аналог useSelect /mapStateToProps
// delay - синхронный setTime out (yield delay(2000)


// export function* loadOnAction() { //аналог takeEvery, но синхронный - последовательно будут выполняться запросы на сервер при нажатии на кнопку
//     const channel = yield actionChannel('LOAD_SOME_DATA');
//
//     while (true) {
//         yield take(channel);
//
//         yield call(fetchPlanets);
//     }
// }

import {FETCH_POSTS, REQUEST_POSTS} from './types'
import {hideLoader, showAlert, showLoader} from './actions'

export function* sagaWatcher() {
    yield takeEvery(REQUEST_POSTS, sagaWorker)
}

function* sagaWorker() {
    try {
        yield put(showLoader())
        const payload = yield call(fetchPosts) //вызов функции fetchPosts
        yield put({ type: FETCH_POSTS, payload }) //dispatch action
        yield put(hideLoader())
    } catch (e) {
        yield put(showAlert('Что-то пошло не так'))
        yield put(hideLoader())
    }
}

async function fetchPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
    return await response.json()
}
//аналог
// const response = yield call(fetch, 'https://jsonplaceholder.typicode.com/posts?_limit=5');
// const data = yield call([response, response.json]);