import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	buttons: string[] = [
		"7", "8", "9", "/",
		"4", "5", "6", "*",
		"1", "2", "3", "-",
		".", "0", "=", "+",
	];
}
