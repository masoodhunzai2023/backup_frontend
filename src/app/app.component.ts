import { Component } from '@angular/core';
import { AuthServiceService } from './auth-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
isUser(): any {
throw new Error('Method not implemented.');
}
  title = 'finalproject';
  constructor(public authService:AuthServiceService){}

}
