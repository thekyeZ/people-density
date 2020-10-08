import { TestBed } from '@angular/core/testing';

import { DataScrapperService } from './data-scrapper.service';

describe('DataScrapperService', () => {
  let service: DataScrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataScrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
