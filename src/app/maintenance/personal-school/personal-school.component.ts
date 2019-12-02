import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { School } from 'src/modelo/school';
import { Parametro } from 'src/modelo/param';
import { UsuarioService } from 'src/services/usuario.service';
import { HttpResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Metodo } from 'src/app/util/metodo';
import { SchoolService } from 'src/services/school.service';
import { Usuario } from 'src/modelo/usuario';
import { MultichckRoomsComponent } from 'src/app/school/multichck-rooms/multichck-rooms.component';
import { TeacherClassrooms } from 'src/modelo/teacher-classrooms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ModalSeeUsersComponent } from 'src/app/school/modal-see-users/modal-see-users.component';

@Component({
  selector: 'app-personal-school',
  templateUrl: './personal-school.component.html',
  styleUrls: ['./personal-school.component.css']
})
export class PersonalSchoolComponent implements AfterViewInit{


  _schoolSelected : School = null
  _sectionGradeSelected : Parametro = new Parametro()
  _classroomStudentsLoaded : string = ''
  _codigoTeacherSelected : string = ''
  //flagMuestra: 0 = Student
  //             1 = Teacher
  //             2 = Classsrom
  _flagMuestra : number  = -1

  filteredOptions: Array<Usuario>;


  @ViewChild(MultichckRoomsComponent, {static: false}) multichckRoomsComponent

  
  constructor(private _usuarioService : UsuarioService, 
    private _schoolService: SchoolService,  private spinnerLoading : NgxSpinnerService,  private dialog: MatDialog) { }

  ngAfterViewInit(): void {
  }

  recepcionSchool(school : School){
    this._schoolSelected = school;
  }

  recepcionRooms (gradeSection : Parametro){
    this._sectionGradeSelected = gradeSection;
  }

  recepcionClassroom (classroomStudent : string){
    this._classroomStudentsLoaded = classroomStudent
  }

  recepcionVista (_flagMuestra : number){
    this._flagMuestra = _flagMuestra
  }

  recepcionSchoolDinamic(school : School){
    this._schoolSelected = school;
    this.obtenerTeacherBySchool();
  }

  verUsersImported(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    const dialogRef = this.dialog.open(ModalSeeUsersComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }

  obtenerTeacherBySchool() {

    this._schoolService.listaProfesorPorColegio(this._schoolSelected.codigo).subscribe(datos =>{
      if (datos instanceof HttpResponse) {
        this.filteredOptions = Metodo.JSON_TO_OBJECT(datos.body);
      }
    })
  } 

  recepcionTeacher(codigoTeacher : string){
    this._codigoTeacherSelected = codigoTeacher;
    this._schoolService.listaSalonesPorProfesor(codigoTeacher).subscribe(datos =>{
      if (datos instanceof HttpResponse) {
        let filteredOptionsSalones = Metodo.JSON_TO_OBJECT(datos.body);
        this.multichckRoomsComponent.marcarSalones(filteredOptionsSalones);
      }
    })
  }

  recepcionSalones(salonesFinales : Array<Parametro>){
    let listTeacherClassrooms = new Array<TeacherClassrooms>()

    salonesFinales.forEach(element => {
      let profesorAula = new TeacherClassrooms();

      let usuario = new Usuario();
      usuario.codigo = this._codigoTeacherSelected

      profesorAula.aula = element;
      profesorAula.profesor = usuario;
      
      listTeacherClassrooms.push(profesorAula)
    });

    this._schoolService.registraSalones(this._codigoTeacherSelected, listTeacherClassrooms)
    .subscribe(datos =>{
      if (datos instanceof HttpResponse) {
        Metodo.DIALOG_MESSAGE_SUCCESS('Users imported!')
      }
      this.spinnerLoading.hide();
    })

  }

  confirmar(){

    this.spinnerLoading.show();
    if(this._flagMuestra == 2){
      this.multichckRoomsComponent.finalSalon();
    }else{
      this._usuarioService.insertarUsuarioMasivo(this._classroomStudentsLoaded, this._schoolSelected.codigo, this._sectionGradeSelected.codigo)
      .subscribe(datos =>{
        if (datos instanceof HttpResponse) {
          Metodo.DIALOG_MESSAGE_SUCCESS('Users imported!')
        }
        this.spinnerLoading.hide();
      })
    }
  }

  
}
