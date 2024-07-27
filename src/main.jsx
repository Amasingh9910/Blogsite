import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store/store.js'
import { Provider } from 'react-redux'
import Home from './pages/Home.jsx'
import {Login,Protected, Signup} from './components/index.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import AddPost from "./pages/AddPost";

import EditPost from "./pages/EditPost";

import Post from "./pages/Post.jsx";

import AllPost from "./pages/AllPost";


const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
       {
        path:'/',
        element:<Home/>
       },
       {
        path:"/login",
        element:(
          <Protected authentication={false}>
            <Login/>
          </Protected>
        ),
       },
       {
        path:'/signup',
        element:(
          <Protected authentication={false}>
            <Signup/>
          </Protected>
        ),
       },
       {
        path: "/all-post",
        element: (
            <Protected authentication>
                {" "}
                <AllPost />
            </Protected>
        ),
    },
    {
        path: "/add-post",
        element: (
            <Protected authentication>
                {" "}
                <AddPost />
            </Protected>
        ),
    },
    {
        path: "/edit-post/:slug",
        element: (
            <Protected authentication>
                {" "}
                <EditPost />
            </Protected>
        ),
    },
    {
        path: "/post/:slug",
        element: <Post />,
    },

    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(


  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
