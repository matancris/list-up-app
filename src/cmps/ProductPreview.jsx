import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineDelete } from 'react-icons/md';
import { RiEditLine } from 'react-icons/ri';


export function ProductPreview({ product, onUpdateProd, onDeleteProd }) {

    const [updatedProd, setUpdatedProduct] = useState(product)
    const [isEditMode, setIsEditMode] = useState(false)

    const titleRef = useRef()
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        onUpdateProd(updatedProd)
    }, [updatedProd])

    useEffect(() => {
        isEditMode && titleRef.current.focus()
    }, [isEditMode])


    const handleChange = ({ target }) => {
        const { type, name, value } = target
        setUpdatedProduct({ ...product, [name]: type !== 'checkbox' ? value : target.checked })
    }

    const onEdit = (ev) => {
        ev.preventDefault()
        setIsEditMode(!isEditMode)
    }

    return (
        <section className={`product-preview flex space-between align-center ${product.isDone ? 'done' : ''}`}>
            <label className='flex align-center' htmlFor={`check-${product.id}`}>
                <input type="checkbox" name="isDone" id={`check-${product.id}`} onChange={handleChange} checked={updatedProd.isDone} />
                {!isEditMode &&
                    <h2>{product.title}</h2>}
                {isEditMode &&
                    <input
                        type="text"
                        name="title"
                        ref={titleRef}
                        onBlur={onEdit}
                        onChange={handleChange}
                        value={updatedProd.title}
                    />}
            </label>
            <div className="action-btn-container flex">
                <button onMouseDown={onEdit}><RiEditLine /></button>
                <button onClick={() => onDeleteProd(product.id)}><MdOutlineDelete /></button>
            </div>
        </section>
    )
}
