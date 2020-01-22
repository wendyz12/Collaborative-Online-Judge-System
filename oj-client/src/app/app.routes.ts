import { Routes, RouterModule } from '@angular/router';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'problems',
		pathMatch: 'full'

	},
	{
		path: 'problems',
		component: ProblemListComponent
	},
	{
		path: 'problems/:id', // :id is parameter e.g. problems/1 (id=1) component: ProblemDetailComponent
		component: ProblemDetailComponent
	},
	{
		path: '**',
		redirectTo: 'problems'
	}

]

export const routing = RouterModule.forRoot(routes);