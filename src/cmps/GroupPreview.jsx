import React, { useState } from 'react'
import { ProductPreview } from './ProductPreview'
import { Draggable } from 'react-beautiful-dnd';

// Icons import
import { MdOutlineDelete } from 'react-icons/md';
import { IoAddOutline, IoDuplicateOutline } from 'react-icons/io5';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { RiCheckboxIndeterminateLine } from 'react-icons/ri';

export function GroupPreview({ group, onUpdateGroup, onDeleteGroup, onDuplicateGroup, idx }) {
    const [newProd, setNewProd] = useState({ title: '' })
    const [isOpen, setIsOpen] = useState(false)
    const [isMenuOpen, setIsMenueOpen] = useState(false)

    const onUpdateProd = (updatedProduct) => {
        onUpdateGroup(group.id, updatedProduct)
    }

    const onDeleteProd = (prodId) => {
        onUpdateGroup(group.id, null, prodId)
    }

    const handleInput = ({ target }) => {
        const { name, value } = target
        setNewProd({
            ...newProd,
            [name]: value
        })
    }

    const onAddProd = (ev) => {
        ev.preventDefault()
        onUpdateGroup(group.id, newProd)
        setNewProd({ title: '' })
    }

    const onUnmarkAll = () => {
        onUpdateGroup(group.id)
        setNewProd({ title: '' })
    }

    const openCloseMenu = () => {
        setIsMenueOpen(true)
        setTimeout(() => setIsMenueOpen(false), 3000)
    }

    return (
        <Draggable draggableId={group.id} index={idx}>
            {(provided, snapshot) => (
                <section
                    className="group-preview"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className={`group-header flex ${!isOpen ? 'm-0' : ''}`}  >
                        <h1 onClick={() => setIsOpen(!isOpen)} title="Open\Close list">{group.title}</h1>
                        <div className="action-btn-container flex">
                            {isMenuOpen &&
                                <div className="action-btn-menu flex">
                                    <button onClick={() => onDuplicateGroup(group, true)} title="Duplicate"><IoDuplicateOutline /></button>
                                    <button onClick={() => onUnmarkAll(group.id)} title="Unmark all"><RiCheckboxIndeterminateLine /></button>
                                    <button onClick={() => onDeleteGroup(group.id)} title="Delete"><MdOutlineDelete /></button>
                                </div>
                            }
                            {!isMenuOpen &&
                                <button className="dots-menu-btn" onClick={() => openCloseMenu()}><BiDotsHorizontalRounded /></button>
                            }
                        </div>
                    </div>
                    <article className={`prod-prev-container flex column ${isOpen ? 'open' : ''}`}>
                        {
                            group.products.map((product) => (
                                <ProductPreview
                                    product={product}
                                    key={product.id}
                                    onUpdateProd={onUpdateProd}
                                    onDeleteProd={onDeleteProd} />
                            ))
                        }
                    </article>
                    {isOpen && <form className="add-prod-form flex" onSubmit={onAddProd}>
                        <input type="text" name="title" id="" onChange={handleInput} value={newProd.title} />
                        <button className='add-btn'><IoAddOutline /></button>
                    </form>}
                </section>
            )}
        </Draggable>
    )
}
