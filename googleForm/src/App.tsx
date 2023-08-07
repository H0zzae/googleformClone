import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useAppDispatch} from "./store/config";
import {UserService} from "./services/userService";
import Counter from "./screens/Counter";
import Todo from "./screens/Todo";
import Form from "./pages/Froms/form";
function App() {
  const dispatch = useAppDispatch();
  const getUser = async () =>{
    dispatch(UserService.getUser(
        '1'
    ))
  }
  return (
  <>
    <Form />
    {/*<Counter />*/}
    {/*<hr />*/}
    {/*<Todo />*/}
    {/*<p />*/}
    {/*<button onClick={getUser}>[API TEST(GET)]</button>*/}
  </>
  );
}

export default App;
