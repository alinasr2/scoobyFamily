import { AfterViewInit, Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite/flowbite.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BackToTopComponent } from "./shared/components/back-to-top/back-to-top.component";
import { NgxSpinnerComponent } from 'ngx-spinner';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CarouselModule, BackToTopComponent,NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [],
})
export class AppComponent implements AfterViewInit {
  title = 'scooby';

  constructor(private flowbiteService: FlowbiteService ) {}

  // ngOnInit(): void {
  //   // this.flowbiteService.loadFlowbite((flowbite) => {
  //   //   initFlowbite();
  //   // });
  // }
  ngAfterViewInit(): void {
    // (window as any).initFlowbite?.();
  }



  
}
