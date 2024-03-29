import React from 'react'
import { GroupPreview } from './GroupPreview'
import { Droppable } from 'react-beautiful-dnd';

export function GroupList({ groups, onUpdateGroup, onDeleteGroup, onDuplicateGroup }) {
    return (
        <Droppable droppableId="droppable-1">
            {(provided, snapshot) => (
                <section
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {
                        groups.map((group, idx) => (
                            <GroupPreview 
                            group={group} 
                            key={group.id} 
                            idx={idx} 
                            onUpdateGroup={onUpdateGroup} 
                            onDeleteGroup={onDeleteGroup} 
                            onDuplicateGroup={onDuplicateGroup} />
                        ))
                    }
                    {provided.placeholder}
                </section>
            )}
        </Droppable>
    )
}
