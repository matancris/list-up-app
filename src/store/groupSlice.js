import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { groupService } from '../services/group-service'


export const getGroups = createAsyncThunk(
    'groups/getGroups',
    async (dispatch, thunkAPI) => {
        try {
            const groupsToShow = await groupService.query()
            return groupsToShow;
        } catch (err) {
            console.error(err)
        }
    }
)

export const removeGroup = createAsyncThunk(
    'groups/removeGroup',
    async (groupId, thunkAPI) => {
        try {
            const removedGroup = await groupService.deleteGroup(groupId)
            return removedGroup;
        } catch (err) {
            console.error(err)
        }
    }
)

export const addGroup = createAsyncThunk(
    'groups/addGroup',
    async (group, thunkAPI) => {
        const newGroup = await groupService.addGroup(group)
        return newGroup;
    }
)

export const updateGroup = createAsyncThunk(
    'groups/updateGroup',
    async ({ groupId, updatedProduct, prodToRemoveId }, thunkAPI) => {
        const updatedGroups = await groupService.updateGroup(groupId, updatedProduct, prodToRemoveId)
        return updatedGroups;
    }
)

export const removeProdFromGroup = createAsyncThunk(
    'groups/removeProdFromGroup',
    async ({ groupId, prodId }, thunkAPI) => {
        const updatedGroups = await groupService.removeProdFromGroup(groupId, prodId)
        return updatedGroups;
    }
)

export const groupSlice = createSlice({
    name: 'groups',
    initialState: {
        groups: [],
        status: null
    },
    extraReducers: {
        [getGroups.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getGroups.fulfilled]: (state, action) => {
            state.status = 'success'
            state.groups = action.payload
        },
        [getGroups.rejected]: (state, action) => {
            state.status = 'error'
        },
        [removeGroup.fulfilled]: (state, { payload }) => {
            state.status = 'success'
            state.groups = state.groups.filter(group => group.id !== payload.id)
        },
        [removeGroup.pending]: (state, action) => {
            state.status = 'loading'
        },
        [updateGroup.fulfilled]: (state, { payload }) => {
            state.status = 'success'
            state.groups = payload
        },
        [updateGroup.pending]: (state, action) => {
            state.status = 'loading'
        },
        [removeProdFromGroup.fulfilled]: (state, { payload }) => {
            state.status = 'success'
            state.groups = payload
        },
        [addGroup.fulfilled]: (state, { payload }) => {
            state.status = 'success'
            state.groups.push(payload)
        },
        [addGroup.pending]: (state, action) => {
            state.status = 'loading'
        }
    }
})

// Action creators are generated for each case reducer function
//   export const { increment, decrement, incrementByAmount } = groupSlice.actions
// export const { getGroups } = groupSlice.actions

export default groupSlice.reducer

