import React, { useEffect, useState } from 'react'
import { GroupList } from '../cmps/GroupList'
import { groupService } from '../services/group-service'
// import { groupServiceAWS } from '../services/group-service-aws'

export default function ShopApp() {
  let [groups, setGroups] = useState([])

  useEffect(() => {
    console.log('before fatch') // TODO: spelling : fetch
    // async function getGroups() {
    //   const groupsToShow = await groupService.query()
    //   setGroups(structuredClone(groupsToShow))
    // }
    loadGroups()
  }, [])

  const loadGroups = async () => {
    const groupsToShow = await groupService.query()
    console.log('loadGroups ~ groupsToShow', groupsToShow)
    groupsToShow &&
      setGroups(structuredClone(groupsToShow))
  }

  const onUpdateGroup = async (groupId, updatedProduct) => {
    await groupService.updateGroup(groupId, updatedProduct)
    loadGroups()
  }

  const onRemoveProd = (groupId, prodId) => {
    groupService.removeProdFromGroup(groupId, prodId)
    loadGroups()
  }

  const onDeleteGroup = async (groupId) => {
    await groupService.deleteGroup(groupId)
    loadGroups()
  }


  return (
    <section className="shop-app main-container">
      <GroupList groups={groups} onUpdateGroup={onUpdateGroup} onRemoveProd={onRemoveProd} onDeleteGroup={onDeleteGroup} />
    </section>
  )
}
