import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { KanbanBoardService } from './_services/kanban-board.service';

import { Task } from './_types/task';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {
  constructor(
    private kanbanBoardService: KanbanBoardService
  ) { }

  showNewTaskBtn = true;
  newTask: Task = {
    edit: false,
    titulo: '', 
    conteudo: '',
    lista: 'TODO'
  };
  newTaskError: string = '';
  editionTaskError: string = '';
  toDoList: Array<Task> = [];
  doingList: Array<Task> = [];
  doneList: Array<Task> = [];

  ngOnInit() {
    this.getCards();  
  }

  returnList(list: string) {
    if (list === 'TODO') {
      return this.toDoList;
    }
    
    if (list === 'DOING') {
      return this.doingList;
    }
    
    if (list === 'DONE') {
      return this.doneList;
    }

    return [];
  }

  getCards() {
    this.toDoList = [];
    this.doingList = [];
    this.doneList = [];

    this.kanbanBoardService.getCards()
      .subscribe((res) => {
        res.forEach((task: Task) => {
          const cardList = this.returnList(task.lista);

          cardList.push(task);
        });
        
        this.showNewTaskBtn = true;
      });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      const card: any = event.container.data[event.currentIndex];

      const editedCard: Task = {
        id: card.id,
        titulo: card.titulo,
        conteudo: card.conteudo,
        lista: event.container.element.nativeElement.id
      };
      
      this.kanbanBoardService.putCard(editedCard)
        .subscribe(() => {
          this.getCards();
        });
    }
  }

  createTask() {
    this.newTask = {
      edit: false,
      titulo: '', 
      conteudo: '',
      lista: 'TODO'
    };

    this.showNewTaskBtn = false;
  }

  creationCancel() {
    this.showNewTaskBtn = true;
  }

  creationDone(list: string) {
    if (!this.newTask.titulo || !this.newTask.conteudo) {
      return this.newTaskError = 'Preencha todos os campos.'
    }

    this.newTaskError = '';

    const newCard = {
      titulo: this.newTask.titulo,
      conteudo: this.newTask.conteudo,
      lista: list
    };

    return this.kanbanBoardService.postCard(newCard)
      .subscribe(() => {
        this.getCards();
      });
  }

  editionStart(list: string, taskIndex: number) {
    this.editionCancel();

    const cardList = this.returnList(list);

    cardList[taskIndex].newTitulo = cardList[taskIndex].titulo;
    cardList[taskIndex].newConteudo = cardList[taskIndex].conteudo;
    cardList[taskIndex].edit = true;
  }

  editionCancel() {
    this.toDoList.forEach((task: Task) => {
      task.edit = false;
    });

    this.doingList.forEach((task: Task) => {
      task.edit = false;
    });

    this.doneList.forEach((task: Task) => {
      task.edit = false;
    });

    this.editionTaskError = '';
  }

  editionDone(list: string, taskIndex: number) {
    const cardList = this.returnList(list);

    if (!cardList[taskIndex].newTitulo || !cardList[taskIndex].newConteudo) {
      return this.editionTaskError = 'Preencha todos os campos.'
    }

    this.editionTaskError = '';

    const editedCard: Task = {
      id: cardList[taskIndex].id,
      titulo: cardList[taskIndex].newTitulo || '',
      conteudo: cardList[taskIndex].newConteudo || '',
      lista: cardList[taskIndex].lista
    };

    return this.kanbanBoardService.putCard(editedCard)
      .subscribe(() => {
        this.getCards();
      });
  }

  deleteTask(cardId?: string) {
    if(cardId && confirm('Tem certeza que deseja excluir esta tarefa permanentemente?')){
      this.kanbanBoardService.deleteCard(cardId)
        .subscribe(() => {
          this.getCards();
        });
    }
  }
}
