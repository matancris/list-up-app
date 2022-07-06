import React, { useEffect, useState } from 'react'
import { GroupList } from '../cmps/GroupList'
import { groupService } from '../services/group-service'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { addGroup, getGroups, removeGroup, removeProdFromGroup, updateGroup } from '../store/groupSlice'
import { AddGroupFilter } from '../cmps/AddGroupFilter'
// import { groupServiceAWS } from '../services/group-service-aws'

export default function ShopApp() {
  // let [groups1, setGroups] = useState([])
  const dispatch = useDispatch()
  const { groups } = useSelector(state => state.groups)


  useEffect(() => {
    console.log('before fatch') // TODO: spelling : fetch
    // async function getGroups() {
    //   const groupsToShow = await groupService.query()
    //   setGroups(structuredClone(groupsToShow))
    // }
    dispatch(getGroups())

  }, [dispatch])

  const loadGroups = async () => {
    // const groupsToShow = await groupService.query()
    // console.log('loadGroups ~ groupsToShow', groupsToShow)
    // groupsToShow &&
    //   setGroups(structuredClone(groupsToShow))

    // dispatch(getGroups())
  }

  // const onUpdateGroup = async (groupId, updatedProduct) => {
  //   await groupService.updateGroup(groupId, updatedProduct)
  //   loadGroups()
  // }
  const onUpdateGroup = async (groupId, updatedProduct, prodToRemoveId) => {
    dispatch(updateGroup({ groupId, updatedProduct, prodToRemoveId }))
  }

  const onRemoveGroup = async (groupId) => {
    // await groupService.deleteGroup(groupId)
    dispatch(removeGroup(groupId))
  }

const onAddGroup = async (group) => {
  dispatch(addGroup(group))
}

  const onRemoveProd = (groupId, prodId) => {
    console.log('onRemoveProd ~ groupId', groupId)
    dispatch(removeProdFromGroup({ groupId, prodId }))
    // loadGroups()
  }




  return (
    <section className="shop-app main-container">
      <AddGroupFilter addGroup={onAddGroup}/>
      <GroupList groups={groups} onUpdateGroup={onUpdateGroup} onRemoveProd={onRemoveProd} onDeleteGroup={onRemoveGroup} />
    </section>
  )
}
