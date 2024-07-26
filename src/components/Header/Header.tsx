import {NavLink} from 'react-router-dom';

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div>
            <a className="navbar-brand" href="#">Turtle Pizza Admin</a>
          </div>
          <div>
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin/dishes">Dishes</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin/orders">Orders</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;