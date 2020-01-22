import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { InputService } from '../../services/input.service';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
	title = "COJ";

	searchBox: FormControl = new FormControl();
	subscription: Subscription;
  
  constructor(private input: InputService, private router: Router) { }

  ngOnInit() {
  	// the code below is to publish the term to input service whenever it changes in navbar
  	this.subscription = this.searchBox
  							.valueChanges //this is a value change event
  							.pipe(debounceTime(200)) // wait for 200 ms in case the input hasn't been finished by clients
  							.subscribe(term => this.input.changeInput(term)); // 拿到term，利用input service中的function，对term进行publish
  }

  ngOnDestroy () {
  	this.subscription.unsubscribe();
  }

// purpose for the code below?
   searchProblem(): void {
  	this.router.navigate(['/problems']);
  }

}
