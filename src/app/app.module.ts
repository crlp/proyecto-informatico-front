import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule}   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatExpansionModule, MatInputModule, MatIconModule, 
  MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatFormFieldModule, MatCardModule, MatAutocompleteModule, MatListModule, MAT_DIALOG_DATA, MatDialogRef, MatTableModule, MatSelectModule, MatRadioModule, MatCheckboxModule, MatSelect } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule }  from 'ngx-spinner';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { UsuarioService } from 'src/services/usuario.service';
import { ActivityService } from 'src/services/activity.service';
import { LoginGuard } from 'src/services/util/login.guard';
import { NoLoginGuard } from 'src/services/util/no-login.guard';
import { ClassComponent } from './teacher/class/class.component';
import { platformBrowserDynamic } from'@angular/platform-browser-dynamic';
import { CreateQuizComponent } from './teacher/activity-teacher/create-quiz/create-quiz.component';
import { ModalConfirmationComponent } from './modal/activity/modal-confirmation/modal-confirmation.component';
import { NgbModalModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TopicService } from 'src/services/topic.service';
import { SearchTopicComponent } from './topic/search-topic/search-topic.component';
import { QuestionOfTopicComponent } from './teacher/activity-teacher/question-of-topic/question-of-topic.component';
import { AnswerOfQuestionTeacherComponent } from './teacher/activity-teacher/answer-of-question-teacher/answer-of-question-teacher.component';
import { ModalActivityDetailComponent } from './modal/activity/modal-activity-detail/modal-activity-detail.component';
import { OwnActivitiesByTopicComponent } from './modal/activity/own-activities-by-topic/own-activities-by-topic.component';
import { ParticipantsActiveComponent } from './kahoot-play/participants-active/participants-active.component';
import { AlternativeStudentComponent } from './kahoot-play/alternative-student/alternative-student.component';
import { AlternativeTeacherComponent } from './kahoot-play/alternative-teacher/alternative-teacher.component';

//firebase
import { AngularFireModule} from 'angularfire2'
import { AngularFireDatabaseModule} from 'angularfire2/database'
import { environment} from '../environments/environment';
import { ActivitiesListComponent } from './student/activities-list/activities-list.component';
import { ResultQuestionModalComponent } from './kahoot-play/result-question-modal/result-question-modal.component';
import { UploadPictureComponent } from './user/upload-picture/upload-picture.component';
import { SchoolComponent } from './maintenance/school/school.component'
import { ListSchoolComponent } from './modal/school/list-school/list-school.component';
import { PersonalSchoolComponent } from './maintenance/personal-school/personal-school.component';
import { SearchSchoolComponent } from './school/search-school/search-school.component';
import { SchoolService } from 'src/services/school.service';
import { ImportStudentComponent } from './school/import-student/import-student.component';
import { AssignRoomsComponent } from './school/assign-rooms/assign-rooms.component';
import { RbtStudentTeacherComponent } from './school/rbt-student-teacher/rbt-student-teacher.component';
import { SearchTeacherComponent } from './school/search-teacher/search-teacher.component';
import { MultichckRoomsComponent } from './school/multichck-rooms/multichck-rooms.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DetailSectionClassComponent } from './teacher/class/detail-section-class/detail-section-class.component';
import { ModalSeeUsersComponent } from './school/modal-see-users/modal-see-users.component'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    routingComponents,
    ClassComponent,
    ModalConfirmationComponent,
    CreateQuizComponent,
    SearchTopicComponent,
    QuestionOfTopicComponent,
    AnswerOfQuestionTeacherComponent,
    ModalActivityDetailComponent,
    OwnActivitiesByTopicComponent,
    ParticipantsActiveComponent,
    AlternativeStudentComponent,
    AlternativeTeacherComponent,
    ActivitiesListComponent,
    ResultQuestionModalComponent,
    UploadPictureComponent,
    SchoolComponent,
    ListSchoolComponent,
    PersonalSchoolComponent,
    SearchSchoolComponent,
    ImportStudentComponent,
    AssignRoomsComponent,
    RbtStudentTeacherComponent,
    SearchTeacherComponent,
    MultichckRoomsComponent,
    DetailSectionClassComponent,
    ModalSeeUsersComponent,
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
    NgxSpinnerModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatExpansionModule, 
    MatInputModule,
    MatIconModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule,
    NgbModalModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatCardModule,
    MatListModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    MatTableModule,
    MatRadioModule,
    MatCheckboxModule,
    CKEditorModule
    
  ],
  providers: [UsuarioService, SchoolService, ActivityService, LoginGuard,NoLoginGuard , NgbActiveModal, TopicService, CreateQuizComponent, NgxSpinnerModule, { provide: MAT_DIALOG_DATA, useValue: {} },  { provide: MatDialogRef, useValue: {} }],
  bootstrap: [AppComponent],
  entryComponents: [ModalConfirmationComponent, ModalActivityDetailComponent, OwnActivitiesByTopicComponent, ResultQuestionModalComponent, ListSchoolComponent, DetailSectionClassComponent, ModalSeeUsersComponent]
  
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
