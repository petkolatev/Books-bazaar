import { Routes } from '@angular/router'
import { LoginComponent } from './user/login/login.component'
import { RegisterComponent } from './user/register/register.component'
import { PageNotFoundComponent } from './error/error.component'
import { MainComponent } from './main/main.component'
import { UserProfileComponent } from './user/user-profile/user-profile.component'
import { WelcomePageComponent } from './welcome-page/welcome-page.component'
import { SearchComponent } from './search/search.component'
import { SingleBookComponent } from './books/single-book/single-book.component'
import { ErrorMsgComponent } from './core/error-msg/error-msg.component'
import { CreateComponent } from './books/create/create.component'
import { AuthGuard } from './guards/auth.guard'


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: WelcomePageComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'catalog', children: [
            { path: '', component: MainComponent },
            { path: ':bookId', component: SingleBookComponent }
        ]
    },
    { 
        path: 'search', children: [ 
            { path: '', component: SearchComponent },
            { path: ':bookId', redirectTo: "/catalog/:bookId" }
        ]},
    { path: 'create', component: CreateComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'error', component: ErrorMsgComponent },
    { path: '404', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/404' }
];
