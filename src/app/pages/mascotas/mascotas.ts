import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-mascotas',
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule
    ],
    templateUrl: './mascotas.html',
    styleUrl: './mascotas.scss'
})
export class Mascotas {
    // Datos de ejemplo para las mascotas
    mascotas = [
        {
            id: 1,
            nombre: 'Luna',
            tipo: 'Perro',
            raza: 'Golden Retriever',
            color: 'Dorado',
            genero: 'Hembra',
            fechaNacimiento: '2020-03-15',
            imagen: 'assets/images/luna.jpg'
        },
        {
            id: 2,
            nombre: 'Mittens',
            tipo: 'Gato',
            raza: 'Siamés',
            color: 'Blanco y marrón',
            genero: 'Macho',
            fechaNacimiento: '2021-07-22',
            imagen: 'assets/images/mittens.jpg'
        }
    ];

    getEdad(fechaNacimiento: string): string {
        const fecha = new Date(fechaNacimiento);
        const hoy = new Date();
        const edad = hoy.getFullYear() - fecha.getFullYear();
        return `${edad} años`;
    }
}