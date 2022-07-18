import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { IoAddOutline } from 'react-icons/io5'
import UILine from './UICmps/UILine'

export function AddGroupFilter({ addGroup }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [newGroup, setNewGroup] = useState({ title: '' })
    const { userPref } = useSelector(state => state.users)

    const inputRef = useRef()

    useEffect(() => {
        isModalOpen && inputRef.current.focus()
    }, [isModalOpen])


    const onAddGroup = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        if (!newGroup.title.trim()) return
        addGroup(newGroup)
        closeForm(ev)
    }

    const handleInput = ({ target }) => {
        const { name, value } = target
        setNewGroup({ ...newGroup, [name]: value })
    }

    const closeForm = (ev) => {
        if (ev.relatedTarget?.className === 'submit-btn') return
        ev.stopPropagation()
        setIsModalOpen(false)
        setNewGroup({ title: '' })
    }

    const { lang } = userPref
    return (
        <section className="add-group-filter">
            <button className="add-group-btn" onClick={() => setIsModalOpen(!isModalOpen)}><IoAddOutline />&nbsp;{lang === 'English' ? 'New List': 'רשימה חדשה'}</button>
            {isModalOpen &&
                <div className="screen screen-open">
                    <article className="add-group-modal">
                        <form className="add-group-form flex column space-between" onSubmit={onAddGroup}>
                            <h2 className="add-form-title">{lang === 'English' ? 'Add list': 'הוסף רשימה'}</h2>
                            <input type="text" name="title" placeholder={lang === 'English' ? 'List name': 'שם הרשימה'} onChange={handleInput} value={newGroup.title} ref={inputRef} onBlur={(ev) => closeForm(ev)} />
                            {/* <input type="text" name="title" placeholder="List name" onChange={handleInput} value={newGroup.title} ref={inputRef} /> */}
                            <div className="UI-wrapper">
                                <UILine />
                                <div className="btn-container flex">
                                    <button type="button" className="cancel-btn" onClick={closeForm}>{lang === 'English' ? 'Cancel': 'ביטול'}</button>
                                    <button type="submit" className="submit-btn">{lang === 'English' ? 'Save': 'שמור'}</button>
                                </div>
                            </div>
                        </form>
                    </article>
                </div>
            }
        </section>
    )
}
