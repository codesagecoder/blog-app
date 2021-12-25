import { publicRequest, userRequest } from "../requestMethods";
import { loginSuccess, loginFailure, loginStart, updateFailure, updateStart, updateSuccess } from "./userSlice";

export const login = async (user, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};

export async function updateUser(updatedUser, id, dispatch) {
    dispatch(updateStart());
    try {
        const rs = await userRequest().put("/users/" + id, updatedUser);
        dispatch(updateSuccess(rs.data));
    } catch (err) {
        dispatch(updateFailure());
    }
}