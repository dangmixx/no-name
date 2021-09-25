import { Component, HostListener, OnInit } from '@angular/core';

@Component({
	selector: 'app-shop-main',
	templateUrl: './shop-main.component.html',
	styleUrls: ['./shop-main.component.scss'],
})
export class ShopMainComponent implements OnInit {
	public isSticky: boolean = false;
	@HostListener('window:scroll', ['$event'])
	checkScroll() {
		this.isSticky = window.pageYOffset >= 250;
	}
	constructor() {}

	ngOnInit(): void {}
}
