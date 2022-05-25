import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Student } from './Components/interface/student.interface';
import { StudentService } from './Components/Stu/student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
    students!: Student[];
    lastStudent!: Student;
    editing!: boolean;
    editStudent!: Student;
    title = 'mini-project';
    
    constructor(
        private studentService: StudentService
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        // if (changes['students']) {
        //     this.students = Object.assign({}, changes['students'].currentValue);
        // }
    
        // console.log('ngOnChanges');
    }

    ngOnInit(): void {
        this.studentService.getStudents().subscribe((data: Student[]) => {
            this.students = data
            this.lastStudent = data[data.length - 1]
        })

    }

    onCreate(event: Student){
        if(this.students.some((student) => student.id === event.id)){
            return
        }
        this.studentService.createStudent(event).subscribe((data: Student) => this.students.push(data))
    }

    onDelete(event: Student){
        this.studentService.deleteStudent(event).subscribe((data: Student) => {
            this.students = this.students.filter((student) => student.id !== event.id )
        })
        this.editing = false
    }

    onEdit(event: { student: Student, editing: boolean }){
        this.editStudent = event.student
        this.editing = event.editing
    }

    onUpdate(event: Student){
        this.editing = false;
        this.studentService.updateStudent(event).subscribe((data: Student) => {
            this.students = this.students.map((student) => {
                if(student.id === event.id){
                    student = Object.assign({}, student, event)
                }
                return student;
            })
        })
    }
    
    onCancel(event: boolean){
        this.editing = event
    }
}
