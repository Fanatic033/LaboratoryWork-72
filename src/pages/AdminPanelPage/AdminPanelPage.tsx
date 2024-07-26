import {Link} from 'react-router-dom';

const AdminPanelPage = () => {
  return (
    <>
      <h1 className={'text-center mt-5'}>Page For Administrator</h1>
      <Link to={'/admin/add-dish'}>
        <button type={'button'}>Add new Dish</button>
      </Link>
    </>
  );
};

export default AdminPanelPage;