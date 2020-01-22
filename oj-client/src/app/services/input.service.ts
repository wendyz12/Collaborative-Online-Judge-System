import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputService {
	private inputSubject$ = new BehaviorSubject<string>(''); // "$" sign means it is a string; define what others will get when they subscribe to this service

  constructor() { }

  changeInput(term) {
  	this.inputSubject$.next(term); // how will the term be published to the input service; so that inputSubject will be able to send out the term to the subscriber; the subscriber will get the term of whatever it is
  }

  getInput(): Observable<string> { // As "inputSubject$" is a local variable, we need define a function to let others get "inputSubject$"
  	return this.inputSubject$.asObservable();
  }
}


