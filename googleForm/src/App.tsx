import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useAppDispatch} from "./store/config";
import {UserService} from "./services/userService";
import Counter from "./screens/Counter";
import Todo from "./screens/Todo";
import Form from "./pages/Froms/form";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import { deepPurple } from '@mui/material/colors';

const theme = createTheme({
  typography : {
    allVariants : {
      fontSize: 14,
    }
  },
  palette: {
    primary: {
      main: deepPurple[500],
    },
    secondary: {
      main: deepPurple[100],
    },
  }
});
function App() {
  const dispatch = useAppDispatch();
  const getUser = async () =>{
    dispatch(UserService.getUser(
        '1'
    ))
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className={"wrap"}>
          <Form />
          {/*<Counter />*/}
          {/*<hr />*/}
          {/*<Todo />*/}
          {/*<p />*/}
          {/*<button onClick={getUser}>[API TEST(GET)]</button>*/}
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
