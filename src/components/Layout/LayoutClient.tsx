import HeaderClient from '../Header/HeaderClient.tsx';
import {Outlet} from 'react-router-dom';

const LayoutClient = () => {
  return (
    <>
  <HeaderClient/>
      <Outlet/>
    </>
  );
};

export default LayoutClient;