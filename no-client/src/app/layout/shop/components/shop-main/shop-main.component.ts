import { Component, HostListener, OnInit } from '@angular/core';
import { ICategories } from 'src/app/model/categories';
import { CategoriesService } from 'src/app/service/categories.service';

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
	public listCategories: ICategories[] = [];
	constructor(private categoriesService: CategoriesService) {}

	ngOnInit(): void {
		this.getListCategories();
	}

	getListCategories(): void {
		this.categoriesService.getListCategories().subscribe((res) => {
			this.listCategories = res.items;
		});
	}
}
