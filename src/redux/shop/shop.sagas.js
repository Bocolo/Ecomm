import { takeLatest , call, put} from 'redux-saga/effects';
import ShopActionTypes from './shop.types';

import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions.js';




export function* fetchCollectionsAsync() {
   // yield console.log('fetch col Async Fired');

    //Copying code and edting from our thunk Async in shop.actions.js fetch collectionsStartAsync
    try {
        const collectionRef = firestore.collection('collections');
        //using a generator instead of preious promise vesion
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionSnapshotToMap, snapshot);
        //call method that takes a function as first argument, sub args are parameters fro the func call 
        // allows yield control to saga middleware.. e.g ncase we need to cancel

        //sagas do not dispatch with dispatch keyword, uses put and must be yielded.
        //fetch collectionsSucces-- out action generators
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }
   


   /* collectionRef.get().then(snapshot => {
        const collectionsMap = convertCollectionSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
    }).catch(error => dispatch(fetchCollectionsFailure(error.message)));*/
}

//generator functoon*
export function* fetchCollectionsStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync);
}