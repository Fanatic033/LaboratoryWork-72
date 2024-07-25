import './App.css';
import {Route, Routes} from 'react-router-dom';
import AdminPanelPage from './pages/AdminPanelPage/AdminPanelPage.tsx';

const App = () => (
  <>
    <Routes>
      <Route path="/admin/*" element={<AdminPanelPage/>}/>
    </Routes>
  </>
);

export default App;
