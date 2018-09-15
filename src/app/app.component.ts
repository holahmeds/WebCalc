import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	displayText: string = "0";
	readonly displaySize = 18;

	items: string[] = ["0"];
	last_item_number: boolean = true;

	history: PastCalculations[] = [];

	buttons: string[] = [
		 "7", "8", "9", "/", "clear",
		 "4", "5", "6", "*",    null,
		 "1", "2", "3", "-",    null,
		null, "0", ".", "+",     "=",
	];

	ngOnInit() {
        let json = localStorage.getItem("history");
        if (json != null) {
            this.history = JSON.parse(json);
        }
	}

	isNumber(s: string) {
		return !isNaN(Number(s));
	}

	updateDisplay() {
		this.displayText = this.items.join(" ");
	}
	setItems(n: number) {
		let ns = n.toString();
		this.displayText = ns;
		this.items = [ns];
	}

	onButtonPress(button: string) {
		if (button == "=") {
			let result = eval(this.displayText);

			this.history.push({result: result, expression: this.displayText});
			localStorage.setItem("history", JSON.stringify(this.history));

			this.setItems(result);
			return;
		} else if (button == "clear") {
			this.setItems(0);
			return;
		}

		let button_is_number = this.isNumber(button);

		if (button_is_number != this.last_item_number) {
			if (this.last_item_number && button === '.') {
				let lastItem = this.items[this.items.length - 1];

				if (!lastItem.includes('.')) {
					lastItem = lastItem + '.';
					this.items[this.items.length - 1] = lastItem;
				}
			} else {
				this.items.push(button);
				this.last_item_number = !this.last_item_number;
			}
		} else if (button_is_number) {
			let lastItem = this.items[this.items.length - 1];

			if (lastItem === '0') {
				lastItem = button;
			} else {
				lastItem = lastItem + button;
			}

			this.items[this.items.length - 1] = lastItem;
		}

		this.updateDisplay();
	}

	@HostListener('document:keydown', ['$event'])
	onKey(event: KeyboardEvent) {
		let key = event.key;
		if (this.buttons.includes(key)) {
			this.onButtonPress(key);
		} else if (key == "Enter") {
			this.onButtonPress("=");
		} else if (key == "Escape") {
			this.onButtonPress("clear");
		}
	}
}

interface PastCalculations {
	result: string,
	expression: string,
}
