import { loginStart, loginSuccess, loginFailure } from './adminRedux';
import { publicRequest } from '../requestMethods';

export const adminLogin = async (dispatch, admin) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post('/admins/login', admin);
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure());
    }
};