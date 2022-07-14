import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import { userService } from '../services/user-service'

export function AppHeader({ changeLang, isHebrew }) {

    const [loggedinUser, setloggedInUser] = useState({})

    useEffect(() => {
        const user = userService.getUser()
        setloggedInUser(user)
        console.log('user', user);
    }, [])

    return (
        <section className="app-header full main-container">
            <div className="header-wrapper flex align-center space-between">
                <div className="logo"><img src={require("../assets/img/logo.jpg")} alt="logo" />List it up</div>
                <nav className="flex space-around">
                    {/* <Link to='/'>home</Link> */}
                </nav>
                <select onChange={changeLang} value={isHebrew ? 'Hebrew' : 'English'}>
                    <option>English</option>
                    <option>Hebrew</option>
                </select>
                {loggedinUser &&
                    <div className="user-title flex align-center" >
                        <img className='avatar' src={require(`../assets/img/${loggedinUser.imgUrl || 'avatar-placeholder.png'}`)} alt="" />
                    </div>}
            </div>
        </section>
    )
}
