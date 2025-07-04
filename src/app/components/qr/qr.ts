import { Component } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-qr',
  imports: [QRCodeComponent],
  templateUrl: './qr.html',
  styleUrl: './qr.scss'
})
export class Qr {
  qrData = 'https://www.google.com';
}
