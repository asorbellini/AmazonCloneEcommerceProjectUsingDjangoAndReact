
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Layout from './layout/layout.jsx'
import Auth from './pages/Auth.jsx'
import 'react-toastify/ReactToastify.css'
import ProtectedRoute from './utils/ProtectedRouter.jsx'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSidebar } from './redux/reducer/sidebardata.js'
import { useEffect } from 'react'
import DynamicForm from './pages/DynamicForm.jsx'
import ManageCategories from './pages/category/ManageCategories.jsx'
import 'react-toastify/dist/ReactToastify.css'
import "./style/style.css"

function App() {
  const {status} = useSelector(state=>state.sidebardata)
  const dispatch = useDispatch()

  /* const sidebarItems = [
    {name:"Home", link:"/home", icon:"Home", id:"home"},
    {name:"Products", link:"/products", icon:"Products", id:'products'},
    {name:"Categories", icon:"categories", children:[{name:"All Categories", link:"/categories", id:'allCategories'},{name:"Add Categories", link:"/categories/add",  id:'addCategories'}]},
    {name:"Orders", link:"/orders", icon:"Orders", id:'orders'},
    {name:"Users", link:"/users", icon:"Users", id:'users'},
    {name:"Settings", link:"/settings", icon:"Settings", id:'settings'},
  ] */
  
  useEffect(() => {
      if (status == 'idle'){
        dispatch(fetchSidebar())
      }      
  }, [status, dispatch])

  const router = createBrowserRouter(
    [
      {path:"/auth", element:<Auth/>},
      {
        path:"/", 
        element: <Layout/>,
        children: [
          {path:"/", element:<ProtectedRoute element={<Home />} />},
          {path:"/form/:formName", element:<ProtectedRoute element={<DynamicForm />} />},
          {path:"/manage/category", element:<ProtectedRoute element={<ManageCategories/>}/>},
        ]}
    ]
  ) 

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="bottom-right" theme='colored' autoclose={3000} hideProgressBar={false} style={{ marginBottom: '30px' }} />
    </>
  )
}

export default App
