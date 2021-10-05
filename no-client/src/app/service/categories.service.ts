import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICategories } from '../model/categories';
import { GridData } from '../model/grid-data';
import { IProduct } from '../model/products';
import { ConfigurationAppService } from './configuration-app.service';
@Injectable()
export class CategoriesService {
    private requestURL = '';
    constructor(
        private configService: ConfigurationAppService,
        private http: HttpClient
    ) {
        this.requestURL = this.configService.getConfig().apiUrl;
    }

    getListCategories(): Observable<GridData<ICategories>> {
        return this.http.get<GridData<ICategories>>(`${this.requestURL}/category/productsByCategory`);
    }

}
