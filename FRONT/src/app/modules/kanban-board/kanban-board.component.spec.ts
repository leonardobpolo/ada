import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { KanbanBoardComponent } from './kanban-board.component';
import { KanbanBoardService } from './_services/kanban-board.service';
import { Task } from './_types/task';
import { Observable, of } from 'rxjs';

describe('KanbanBoardComponent', () => {
  let component: KanbanBoardComponent;
  let fixture: ComponentFixture<KanbanBoardComponent>;
  let service: KanbanBoardService;

  const mockTask: Task = {
    id: 'ID_MOCK',
    titulo: 'TITULO_MOCK',
    conteudo: 'CONTEUDO_MOCK',
    lista: 'LISTA_MOCK'
  };

  const mockTaskList: Task[] = [
    mockTask,
    {
      id: 'ID_MOCK_2',
      titulo: 'TITULO_MOCK_2',
      conteudo: 'CONTEUDO_MOCK_2',
      lista: 'LISTA_MOCK_2'
    }
  ];

  class MockKanbanBoardService {
    getCards(): Observable<any> {
      return of(mockTaskList);
    }

    postCard(card: Task): Observable<any> {
      return of({});
    }

    putCard(card: Task): Observable<any> {
      return of({});
    }
    
    deleteCard(cardId: string): Observable<any> {
      return of({});
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        KanbanBoardComponent
      ],
      imports: [
        HttpClientTestingModule,
        MatIconModule,
        DragDropModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: KanbanBoardService,
          useClass: MockKanbanBoardService
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanBoardComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(KanbanBoardService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get cards from service on initialization', () => {
    spyOn(service, 'getCards').and.callThrough();

    component.ngOnInit();
    
    expect(service.getCards).toHaveBeenCalled();
  });

  describe('returnList function', () => {
    it('when param is TODO should return toDoList', () => {
      expect(component.returnList('TODO')).toEqual(component.toDoList);
    });

    it('when param is DOING should return doingList', () => {
      expect(component.returnList('DOING')).toEqual(component.doingList);
    });
    
    it('when param is DONE should return doneList', () => {
      expect(component.returnList('DONE')).toEqual(component.doneList);
    });

    it('when param is any other should return an empty array', () => {
      expect(component.returnList('INVALID')).toEqual([]);
    });
  });

  describe('getCards function', () => {
    it('should reset toDoList', () => {
      component.toDoList = [
        {
          titulo: 'TITULO_MOCK',
          conteudo: 'CONTEUDO_MOCK',
          lista: 'LISTA_MOCK'
        }
      ];

      component.getCards();

      expect(component.toDoList).toEqual([]);
    });

    it('should reset doingList', () => {
      component.doingList = [
        {
          titulo: 'TITULO_MOCK',
          conteudo: 'CONTEUDO_MOCK',
          lista: 'LISTA_MOCK'
        }
      ];

      component.getCards();

      expect(component.doingList).toEqual([]);
    });

    it('should reset doneList', () => {
      component.doneList = [
        {
          titulo: 'TITULO_MOCK',
          conteudo: 'CONTEUDO_MOCK',
          lista: 'LISTA_MOCK'
        }
      ];

      component.getCards();

      expect(component.doneList).toEqual([]);
    });
  });

  describe('createTask function', () => {
    it('should set newTask as true', () => {
      component.createTask();

      expect(component.newTask).toEqual({
        edit: false,
        titulo: '', 
        conteudo: '',
        lista: 'TODO'
      });
    });

    it('should set showNewTaskBtn as false', () => {
      component.createTask();

      expect(component.showNewTaskBtn).toBeFalsy();
    });
  });

  describe('creationCancel function', () => {
    it('should set showNewTaskBtn as true', () => {
      component.showNewTaskBtn = false;
      component.creationCancel();

      expect(component.showNewTaskBtn).toBeTruthy();
    });
  });
});