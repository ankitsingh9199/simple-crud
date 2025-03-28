import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import User from './components/getusers/User';
import Add from './components/addusers/Add';
import Edit from './components/updateusers/Edit';
import ErrorPage from './components/ErrorPage'; 

function App() {

  const route = createBrowserRouter([
    {
      path: '/',
      element: <User/>,
      errorElement: <ErrorPage /> 

    },
    {
      path: '/add',
      element: <Add/>,
      errorElement: <ErrorPage /> 

    },
    {
      path: '/edit/:id',
      element:<Edit/>,
      errorElement: <ErrorPage /> 

    },
    {
      path: '/delete',
      element:"delete page",

    },
    {
      path: '*',  //  Catch-all route for undefined paths
      element: <ErrorPage />
    }
   
  ])

  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
