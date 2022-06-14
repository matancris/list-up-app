import React from 'react'
import { Link } from 'react-router-dom'

export function AppHeader() {
    return (
        <section className="app-header full main-container">
            <div className="header-wrapper flex align-center">
                <div className="logo"><img src={require("../assets/img/logo.jpg")} alt="logo" /></div>
                <nav className="flex space-around">
                    <Link to='/'>home</Link>
                </nav>
            </div>
        </section>
    )
}
