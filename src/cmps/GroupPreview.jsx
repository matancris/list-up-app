import React, { useState } from 'react'
import { ProductPreview } from './ProductPreview'

export function GroupPreview({ group, onUpdateGroup, onRemoveProd }) {
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
            <h1 onClick={() => setIsOpen(!isOpen) } title="Open\Close list">{group.title}</h1>
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
            <form className="add-prod-form" onSubmit={onAddProd}>
                <input type="text" name="title" id="" onChange={handleInput} value={newProd.title} />
                <button className='add-btn'>add</button>
            </form>
        </section>
    )
}
