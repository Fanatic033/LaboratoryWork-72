import Header from '../../components/Header/Header';
import {Link, Route, Routes} from 'react-router-dom';
import DishesForm from '../../components/DishesForm/DishesForm.tsx';

const AdminPanelPage = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/admin/dishes" element={<AdminPanelPage/>}/>
        <Route path="/admin/orders" element={<DishesForm/>}/>
      </Routes>
      <Link to={'/add-dish'}>
        <button type={'button'}>Add new Dish</button>
      </Link>
    </>
  );
};

export default AdminPanelPage;