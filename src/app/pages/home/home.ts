import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatIconModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
