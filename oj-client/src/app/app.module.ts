import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // angular need this to send http request to server
import { ReactiveFormsModule } from '@angular/forms';

//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';

import { routing } from './app.routes';
import { NewProblemComponent } from './components/new-problem/new-problem.component';
import { EditorComponent } from './components/editor/editor.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchPipe } from './pipes/search.pipe';
import {CollaborationService } from './services/collaboration.service';

@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    ProblemDetailComponent,
    NewProblemComponent,
    EditorComponent,
    NavbarComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    //AppRoutingModule,
    routing,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [CollaborationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
