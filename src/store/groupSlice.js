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
            const groupsToShow = await groupService.getGroups()
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
    async ({ groupId, updatedProduct, prodToRemoveId }, thunkAPI) => {
        const updatedGroup = await groupService.updateGroup(groupId, updatedProduct, prodToRemoveId)
        return updatedGroup;
    }
)

export const changeGroupIdx = createAsyncThunk(
    'groups/changeGroupIdx',
    async ({ prevIdx, newIdx }, thunkAPI) => {
        groupService.changeGroupIdx(prevIdx, newIdx)
        return { prevIdx, newIdx };
    }
)

const groupSlice = createSlice({
    name: 'groups',
    initialState: {
        groups: [],
        status: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGroups.fulfilled, (state, { payload }) => {
                state.groups = payload
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
            .addCase(changeGroupIdx.fulfilled, (state, { payload }) => {
                const groupToMove = state.groups.splice(payload.prevIdx, 1)[0];
                state.groups.splice(payload.newIdx, 0, groupToMove);
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
    }
})


export default groupSlice.reducer


// DEPRECATED


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
        // .addCase(unMarkAllProd.fulfilled, (state, { payload }) => {
        //     const groupIdx = state.groups.findIndex(group => group.id === payload.id)
        //     state.groups[groupIdx].products.forEach(prod => prod.isDone = false)
        // })
        // .addMatcher(isPendingAction, (state, action) => {
        //     if (action.type === 'groups/updateGroup/pending') {
        //         const groupIdx = state.groups.findIndex(group => group.id === action.meta.arg.groupId)
        //         const prevProdIdx = state.groups[groupIdx].products.findIndex(product => product.id === action.meta.arg.updatedProduct.id)
        //         state.prevGroups = [...state.groups]
        //         state.groups[groupIdx].products.splice(prevProdIdx, 1, action.meta.arg.updatedProduct)
        //     }
        //     state.status = 'loading'
        // })
        // .addMatcher(isRejectedAction, (state, action) => {
        //     if (action.type === 'groups/updateGroup/rejected') {
        //         state.groups = [...state.prevGroups]
        //     }

        //     state.status = 'error'
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
        // export const removeProdFromGroup = createAsyncThunk(
        //     'groups/removeProdFromGroup',
        //     async ({ groupId, prodId }, thunkAPI) => {
        //         const updatedGroups = await groupService.removeProdFromGroup(groupId, prodId)
        //         return updatedGroups;
        //     }
        
        // export const unMarkAllProd = createAsyncThunk(
        //     'groups/unMarkAllProd',
        //     async ({ groupId }, thunkAPI) => {
        //         const updatedGroup = await groupService.unMarkAllProd(groupId)
        //         return updatedGroup;
        //     }
        // )

        // )
