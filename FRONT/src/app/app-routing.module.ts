import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserService } from './_services/user/user.service';

import { LoggedAppComponent } from './logged-app.component';
import { LoginComponent } from './modules/login/login.component';
import { KanbanBoardComponent } from './modules/kanban-board/kanban-board.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LoggedAppComponent,
    canActivate: [UserService],
    children: [
      {
        path: '',
        redirectTo: '/kanban-board',
        pathMatch: 'full'
      },
      {
        path: 'kanban-board',
        component: KanbanBoardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
