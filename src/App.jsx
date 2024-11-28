import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';
import router from './routes/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary.jsx';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnHover
        />
        <ErrorBoundary>
          <RouterProvider router={router} future={{ v7_startTransition: true }} />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
