import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";

import { StudentService } from "./student.service";
import { StudentComponent } from "./student/student.component";
import { StudentFormComponent } from "./student-form/student-form.component";

@NgModule({
    declarations: [
        StudentComponent,
        StudentFormComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [
        StudentService
    ],
    exports: [
        StudentComponent,
        StudentFormComponent
    ]
})
export class StudentModule { }