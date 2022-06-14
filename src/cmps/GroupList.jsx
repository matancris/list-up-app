import React from 'react'
import { GroupPreview } from './GroupPreview'

export function GroupList({ groups, onUpdateGroup, onRemoveProd }) {
    return (
        <section>
            {
                groups.map(group => (
                    <GroupPreview group={group} key={group.id} onUpdateGroup={onUpdateGroup} onRemoveProd={onRemoveProd}/>
                ))
            }
        </section>
    )
}
