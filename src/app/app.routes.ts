import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home').then(m => m.Home)
    },
    {
        path: 'generar-qr',
        loadComponent: () => import('./pages/generar-qr/generar-qr').then(m => m.GenerarQr)
    },
    {
        path: 'registro-pet',
        loadComponent: () => import('./pages/registro-pet/registro-pet').then(m => m.RegistroPet)
    },
    {
        path: 'mascotas',
        loadComponent: () => import('./pages/mascotas/mascotas').then(m => m.Mascotas)
    },
    {
        path: 'registro-usuario',
        loadComponent: () => import('./pages/registro-usuario/registro-usuario').then(m => m.RegistroUsuario)
    }
];
