import { Component } from '@angular/core';
import { Qr } from "../../components/qr/qr";
import { FormRegistroPet } from "../../components/form-registro-pet/form-registro-pet";

@Component({
  selector: 'app-generar-qr',
  imports: [Qr, FormRegistroPet],
  templateUrl: './generar-qr.html',
  styleUrl: './generar-qr.scss'
})
export class GenerarQr {

}
