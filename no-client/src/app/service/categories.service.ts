import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICategories } from '../model/categories';
import { GridData } from '../model/grid-data';
import { IProduct } from '../model/products';
@Injectable()
export class CategoriesService {
	constructor() { }

	getListCategories(): Observable<GridData<ICategories>> {
		return of<GridData<ICategories>>({
			total: 3,
			items: [
				{
					id: '1',
					imageUrl: 'assets/images/products/pro-img-01.jpg',
					name: 'Category1',
					slug: 'Category1',
					tag: '',
					tagInfo: ''
				},
				{
					id: '2',
					imageUrl: 'assets/images/products/pro-img-01.jpg',
					name: 'Category1',
					slug: 'Category1',
					tag: '',
					tagInfo: ''
				},
				{
					id: '3',
					imageUrl: 'assets/images/products/pro-img-01.jpg',
					name: 'Category1',
					slug: 'Category1',
					tag: '',
					tagInfo: ''
				}
			]
		});
	}
}
