import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';
import { blankGuard } from './core/guards/blank/blank.guard';
import { adminGuard } from './core/guards/admin/admin.guard';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { 
                path: 'login', 
                loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
                title: 'Scooby | Login'
            },
            { 
                path: 'register', 
                loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
                title: 'Scooby | Sign Up'
            },
            {
                path: "forgot-password",
                loadComponent: () => import('./pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
                title: "Scooby | Forgot Password"
            }
        ]
    },
    {
        path: '',
        component: BlankLayoutComponent,
        canActivate: [blankGuard],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { 
                path: 'home',
                loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
                title: 'Scooby | Home'
            },
            { 
                path: 'about',
                loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
                title: 'Scooby | About Us'
            },
            { 
                path: 'services',
                loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent),
                title: 'Scooby | Services'
            },
            { 
                path: 'shop',
                loadComponent: () => import('./pages/shop/shop.component').then(m => m.ShopComponent),
                title: 'Scooby | Shop'
            },
            { 
                path: 'wishlist',
                loadComponent: () => import('./pages/wishlist/wishlist.component').then(m => m.WishlistComponent),
                title: 'Scooby | Wishlist'
            },
            { 
                path: 'cart',
                loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent),
                title: 'Scooby | Cart'
            },
            { 
                path: 'profile',
                loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
                title: 'Scooby | Profile'
            },
            { 
                path: 'serviceProfile/:id',
                loadComponent: () => import('./pages/service-profile/service-profile.component').then(m => m.ServiceProfileComponent),
                title: 'Scooby | Service details'
            },
            { 
                path: 'adoption',
                loadComponent: () => import('./pages/adoption/adoption.component').then(m => m.AdoptionComponent),
                title: 'Scooby | Adoption'
            },
            { 
                path: 'pets',
                loadComponent: () => import('./pages/pets/pets.component').then(m => m.PetsComponent),
                title: 'Scooby | Pets'
            },
            { 
                path: 'search',
                loadComponent: () => import('./pages/search/search.component').then(m => m.SearchComponent),
                title: 'Scooby | Search'
            },
            { 
                path: 'shelter/:id',
                loadComponent: () => import('./pages/shelter/shelter.component').then(m => m.ShelterComponent),
                title: 'Scooby | shelter'
            },
            { 
                path: 'vet',
                loadComponent: () => import('./pages/vet/vet.component').then(m => m.VetComponent),
                title: 'Scooby | Veterinary'
            },
            { 
                path: 'doctor/:id',
                loadComponent: () => import('./pages/doctor/doctor.component').then(m => m.DoctorComponent),
                title: 'Scooby | Doctor details'
            },
            { 
                path: 'community',
                loadComponent: () => import('./pages/community/community.component').then(m => m.CommunityComponent),
                title: 'Scooby | Community'
            },
            { 
                path: 'clinic/:id',
                loadComponent: () => import('./pages/clinic/clinic.component').then(m => m.ClinicComponent),
                title: 'Scooby | Clinic details'
            },
            { 
                path: 'blogs',
                loadComponent: () => import('./pages/blogs/blogs.component').then(m => m.BlogsComponent),
                title: 'Scooby | Blogs'
            },
            { 
                path: 'account/:id',
                loadComponent: () => import('./pages/account/account.component').then(m => m.AccountComponent),
                title: 'Scooby | Account'
            },
            { 
                path: 'checkout',
                loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent),
                title: 'Scooby | Checkout'
            }
        ]
    },
    {
        path: 'admin',
        component: AdminLayoutComponent,
        canActivate: [adminGuard],
        children: [
            { 
                path: 'dashboard',
                loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
                title: 'Scooby Admin | Dashboard'
            },
            { 
                path: 'blogs',
                loadComponent: () => import('./pages/admin-blogs/admin-blogs.component').then(m => m.AdminBlogsComponent),
                title: 'Scooby Admin | Manage Blogs'
            },
            { 
                path: 'services',
                loadComponent: () => import('./pages/admin-services/admin-services.component').then(m => m.AdminServicesComponent),
                title: 'Scooby Admin | Manage Services'
            },
            { 
                path: 'coupons',
                loadComponent: () => import('./pages/admin-coupons/admin-coupons.component').then(m => m.AdminCouponsComponent),
                title: 'Scooby Admin | Manage Coupons'
            },
            { 
                path: 'products',
                loadComponent: () => import('./pages/admin-products/admin-products.component').then(m => m.AdminProductsComponent),
                title: 'Scooby Admin | Manage Products'
            },
            { 
                path: 'doctors',
                loadComponent: () => import('./pages/admin-doctors/admin-doctors.component').then(m => m.AdminDoctorsComponent),
                title: 'Scooby Admin | Manage Doctors'
            },
            { 
                path: 'clinics',
                loadComponent: () => import('./pages/admin-clinic/admin-clinic.component').then(m => m.AdminClinicComponent),
                title: 'Scooby Admin | Manage Clinics'
            },
            { 
                path: 'orders',
                loadComponent: () => import('./pages/admin-orders/admin-orders.component').then(m => m.AdminOrdersComponent),
                title: 'Scooby Admin | Manage Orders'
            },
            { 
                path: 'users',
                loadComponent: () => import('./pages/admin-users/admin-users.component').then(m => m.AdminUsersComponent),
                title: 'Scooby Admin | Manage Users'
            }
        ]
    },
    {
        path: '**',
        loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
        title: "Not Found"
    }
];