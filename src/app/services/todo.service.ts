import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ITodo} from "../models/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private httpClient: HttpClient) { }

  getAllTodos(): Observable<ITodo[]>{
    return this.httpClient.get<ITodo[]>('https://localhost:5003/api/todo');
  }
}
