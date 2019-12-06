import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './user/home/home.component';
import { AppComponent } from './app.component';
import { LoginGuard } from 'src/shared/services/util/login.guard';
import { DashboardComponent } from './student/dashboard/dashboard.component';
import { MenuComponent } from './user/menu/menu.component';
import { ClassComponent } from './teacher/class/class.component';
import { CreateQuizComponent } from './teacher/activity-teacher/create-quiz/create-quiz.component';
import { ParticipantsActiveComponent } from './kahoot-play/participants-active/participants-active.component';
import { ActivitiesListComponent } from './student/activities-list/activities-list.component';
import { AlternativeTeacherComponent } from './kahoot-play/alternative-teacher/alternative-teacher.component';
import { AlternativeStudentComponent } from './kahoot-play/alternative-student/alternative-student.component';
import { SchoolComponent } from './maintenance/school/school.component';
import { PersonalSchoolComponent } from './maintenance/personal-school/personal-school.component';
import { MakeClassComponent } from './class/make-class/make-class.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'app', component: AppComponent, canActivate:[LoginGuard] },
  { path: 'participants', component : ParticipantsActiveComponent, canActivate:[LoginGuard]},
  { path: 'teacher-active', component : AlternativeTeacherComponent, canActivate:[LoginGuard]},
  { path: 'student-active', component : AlternativeStudentComponent, canActivate:[LoginGuard]},
  { path: 'menu', component: MenuComponent, canActivate:[LoginGuard], children: [
    {path: '', redirectTo: '/menu/(menulateral:dashboard)', pathMatch: 'full'},
    { path: 'home', component: HomeComponent, outlet: 'menulateral' , canActivate:[LoginGuard] },
    { path: 'dashboard', component: DashboardComponent, outlet: 'menulateral', canActivate:[LoginGuard] },
    { path: 'class', component: ClassComponent, outlet: 'menulateral', canActivate:[LoginGuard] },
    { path: 'create-quiz', component: CreateQuizComponent, outlet: 'menulateral', canActivate:[LoginGuard] },
    { path: 'activity-list', component: ActivitiesListComponent, outlet: 'menulateral', canActivate:[LoginGuard] },
    { path: 'school', component: SchoolComponent, outlet: 'menulateral', canActivate:[LoginGuard] },
    { path: 'personal-school', component: PersonalSchoolComponent, outlet: 'menulateral', canActivate:[LoginGuard] },
    { path: 'make-class', component: MakeClassComponent, outlet: 'menulateral', canActivate:[LoginGuard] }
  ]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes,{ useHash: true }) ],
  exports: [ RouterModule],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppRoutingModule { } 
export const routingComponents = [MenuComponent,
                                  HomeComponent,
                                  LoginComponent,
                                  DashboardComponent,
                                  ClassComponent,
                                  CreateQuizComponent,
                                  ActivitiesListComponent,
                                  PersonalSchoolComponent] 