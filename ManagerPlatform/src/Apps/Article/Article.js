/**
 * Created by liushuai on 2018/1/14.
 */
import {adminApiGate} from '../../services/api';
// todo 如何简化
const defaultParams = {
    module: 'Article',
    handler: 'Article',
};
export default {
    namespace: 'Article',
    state: {
        id: 0,
        status: 0,
        loading: false,
    },

    effects: {
        * add({ payload,success}, {select, call, put}) {
            yield put({
                type: 'changeLoading',
                payload: true,
            });
            const response = yield call(adminApiGate, {
                ...defaultParams,
                method: 'add',
                payload: payload
            });
            if (!response) {
                return;
            }
            yield put({
                type: 'save',
                payload: response.data,
            });
            yield put({
                type: 'changeLoading',
                payload: false,
            });
            if (success && typeof success === 'function') {
                success();
            }
        },
    },
    reducers: {
        save(state, action) {
            return {
                ...state,
                data: action.payload,
            };
        },
        changeLoading(state, action) {
            return {
                ...state,
                loading: action.payload,
            };
        }
    },
};
