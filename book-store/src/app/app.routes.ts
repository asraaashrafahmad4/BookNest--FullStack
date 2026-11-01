import { Routes } from '@angular/router';
import { Search } from './pages/search/search';
import { Cart } from './pages/cart/cart';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Conect } from './pages/conect/conect'
import { Books } from './pages/books/books'
import { BooksDetails } from './pages/books-details/books-details';
import { Checkout } from './pages/checkout/checkout';
import { Order } from './pages/order/order';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { adminGuard } from './guards/admin.guard'

export const routes: Routes = [
  {
    path: "search",
    component: Search

  },
  {
    path: "admin-dashboard",
    component: AdminDashboard,
    canActivate: [adminGuard]

  },


  {
    path: "login",
    component: Login

  },
  {
    path: "register",
    component: Register

  },

  {
    path: "checkout",
    component: Checkout

  },
  {
    path: "order",
    component: Order

  },


  {
    path: "books-details/:id",
    component: BooksDetails

  },

  {
    path: 'cart',
    component: Cart
  },
  {
    path: '',
    component: Home
  },
  {
    path: 'about',
    component: About
  },
  {
    path: 'contact',
    component: Conect
  },
  {
    path: 'books',
    component: Books
  },

];
