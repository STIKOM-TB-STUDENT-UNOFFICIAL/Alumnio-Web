import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom'
import { getPagesRoute } from './libs/router/file-based-routing'
import "./style.css"
import SessionContext from './session-context.tsx'
import { Toaster } from 'sonner'

const files = import.meta.glob("./app/**/(page|layout).tsx")
const errorFiles = lazy(() => import("./error-files.tsx"))

const router = createBrowserRouter(getPagesRoute(files, errorFiles) as RouteObject[])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SessionContext>
      <Toaster position='top-center'/>
      <RouterProvider router={router} />
    </SessionContext>
  </StrictMode>,
)
