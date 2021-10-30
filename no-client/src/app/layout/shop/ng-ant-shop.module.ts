import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzDividerModule } from 'ng-zorro-antd/divider';
@NgModule({
	exports: [
		NzButtonModule,
		NzCarouselModule,
		NzCheckboxModule,
		NzGridModule,
		NzI18nModule,
		NzIconModule,
		NzLayoutModule,
		NzSliderModule,
		NzDividerModule
	],
})
export class ShopNgZorroAntModule {}
