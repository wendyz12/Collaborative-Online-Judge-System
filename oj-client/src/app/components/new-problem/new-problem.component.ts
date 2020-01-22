import { Component, OnInit } from '@angular/core';
import { Problem } from '../../models/problem.model';
import { DataService } from '../../services/data.service';

const DEFAULT_PROBLEM: Problem = Object.freeze({ // "Object.freeze" prevents the modification of existing property attributes and values and prevents the addition of new properties
	id: 0,
	name: '',
	desc: '',
	difficulty: 'easy'
})


@Component({
  selector: 'app-new-problem',
  templateUrl: './new-problem.component.html',
  styleUrls: ['./new-problem.component.css']
})
export class NewProblemComponent implements OnInit {
  newProblem: Problem = Object.assign({}, DEFAULT_PROBLEM); //.assign is to copy the value to the targeted variable
  difficulties: string[] = ['easy','medium','hard','super'];
  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  addProblem() {
  	this.dataService.addProblem(this.newProblem);
  	this.newProblem = Object.assign({}, DEFAULT_PROBLEM);
  }

}
