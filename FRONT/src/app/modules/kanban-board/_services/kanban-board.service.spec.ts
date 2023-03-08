import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { KanbanBoardService } from './kanban-board.service';
import { Task } from '../_types/task';

describe('KanbanBoardService', () => {
  let service: KanbanBoardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ KanbanBoardService ]
    });
    service = TestBed.inject(KanbanBoardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCards function', () => {
    it('should do a GET call', () => {
      service.getCards().subscribe();
  
      const req = httpMock.expectOne('cards');
  
      expect(req.request.method).toBe('GET');
      
      req.flush([]);
    });

    it('should call /cards endpoint', () => {
      service.getCards().subscribe();
  
      const req = httpMock.expectOne('cards');
  
      expect(req.request.url).toBe('cards');
      
      req.flush([]);
    });
  });

  describe('postCard function', () => {
    it('should do a POST call', () => {
      const newCard: Task = {
        id: 'ID_MOCK',
        titulo: 'TITULO_MOCK',
        conteudo: 'CONTEUDO_MOCK',
        lista: 'LISTA_MOCK'
      };
  
      service.postCard(newCard).subscribe();
  
      const req = httpMock.expectOne('cards');

      expect(req.request.method).toBe('POST');
      
      req.flush({});
    });

    it('should call /cards endpoint', () => {
      const newCard: Task = {
        id: 'ID_MOCK',
        titulo: 'TITULO_MOCK',
        conteudo: 'CONTEUDO_MOCK',
        lista: 'LISTA_MOCK'
      };
  
      service.postCard(newCard).subscribe();
  
      const req = httpMock.expectOne('cards');
  
      expect(req.request.url).toBe('cards');
      
      req.flush([]);
    });
  });

  describe('putCard function', () => {
    it('should do a PUT call', () => {
      const editedCard: Task = {
        id: 'ID_MOCK',
        titulo: 'TITULO_MOCK',
        conteudo: 'CONTEUDO_MOCK',
        lista: 'LISTA_MOCK'
      };
  
      service.putCard(editedCard).subscribe();
  
      const req = httpMock.expectOne(`cards/${ editedCard.id }`);
  
      expect(req.request.method).toBe('PUT');
      
      req.flush({});
    });

    it('should call /cards/:id endpoint', () => {
      const editedCard: Task = {
        id: 'ID_MOCK',
        titulo: 'TITULO_MOCK',
        conteudo: 'CONTEUDO_MOCK',
        lista: 'LISTA_MOCK'
      };
  
      service.putCard(editedCard).subscribe();
  
      const req = httpMock.expectOne(`cards/${ editedCard.id }`);
  
      expect(req.request.url).toBe('cards/ID_MOCK');
      
      req.flush([]);
    });
  });

  describe('deleteCard function', () => {
    it('should delete an existing card via DELETE', () => {
      const cardId = 'ID_MOCK';
  
      service.deleteCard(cardId).subscribe();
  
      const req = httpMock.expectOne(`cards/${ cardId }`);
  
      expect(req.request.method).toBe('DELETE');
      
      req.flush({});
    });

    it('should call /cards/:id endpoint', () => {
      const cardId = 'ID_MOCK';
  
      service.deleteCard(cardId).subscribe();
  
      const req = httpMock.expectOne(`cards/${ cardId }`);
  
      expect(req.request.url).toBe('cards/ID_MOCK');
      
      req.flush([]);
    });
  });
});