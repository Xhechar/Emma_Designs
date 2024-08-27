import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/user/cart/cart.component';
import { UserComponent } from './components/user/user.component';
import { HomeeComponent } from './components/user/homee/homee.component';
import { OrdersComponent } from './components/user/orders/orders.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { ReviewsComponent } from './components/user/reviews/reviews.component';
import { SingleComponent } from './components/single/single.component';
import { AdminComponent } from './components/admin/admin.component';
import { ADashboardComponent } from './components/admin/a-dashboard/a-dashboard.component';
import { FlushComponent } from './components/admin/flush/flush.component';
import { OffersComponent } from './components/admin/offers/offers.component';
import { ProductsComponent } from './components/admin/products/products.component';
import { RecoverOrdersComponent } from './components/admin/recover-orders/recover-orders.component';
import { UsersComponent } from './components/admin/users/users.component';
import { RestoreComponent } from './components/admin/restore/restore.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AdminprofileComponent } from './components/admin/adminprofile/adminprofile.component';
import { AllordersComponent } from './components/admin/allorders/allorders.component';
import { AllreviewsComponent } from './components/admin/allreviews/allreviews.component';
import { PendingOrdersComponent } from './components/admin/pending-orders/pending-orders.component';
import { DeliveredOrdersComponent } from './components/admin/delivered-orders/delivered-orders.component';
import { CartegoriesComponent } from './components/admin/cartegories/cartegories.component';
import { UserreviewsComponent } from './components/admin/userreviews/userreviews.component';
import { NewproductComponent } from './components/newproduct/newproduct.component';

export const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'home', pathMatch: 'full', redirectTo: '' },
  {
    path: 'user', component: UserComponent, children: [
      { path: 'cart', component: CartComponent },
      { path: 'dashboard', component: HomeeComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'reviews', component: ReviewsComponent }, 
      { path: 'single-product/:product_id', component: SingleComponent}
    ]
  },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'a-dashboard', component: ADashboardComponent },
      { path: 'flush-products', component: FlushComponent },
      { path: 'offers-products', component: OffersComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'deleted-orders', component: RecoverOrdersComponent },
      { path: 'users', component: UsersComponent },
      { path: 'deleted-users', component: RestoreComponent },
      { path: 'user-reviews', component: UserreviewsComponent },
      { path: 'a-profile', component: AdminprofileComponent },
      { path: 'all-orders', component: AllordersComponent },
      { path: 'all-reviews', component: AllreviewsComponent },
      { path: 'pending-pending', component: PendingOrdersComponent },
      { path: 'deliverred-orders', component: DeliveredOrdersComponent },
      {path: 'cartegories', component: CartegoriesComponent}
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'new-product', component: NewproductComponent },
  { path: 'bubbles', component: MainComponent },
  { path: '**', component: NotfoundComponent }
];
