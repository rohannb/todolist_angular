import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../models/Todo'
import { Observable } from 'rxjs';

const httpOptions={
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosURL:string = 'https://jsonplaceholder.typicode.com/todos';
  todosLimit:string = '?_limit=3';

  constructor(private http:HttpClient) { }

  //get todos
  getTodos(): Observable<Todo[]>{
    return this.http.get<Todo[]>(`${this.todosURL}${this.todosLimit}`);
  }

  //toggle on db
  toggleCompleted(todo: Todo): Observable<any>{
    let url= `${this.todosURL}/${todo.id}`
    return this.http.put<Todo[]>(url,todo,httpOptions)
  }

  //delete from db
  deleteTodo(todo:Todo): Observable<Todo>{
    let url= `${this.todosURL}/${todo.id}`
    return this.http.delete<Todo>(url,httpOptions);
  }

  addTodo(todo:Todo): Observable<Todo>{
    return this.http.post<Todo>(this.todosURL,todo, httpOptions);
  }
}
