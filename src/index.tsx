import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from '@app/App';
import store from '@app/store';

import GlobalStyles from './global-styles';

render(
  <>
    <GlobalStyles />
    <Provider store={store}>
      <App />
    </Provider>
  </>,
  document.getElementById('root'),
);
