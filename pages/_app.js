import '../styles/globals.css';
import Store from '../src/redux/Store';
import { Provider } from 'react-redux';
import { ModalProvider } from '../src/contextApi/modalContext';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={Store}>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </Provider>
  );
}

export default MyApp;
