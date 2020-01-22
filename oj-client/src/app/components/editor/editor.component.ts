import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'; // import router to get session id
import {CollaborationService } from '../../services/collaboration.service';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';

declare var ace: any; // import ace by declaring a variable to reference the ace.js imported in angular jason

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
	editor: any;

	sessionId: string;

  output: string = '';
	
	public languages: string[] = ['Java', 'Python'];
	language: string = 'Java';

	defaultContent = {
    "Java": ` public class Example {
       public static void main(String[] args) {
        // Type your Java code here
       }
	}`,
	"Python": `class Solution:
		def example():
			#Write your Python code here`
 }; //use `` to write multi-line text
  
  constructor(private collaboration: CollaborationService, private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {


  	this.route.params.subscribe(
  		params => {
  			this.sessionId = params['id']; // make problem id in the url the "sessionID"
  			this.initEditor();
  		})
      this.collaboration.restoreBuffer();
  }

  initEditor(): void {
  	this.editor = ace.edit('editor'); // the second "editor" is the id in "editor.component.html"
  	this.editor.setTheme("ace/theme/eclipse"); // what's the view like
  	
  	this.resetEditor();

  	document.getElementsByTagName('textarea')[0].focus(); //set focus to textarea in case it moves to other objects

  	this.collaboration.init(this.editor, this.sessionId);// conduct handshake with server by using collaboration service; pass "editor" and "sessionId" to collaboration service
  	
  	// receive changes sent by server
  	this.editor.lastAppliedChange = null; 


  	this.editor.on('change', (e) => {
  		console.log('editor changes: ' + JSON.stringify(e));
  		// once receives any change, check if the change event "e" is the lastAppliedChange; if not, pass to collaboration service to further pass to server, so that the change event can be used
  		if (this.editor.lastAppliedChange != e ) {
  			this.collaboration.change(JSON.stringify(e));
  		}

  	})         


  }

  resetEditor(): void {
  	this.editor.setValue(this.defaultContent[this.language]);
  	this.editor.getSession().setMode("ace/mode/" + this.language.toLowerCase()); // set programming language
  }

  setLanguage(language: string): void { // this language here can be named as anything and it is a local thing
  	this.language = language; 
  	this.resetEditor();
  }

  submit(): void {
  	let usercode = this.editor.getValue();
  	console.log(usercode);

    const data = {
    code: usercode,
    lang: this.language.toLowerCase()
    }

    this.dataService.buildAndRun(data).then(res => this.output = res);
  }

}
