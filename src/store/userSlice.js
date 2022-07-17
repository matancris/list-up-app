import { createSlice } from '@reduxjs/toolkit';
import { userService } from '../services/user-service';


export const userSlice = createSlice({
    name: 'users',
    initialState: {
        userPref: userService.getUserPref()
    },
    reducers: {
        setUserPref: (state, action) => {
            userService.setUserPref(action.payload)
            state.userPref = action.payload;
        },
    }
})

export const { setUserPref } = userSlice.actions;
export default userSlice.reducer