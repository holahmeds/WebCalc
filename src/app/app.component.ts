import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	displayText: string = "0";

	items: string[] = ["0"];
	last_item_number: boolean = true;

	buttons: string[] = [
		"7", "8", "9", "/",
		"4", "5", "6", "*",
		"1", "2", "3", "-",
		".", "0", "=", "+",
	];

	isNumber(s: string) {
		return !isNaN(Number(s));
	}

	updateDisplay() {
		let text = "";
		for (var i = 0; i < this.items.length - 1; ++i) {
			text = text + this.items[i] + " ";
		}
		text = text + this.items[this.items.length - 1];

		this.displayText = text;
	}

	onButtonPress(button: string) {
		if (button == "=") {
			let result = eval(this.displayText);
			this.items = [result];
			this.displayText = result;
			return;
		}

		let button_is_number = this.isNumber(button);

		if (button_is_number != this.last_item_number) {
			this.items.push(button);
			this.last_item_number = !this.last_item_number;
		} else if (button_is_number) {
			let lastItem = this.items[this.items.length - 1];
			lastItem = Number(lastItem + button).toString();
			this.items[this.items.length - 1] = lastItem;
		}

		this.updateDisplay();
	}
}
