import './App.css';
import {Route, Routes} from 'react-router-dom';
import AdminPanelPage from './pages/AdminPanelPage/AdminPanelPage';
import DishesForm from './components/DishesForm/DishesForm.tsx';
import AdminDishes from './pages/AdminPanelPage/AdminDishes.tsx';
import Layout from './components/Layout/Layout.tsx';

const App = () => (
  <>
    <Routes>
      <Route path={'/admin'} element={<Layout/>}>
      <Route path="/admin" element={<AdminPanelPage/>}/>
      <Route path={"/admin/add-dish"} element={<DishesForm/>}/>
      <Route path="/admin/dishes" element={<AdminDishes/>}/>
      <Route path={'*'} element={<h1>Not Found</h1>}/>
      </Route>
    </Routes>
  </>
);

export default App;
