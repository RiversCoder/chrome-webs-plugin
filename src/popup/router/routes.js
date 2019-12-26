import PageIndex from './pages/Index'
import switchPage from './pages/switchPage'

export default [
  {
    path: '/',
    component: PageIndex,
    // redirect: '/switchPage'
  },
  {
    path: '/switchPage',
    component: switchPage
  }
]
