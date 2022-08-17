import React, { useEffect, useRef, useState } from 'react'
import { ProductPreview } from './ProductPreview'
import { Draggable } from 'react-beautiful-dnd';

// Icons import
import { MdOutlineDelete } from 'react-icons/md';
import { IoAddOutline, IoDuplicateOutline } from 'react-icons/io5';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { FiCheck } from 'react-icons/fi';
import { RiCheckboxIndeterminateLine, RiEditLine } from 'react-icons/ri';

export function GroupPreview({ group, onUpdateGroup, onDeleteGroup, onDuplicateGroup, idx }) {

    const [updatedGroup, setUpdatedGroup] = useState({ ...group })
    const [newProd, setNewProd] = useState({ title: '' })
    const [isOpen, setIsOpen] = useState(false)
    const [isMenuOpen, setIsMenueOpen] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)

    const titleRef = useRef()

    useEffect(() => {
        onUpdateGroup(updatedGroup)
        console.log(updatedGroup)
    }, [updatedGroup])

    const onUpdateProd = (updatedProduct) => {
        const products = updatedGroup.products.map(product => product.id === updatedProduct.id ? updatedProduct : product)
        setUpdatedGroup({ ...updatedGroup, products })
    }

    const onDeleteProd = (prodId) => {
        const products = updatedGroup.products.filter(product => product.id !== prodId)
        setUpdatedGroup({ ...updatedGroup, products })
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
        onUpdateGroup(updatedGroup, newProd)
        setNewProd({ title: '' })
    }

    const onUnmarkAll = () => {
        const products = updatedGroup.products.map(product => ({ ...product, isDone: false }))
        setUpdatedGroup({ ...updatedGroup, products })
    }

    const openCloseMenu = () => {
        setIsMenueOpen(true)
        setTimeout(() => setIsMenueOpen(false), 3000)
    }

    const onEdit = (ev) => {
        ev.preventDefault()
        setIsEditMode(!isEditMode)
    }

    const handleGroupTitleChange = ({ target }) => {
        const { name, value } = target
        setUpdatedGroup({ ...updatedGroup, [name]: value })
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
                        {!isEditMode &&
                            <h1 onClick={() => setIsOpen(!isOpen)} title="Open\Close list">{group.title}</h1>}
                        {isEditMode &&
                            <input
                                type="text"
                                name="title"
                                ref={titleRef}
                                onBlur={onEdit}
                                onChange={handleGroupTitleChange}
                                value={group.title}
                            />}
                        <div className="action-btn-container flex">
                            {isMenuOpen && !isEditMode &&
                                <div className="action-btn-menu flex">
                                    <button onClick={() => onDuplicateGroup(group, true)} title="Duplicate"><IoDuplicateOutline /></button>
                                    <button onClick={() => onUnmarkAll(group.id)} title="Unmark all"><RiCheckboxIndeterminateLine /></button>
                                    <button onClick={() => onDeleteGroup(group.id)} title="Delete"><MdOutlineDelete /></button>
                                    <button onMouseDown={onEdit}><RiEditLine /></button>
                                </div>
                            }
                            {!isMenuOpen && !isEditMode &&
                                <button className="dots-menu-btn" onClick={() => openCloseMenu()}><BiDotsHorizontalRounded /></button>
                            }
                            {isEditMode && <button onMouseDown={onEdit}><FiCheck /></button>}
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
