import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-form-registro-pet',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './form-registro-pet.html',
  styleUrl: './form-registro-pet.scss'
})
export class FormRegistroPet {
  private readonly formBuilder = inject(FormBuilder);

  formPet = this.formBuilder.group({
    petName: ['', Validators.required],
    petType: ['', Validators.required],
    petBreed: ['', Validators.required],
    petColor: ['', Validators.required],
    petGender: ['', Validators.required],
    petBirthDate: ['', Validators.required],
    petImage: [''],
  });

  formOwner = this.formBuilder.group({
    ownerName: ['', Validators.required],
    ownerPhone: ['', Validators.required],
    ownerEmail: ['', Validators.required],
    ownerAddress: ['', Validators.required],
    ownerCity: ['', Validators.required],
    ownerRegion: ['', Validators.required],
  });
}
