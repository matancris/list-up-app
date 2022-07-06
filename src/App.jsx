import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppHeader } from './cmps/AppHeader';
import ShopApp from './pages/ShopApp';


function App() {
  const [isHebrew, setIsHebrew] = useState(false)

  useEffect(() => {
    console.log(isHebrew)
  }, [isHebrew])

  const changeLang = ({ target }) => {
    setIsHebrew(target.value === 'Hebrew')
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
