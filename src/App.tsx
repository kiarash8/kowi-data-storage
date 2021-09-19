import { useContext } from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router} from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Auth, Main } from './layouts';
import { Storage } from './storage';

const theme = createTheme();

function App() {
  const { state } = useContext(Storage.Context);
  const isAuthenticated = state.user.token === null ? false : true;

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
            <Route path="/auth" render={props => <Auth {...props} />}/>
            <Route path="/main" render={
                props => (
                    isAuthenticated === true
                    ? <Main {...props} />
                    : <Redirect to='/auth/login' />
                )
            }/>
            <Redirect from="/" to="/main/tasks"/>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
