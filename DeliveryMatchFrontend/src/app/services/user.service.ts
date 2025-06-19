import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import * as http from 'node:http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private apiUrl= 'http://localhost:8081/api/users';
  constructor(private http: HttpClient) { }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl)
  }
  getUserById( id:number):Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/${id}`)
  }
  createuser(user:User):Observable<User>{
    return this.http.post<User>(this.apiUrl,user);
  }
  updateUser(user:User,id:number):Observable<User>{
    return this.http.put<User>(`${this.apiUrl}/${id}`,user)
  }
  deleteUser(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }
}
