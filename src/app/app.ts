import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { EnvironmentInfo } from './components/environment-info/environment-info';
import { Loading } from './components/loading/loading';
import { LoadingService } from './services/loading.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, EnvironmentInfo, Loading, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'petsos-front';

  constructor(public loadingService: LoadingService) { }
}
