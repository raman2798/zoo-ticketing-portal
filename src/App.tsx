import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AppRoutes } from './router';
import { appStore } from './redux';
import { zooTheme } from './theme';

const App = () => {
  return (
    <Provider store={appStore}>
      <ThemeProvider theme={zooTheme}>
        <CssBaseline />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
