import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { PageNotFoundcomponent } from './error/error.component';
import { MainComponent } from './main/main.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SearchComponent } from './search/search.component';
import { CatalogComponent } from './books/catalog/catalog.component';
import { SingleBookComponent } from './books/single-book/single-book.component';
import { ErrorMsgComponent } from './core/error-msg/error-msg.component';
import { CreateComponent } from './books/create/create.component';


export const routes: Routes = [
    { path: '', component: WelcomePageComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'catalog', children: [
            { path: '', component: MainComponent },
            { path: ':bookId', component: SingleBookComponent }
        ]
    },
    { path: 'search', component: SearchComponent },
    { path: 'create', component: CreateComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: UserProfileComponent },
    { path: 'error', component: ErrorMsgComponent },
    { path: '404', component: PageNotFoundcomponent },
    { path: '**', redirectTo: '/404' }
];
