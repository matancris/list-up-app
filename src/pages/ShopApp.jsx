import React, { useEffect, useState } from 'react'
import { GroupList } from '../cmps/GroupList'
import { groupService } from '../services/group-service'

export default function ShopApp() {
  let [groups, setGroups] = useState([])

  useEffect(() => {
    // async function getGroups() {
    //   const groupsToShow = await groupService.query()
    //   setGroups(structuredClone(groupsToShow))
    // }
    loadGroups()
  }, [])

  const loadGroups = async () => {
    const groupsToShow = await groupService.query()
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


  return (
    <section className="shop-app main-container">
      <GroupList groups={groups} onUpdateGroup={onUpdateGroup} onRemoveProd={onRemoveProd} />
    </section>
  )
}
