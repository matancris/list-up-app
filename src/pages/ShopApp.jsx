import React, { useEffect } from 'react'
import { GroupList } from '../cmps/GroupList'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { addGroup, changeGroupIdx, getGroups, removeGroup, unMarkAllProd, updateGroup } from '../store/groupSlice'
import { AddGroupFilter } from '../cmps/AddGroupFilter'
import { DragDropContext } from 'react-beautiful-dnd';
import { useCallback } from 'react'


export default function ShopApp() {
  const dispatch = useDispatch()
  const { groups } = useSelector(state => state.groups)

  useEffect(() => {
    dispatch(getGroups())
  }, [dispatch])

  const onUpdateGroup = async (groupId, updatedProduct, prodToRemoveId) => {
    dispatch(updateGroup({ groupId, updatedProduct, prodToRemoveId }))
  }

  const onRemoveGroup = async (groupId) => {
    dispatch(removeGroup(groupId))
  }

  const onAddGroup = async (group) => {
    dispatch(addGroup(group))
  }

  const onDragEnd = useCallback((ev) => {
    const prevIdx = ev.source.index
    const newIdx = ev.destination.index
    dispatch(changeGroupIdx({ prevIdx, newIdx }))
  }, [dispatch]);

  return (
    <section className="shop-app main-container">
      <AddGroupFilter addGroup={onAddGroup} />
      <DragDropContext onDragEnd={onDragEnd}>
        <GroupList groups={groups} onUpdateGroup={onUpdateGroup} onDeleteGroup={onRemoveGroup} />
      </DragDropContext>
    </section>
  )
}


// DEPRECATED
  // import { groupService } from '../services/group-service'

  // const loadGroups = async () => {
    // const groupsToShow = await groupService.query()
    // console.log('loadGroups ~ groupsToShow', groupsToShow)
    // groupsToShow &&
    //   setGroups(structuredClone(groupsToShow))

    // dispatch(getGroups())
  // }

  // const onUpdateGroup = async (groupId, updatedProduct) => {
  //   await groupService.updateGroup(groupId, updatedProduct)
  //   loadGroups()
  // }

   // const onRemoveProd = (groupId, prodId) => {
  //   console.log('onRemoveProd ~ groupId', groupId)
  //   dispatch(removeProdFromGroup({ groupId, prodId }))
  //   // loadGroups()
  // }
