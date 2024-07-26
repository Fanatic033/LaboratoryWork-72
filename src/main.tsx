import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store.ts';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ToastContainer position="bottom-right"/>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);
