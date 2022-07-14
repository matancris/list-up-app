import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppHeader } from './cmps/AppHeader';
import ShopApp from './pages/ShopApp';
import { userService } from './services/user-service';


function App() {
  const [isHebrew, setIsHebrew] = useState(false)

  useEffect(() => {
    const userPref = userService.getUserPref()
    setIsHebrew(userPref.lang === 'Hebrew')
  }, [isHebrew])

  const changeLang = ({ target }) => {
    setIsHebrew(target.value === 'Hebrew')
    userService.setUserPref({ lang: target.value })
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
