import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-admin-main',
    templateUrl: './admin-main.component.html',
    styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent implements OnInit {
    public isCollapsed = false;
    constructor() { }

    ngOnInit(): void {
    }

}
