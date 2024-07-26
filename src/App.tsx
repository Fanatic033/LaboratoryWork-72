import './App.css';
import {Route, Routes} from 'react-router-dom';
import AdminPanelPage from './pages/AdminPanelPage/AdminPanelPage';
import DishesForm from './components/DishesForm/DishesForm.tsx';

const App = () => (
  <>

    <Routes>
      <Route path="/admin/*" element={<AdminPanelPage/>}/>
      <Route path={"add-dish"} element={<DishesForm/>}/>
      <Route path={'*'} element={<h1>Not Found</h1>}/>
    </Routes>
  </>
);

export default App;
