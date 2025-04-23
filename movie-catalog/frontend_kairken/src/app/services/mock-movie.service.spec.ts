import { TestBed } from '@angular/core/testing';

import { MockMovieService } from './mock-movie.service';

describe('MockMovieService', () => {
  let service: MockMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
