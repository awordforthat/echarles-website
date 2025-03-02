import { NextPage } from 'next';
import { Crossword } from './crossword';
import { store } from './store';
import { Provider } from 'react-redux';

const Crosswords: NextPage = () => {
  return (
    <Provider store={store}>
      <div style={{ width: '100vw', height: '100vh' }}>
        <Crossword />
      </div>
    </Provider>
  );
};

export default Crosswords;
