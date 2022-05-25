import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Student } from '../../interface/student.interface'

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit, OnChanges {

    @Input()
    lastStudent!: Student;

    @Input()
    editStudent!: Student;

    @Input()
    editing!: boolean;

    @Output()
    create: EventEmitter<Student> = new EventEmitter<Student>();

    @Output()
    update: EventEmitter<Student> = new EventEmitter<Student>();
    
    @Output()
    cancel: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['editing']) {
            console.log(this.editing);
        }
        
    }

  ngOnInit(): void {
  }

  handleSubmit(student: Student, isValid: boolean | null, form: any) {
    if (isValid) {
        this.create.emit(student);
        form.resetForm()
    }
  }

  handleEdit(student: Student, isValid: boolean | null) {
    if (isValid) {
        this.update.emit(student);
    }
  }

  handleCancel(){
      this.cancel.emit(false);
  }

}
