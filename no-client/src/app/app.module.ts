import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UtilitiesService } from './utilities/utilities.service';
import { ConfigurationAppService } from './service/configuration-app.service';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { CategoriesService } from './service/categories.service';
import { ProductsService } from './service/products.service';
registerLocaleData(en);
const initConfigFn = (configService: ConfigurationAppService) => {
    return () => {
        return configService.loadConfig();
    };
};
@NgModule({
    declarations: [AppComponent, NotFoundComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
    ],
    providers: [
        UtilitiesService,
        ProductsService,
        CategoriesService,
        { provide: NZ_I18N, useValue: en_US },
        { provide: APP_INITIALIZER, useFactory: initConfigFn, multi: true, deps: [ConfigurationAppService] },
        { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    ]
    ,
    bootstrap: [AppComponent],
})
export class AppModule { }
