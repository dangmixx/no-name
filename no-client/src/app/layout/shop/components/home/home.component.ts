import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { UtilitiesService } from 'src/app/utilities/utilities.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    @ViewChild('antCarousel') antCarousel: NzCarouselComponent;
    public listItem = [1, 2, 3, 4];
    public isMobileOrTablet = false;
    // 768px => reloadPage
    private currentWidthIsLarge = true;
    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        // force reload fix carousel not reset height content element
        const width = document.body.clientWidth;
        if ((width > 768 && !this.currentWidthIsLarge) || (width < 768 && this.currentWidthIsLarge)) {
            location.reload();
        }
    }
    constructor(
        private utilitiesService: UtilitiesService
    ) { }

    ngOnInit(): void {
        this.currentWidthIsLarge = document.body.clientWidth > 768;
        this.isMobileOrTablet = this.utilitiesService.isMobile() || this.utilitiesService.isTablet();
    }

}
