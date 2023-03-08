import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  	providedIn: 'root'
})
export class UserService implements CanActivate {
	constructor(
		private router: Router,
	) { }

	canActivate() {
        const active = localStorage.getItem('token');

        if (!active) {
            this.router.navigateByUrl('/login');
        }

        return !!active;
	}
}