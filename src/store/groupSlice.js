import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { groupService } from '../services/group-service-firebase'


function isPendingAction(action) {
    return action.type.endsWith('/pending')
}
function isRejectedAction(action) {
    return action.type.endsWith('/rejected')
}
function isFulfilledAction(action) {
    return action.type.endsWith('/fulfilled')
}

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
            const removedGroupId = await groupService.deleteGroup(groupId)
            return removedGroupId;
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
    async ({ groupId, updatedProduct, prodToRemoveId, groupIdx }, thunkAPI) => {
        const updatedGroup = await groupService.updateGroup(groupId, updatedProduct, prodToRemoveId)
        return updatedGroup;
    }
)

// export const removeProdFromGroup = createAsyncThunk(
//     'groups/removeProdFromGroup',
//     async ({ groupId, prodId }, thunkAPI) => {
//         const updatedGroups = await groupService.removeProdFromGroup(groupId, prodId)
//         return updatedGroups;
//     }
// )

export const groupSlice = createSlice({
    name: 'groups',
    initialState: {
        groups: [],
        status: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGroups.fulfilled, (state, action) => {
                state.groups = action.payload
            })
            .addCase(removeGroup.fulfilled, (state, { payload }) => {
                state.groups = state.groups.filter(group => group.id !== payload)
            })

            .addCase(updateGroup.fulfilled, (state, { payload }) => {
                const groupIdx = state.groups.findIndex(group => group.id === payload.id)
                state.groups[groupIdx] = payload
            })

            .addCase(addGroup.fulfilled, (state, { payload }) => {
                state.groups.push(payload)
            })
            
            // Matchers for pending, fulfilled, and rejected actions
            .addMatcher(isPendingAction, (state, action) => {
                state.status = 'loading'
            })
            .addMatcher(isRejectedAction, (state, action) => {
                state.status = 'error'
            })
            .addMatcher(isFulfilledAction, (state, action) => {
                state.status = 'success'
            })


        // .addCase(removeGroup.rejected, (state, action) => {
        // console.log('action', action)
        // const groupIdx = state.groups.findIndex(group => group.id === action.meta.arg.groupId)
        // const prevProdIdx = state.groups[groupIdx].products.findIndex(product => product.id === action.meta.arg.updatedProduct.id)
        // state.groups[groupIdx].products.splice(prevProdIdx, 1, action.meta.arg.updatedProduct)
        // state.status = 'error'
        // })
        // .addCase(updateGroup.pending, (state, action) => {
        //     // const groupIdx = state.groups.findIndex(group => group.id === action.meta.arg.groupId)
        //     // const prevProdIdx = state.groups[groupIdx].products.findIndex(product => product.id === action.meta.arg.updatedProduct.id)
        //     // state.groups[groupIdx].products.splice(prevProdIdx, 1, action.meta.arg.updatedProduct)
        //     state.status = 'loading'
        // })
        // [updateGroup.pending]: (state, action) => {
        //     const groupIdx = state.groups.findIndex(group => group.id === action.meta.arg.groupId)
        //     const prevProdIdx = state.groups[groupIdx].products.findIndex(product => product.id === action.meta.arg.updatedProduct.id)
        //     state.groups[groupIdx].products.splice(prevProdIdx, 1, action.meta.arg.updatedProduct)
        //     state.status = 'loading'
        // },

        // [removeProdFromGroup.fulfilled]: (state, { payload }) => {
        //     state.status = 'success'
        //     state.groups = payload
        // },
    }
})


export default groupSlice.reducer


