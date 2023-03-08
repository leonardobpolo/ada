import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Task } from './../_types/task';

@Injectable({
  providedIn: 'root'
})
export class KanbanBoardService {
  constructor(
    private http: HttpClient
  ) { }

  getCards(): Observable<any> {
    return this.http.get('cards');
  }

  postCard(newCard: Task): Observable<any> {
    return this.http.post('cards', newCard);
  }

  putCard(editedCard: Task): Observable<any> {
    return this.http.put(`cards/${ editedCard.id }`, editedCard);
  }

  deleteCard(cardId: string): Observable<any> {
    return this.http.delete(`cards/${ cardId }`);
  }
}
