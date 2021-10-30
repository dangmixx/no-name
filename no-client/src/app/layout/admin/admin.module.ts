import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminNgZorroAntModule } from './ng-ant-admin.module';
import { HttpClientModule } from '@angular/common/http';
import { AdminRoutingModule } from './admin-router.module';
import { AdminMainComponent } from './components/admin-main/admin-main.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
@NgModule({
	declarations: [
		AdminMainComponent
	],
	imports: [
		CommonModule,
		HttpClientModule,
		AdminRoutingModule,
		AdminNgZorroAntModule,
		DragDropModule,
		ScrollingModule
	],
})
export class AdminModule { }
