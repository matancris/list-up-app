import React from 'react'
import { GroupPreview } from './GroupPreview'

export function GroupList({ groups, onUpdateGroup, onDeleteGroup }) {
    return (
        <section>
            {
                groups.map(group => (
                    <GroupPreview group={group} key={group.id} onUpdateGroup={onUpdateGroup} onDeleteGroup={onDeleteGroup}/>
                ))
            }
        </section>
    )
}
