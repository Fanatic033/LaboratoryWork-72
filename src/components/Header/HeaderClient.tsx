import {Outlet} from 'react-router-dom';

const HeaderClient = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div>
            <a className="navbar-brand">Turtle Pizza</a>
          </div>
        </div>
      </nav>
      <Outlet/>
    </>
  );
};

export default HeaderClient;