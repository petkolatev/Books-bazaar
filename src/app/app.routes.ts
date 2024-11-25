import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ErrorComponent } from './error/error.component';
import { MainComponent } from './main/main.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
    { path: 'home', component: WelcomePageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'catalog', component: MainComponent },
    {path:'search',component:SearchComponent},
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: UserProfileComponent },
    { path: '404', component: ErrorComponent },
    { path: '**', redirectTo: '/404' }
];
