import { Component, OnInit, OnDestroy } from '@angular/core'; //"OnDestory" for unsubscribe
import { Subscription } from 'rxjs';
import { Problem } from '../../models/problem.model'; 

//import { PROBLEMS } from '../../mock-problems'; 
import { DataService } from '../../services/data.service';
import { InputService } from '../../services/input.service' ;


@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit, OnDestroy {
	problems: Problem[];
  subscriptionProblems: Subscription;

  searchTerm: string='';
  subscriptionInput: Subscription;

  constructor(private dataService: DataService, private inputService: InputService) { }

  ngOnInit() {
  	this.getProblems();
    this.getSearchTerm();
  }

  ngOnDestroy(){
    this.subscriptionProblems.unsubscribe();
  }
  getProblems() {
  	//this.problems = PROBLEMS;
    //this.problems = this.dataService.getProblems();
    
    //.getProblems() with server now is asynchronous operation
    // I will wait whenever I can get the data, so I "subscribe"
    // when I have the data, the operation I will run is to 
    // pass "problems" I subscribe to to "problems" I defined earlier in the file
    this.subscriptionProblems = this.dataService.getProblems()   
      .subscribe(problems => this.problems = problems);
  }

  getSearchTerm() {
    this.subscriptionInput = this.inputService.getInput() 
      .subscribe(inputTerm => this.searchTerm = inputTerm); // pass inputTerm to searchTerm defined local here in problem-list ts file
  }

}
