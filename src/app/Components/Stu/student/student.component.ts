import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Student } from '../../interface/student.interface';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
    @Input()
    editing!: boolean;

    @Input()
    students!: Student[];

    @Output()
    edit: EventEmitter<any> = new EventEmitter();

    @Output()
    delete: EventEmitter<any> = new EventEmitter();
    
  constructor(
      private studentService: StudentService
  ) { }
    
    handleDelete(student: Student){
        this.delete.emit(student)
    }
    
    handleEdit(student: Student){
        this.editing = true
        this.edit.emit({ student: student, editing: this.editing })
    }
}
