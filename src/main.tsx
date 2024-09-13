/*
 * @Author: 何欣 hexing@qq.com
 * @Date: 2024-09-12 15:46:38
 * @LastEditors: 何欣 hexing@qq.com
 * @LastEditTime: 2024-09-12 15:58:12
 * @FilePath: /nest学习/book-management-system-frontend/src/main.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import ReactDOM  from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { BookManage } from './pages/BookManage'



const routes = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/book-manage',
    element: <BookManage />
  },
  {
    path: '*',
    element: <div>404</div>
  },
  
]
const router = createBrowserRouter(routes)
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <RouterProvider router={router} />

)
