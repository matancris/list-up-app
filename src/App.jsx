import { Route, Routes } from 'react-router-dom';
import { AppHeader } from './cmps/AppHeader';
import ShopApp from './pages/ShopApp';


function App() {
  return (
    <div className="App">
      <AppHeader className="App-header ">
        Header
      </AppHeader>
      <Routes>
        <Route path="/" element={<ShopApp />} />
      </Routes>

    </div>
  );
}

export default App;
