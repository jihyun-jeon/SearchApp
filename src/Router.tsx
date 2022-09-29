import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import store from './store/store';
import { Provider } from 'react-redux';

const Router = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/searchApp" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default Router;
