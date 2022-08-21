import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guard';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./view/registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./view/chat/chat.module').then((m) => m.ChatModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'profile',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
