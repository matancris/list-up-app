import React, { useState } from 'react'
import { ProductPreview } from './ProductPreview'

// Icons import
import { MdOutlineDelete } from 'react-icons/md';
import { IoAddOutline } from 'react-icons/io5';

export function GroupPreview({ group, onUpdateGroup, onRemoveProd, onDeleteGroup }) {
    const [newProd, setNewProd] = useState({ title: '' })
    const [isOpen, setIsOpen] = useState(true)

    const onUpdateProd = (updatedProduct) => {
        onUpdateGroup(group.id, updatedProduct)
    }
    const onDeleteProd = (prodId) => {
        onRemoveProd(group.id, prodId)
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

    return (
        <section className="group-preview">
            <div className={`group-header flex ${!isOpen ? 'm-0' : ''}`}  >
                <h1  onClick={() => setIsOpen(!isOpen)} title="Open\Close list">{group.title}</h1>
                <div className="action-btn-container flex">
                    {/* <button onMouseDown={onEdit}>Edit</button> */}
                    <button onClick={() => onDeleteGroup(group.id)}><MdOutlineDelete/></button>
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
                <button className='add-btn'><IoAddOutline/></button>
            </form>}
        </section>
    )
}
