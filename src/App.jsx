import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { AppHeader } from './cmps/AppHeader';
import ShopApp from './pages/ShopApp';
import { setUserPref } from './store/userSlice';


function App() {
  const [isHebrew, setIsHebrew] = useState(false)
  const dispatch = useDispatch()
  const { userPref } = useSelector(state => state.users)

  useEffect(() => {
    setIsHebrew(userPref.lang === 'Hebrew')
  }, [userPref])

  const changeLang = ({ target }) => {
    dispatch(setUserPref({ lang: target.value }))
    setIsHebrew(userPref.lang === 'Hebrew')
  }


  return (
    <div className={`App ${isHebrew ? 'rtl' : ''}`}>
      <AppHeader className="App-header " changeLang={changeLang} isHebrew={isHebrew}>
        Header
      </AppHeader>
      <Routes>
        <Route path="/" element={<ShopApp />} />
      </Routes>

    </div>
  );
}

export default App;
