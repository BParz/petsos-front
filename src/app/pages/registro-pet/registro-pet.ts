import { Component } from '@angular/core';
import { FormRegistroPet } from "../../components/form-registro-pet/form-registro-pet";

@Component({
  selector: 'app-registro-pet',
  imports: [FormRegistroPet],
  templateUrl: './registro-pet.html',
  styleUrl: './registro-pet.scss'
})
export class RegistroPet {

}
