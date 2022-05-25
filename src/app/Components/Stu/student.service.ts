import { Injectable } from "@angular/core";

import { Observable, of } from "rxjs";
import { map, tap, catchError } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Student } from './../interface/student.interface';

const URL_API = 'http://localhost:3000/students';

@Injectable({
    providedIn: 'root'
})
export class StudentService {
    constructor(private http: HttpClient) { }

    createStudent(student: Student): Observable<Student> {
        let headers = new HttpHeaders({'Content-Type': 'application/json'})

        let options = {
            headers: headers,
        }

        return this.http.post<Student>(`${URL_API}`, student, options).pipe(
            tap(data => console.log(data)),
            catchError(this.handleError<Student>('createStudent', student))
        )
    }

    getStudents(): Observable<Student[]> {
        return this.http.get<Student[]>(URL_API).pipe(
            tap(data => console.log(data)),
            catchError(this.handleError<Student[]>('getStudents', []))
        )
    }

    updateStudent(student: Student): Observable<Student>{
        let headers = new HttpHeaders({'Content-Type': 'application/json'})

        let options = {
            headers: headers,
        }

        return this.http.put<Student>(`${URL_API}/${student.id}`, student, options).pipe(
            tap(data => console.log(data)),
            catchError(this.handleError<Student>('updateStudent', student))
        )
    }

    deleteStudent(student: Student): Observable<Student>{
        return this.http.delete<Student>(`${URL_API}/${student.id}`).pipe(
            tap(data => console.log(data)),
            catchError(this.handleError<Student>('deleteStudent'))
        )
    }

    private handleError<T>(operation = 'operation', result?: T) {

        return (error: any): Observable<T> => {
            let errorMessage = '';
            if (error instanceof ErrorEvent) {
                errorMessage = `Error: ${error.error.message}`;
            }
            else {
                errorMessage = `Error code: ${error.status}<br>Message: ${error.message}<br>Error: ${error.error}`;
            }
    
            alert(errorMessage);
    
            return of(result as T);
        }
    }
}