import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
    const snackBar = inject(MatSnackBar);
    const router = inject(Router);
    const authService = inject(AuthService);

    return next(req).pipe(
        retry(1), // Reintentar una vez en caso de error de red
        catchError((error: HttpErrorResponse) => {
            let errorMessage = 'Ha ocurrido un error inesperado';

            if (error.error instanceof ErrorEvent) {
                // Error del lado del cliente
                errorMessage = `Error: ${error.error.message}`;
            } else {
                // Error del lado del servidor
                switch (error.status) {
                    case 400:
                        errorMessage = handle400Error(error);
                        break;
                    case 401:
                        errorMessage = 'No autorizado. Por favor, inicia sesión nuevamente.';
                        handle401Error(authService, router);
                        break;
                    case 403:
                        errorMessage = 'Acceso denegado. No tienes permisos para realizar esta acción.';
                        break;
                    case 404:
                        errorMessage = 'Recurso no encontrado.';
                        break;
                    case 409:
                        errorMessage = handle409Error(error);
                        break;
                    case 422:
                        errorMessage = handle422Error(error);
                        break;
                    case 500:
                        errorMessage = 'Error interno del servidor. Inténtalo más tarde.';
                        break;
                    case 503:
                        errorMessage = 'Servicio temporalmente no disponible. Inténtalo más tarde.';
                        break;
                    default:
                        errorMessage = `Error ${error.status}: ${error.message}`;
                }
            }

            // Mostrar mensaje de error
            showErrorSnackBar(snackBar, errorMessage);

            // Log del error para debugging
            console.error('Error en request:', {
                url: req.url,
                method: req.method,
                status: error.status,
                message: errorMessage,
                error: error
            });

            return throwError(() => error);
        })
    );
};

function handle400Error(error: HttpErrorResponse): string {
    if (error.error && error.error.message) {
        return error.error.message;
    }
    if (error.error && error.error.errors) {
        const errors = error.error.errors;
        if (Array.isArray(errors)) {
            return errors.join(', ');
        }
    }
    return 'Datos inválidos. Verifica la información ingresada.';
}

function handle401Error(authService: AuthService, router: Router): void {
    // Limpiar datos de autenticación
    authService.logout();
    // Redirigir al login
    router.navigate(['/']);
}

function handle409Error(error: HttpErrorResponse): string {
    if (error.error && error.error.message) {
        return error.error.message;
    }
    return 'El recurso ya existe.';
}

function handle422Error(error: HttpErrorResponse): string {
    if (error.error && error.error.message) {
        return error.error.message;
    }
    if (error.error && error.error.errors) {
        const errors = error.error.errors;
        if (Array.isArray(errors)) {
            return errors.join(', ');
        }
    }
    return 'Datos de entrada inválidos.';
}

function showErrorSnackBar(snackBar: MatSnackBar, message: string): void {
    snackBar.open(message, 'Cerrar', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
    });
}