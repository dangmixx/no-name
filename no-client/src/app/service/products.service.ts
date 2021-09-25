import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProduct } from '../model/products';

@Injectable()
export class ProductsService {
	constructor(private http: HttpClient) {}

	getListProduct(): Observable<IProduct[]> {
		return of([
			{
				id: 'string',
				name: 'string',
				imageUrl: 'string',
				price: 1,
				listPrice: 1,
				order: 1,
				rate: 1,
				tag: 'string',
				tagInfo: 'string',
				categoryId: 'string',
				slug: 'string',
			},
			{
				id: 'string',
				name: 'string',
				imageUrl: 'string',
				price: 1,
				listPrice: 1,
				order: 1,
				rate: 1,
				tag: 'string',
				tagInfo: 'string',
				categoryId: 'string',
				slug: 'string',
			},
			{
				id: 'string',
				name: 'string',
				imageUrl: 'string',
				price: 1,
				listPrice: 1,
				order: 1,
				rate: 1,
				tag: 'string',
				tagInfo: 'string',
				categoryId: 'string',
				slug: 'string',
			},
			{
				id: 'string',
				name: 'string',
				imageUrl: 'string',
				price: 1,
				listPrice: 1,
				order: 1,
				rate: 1,
				tag: 'string',
				tagInfo: 'string',
				categoryId: 'string',
				slug: 'string',
			},
		]);
	}
}
