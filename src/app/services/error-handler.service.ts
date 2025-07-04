import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

export interface ErrorInfo {
    message: string;
    type: 'error' | 'warning' | 'info';
    duration?: number;
    action?: string;
}

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {

    constructor(private snackBar: MatSnackBar) { }

    /**
     * Maneja errores HTTP de manera centralizada
     */
    handleHttpError(error: HttpErrorResponse, customMessage?: string): void {
        let message = customMessage || 'Ha ocurrido un error inesperado';

        if (error.error instanceof ErrorEvent) {
            // Error del lado del cliente
            message = `Error de conexión: ${error.error.message}`;
        } else {
            // Error del lado del servidor
            switch (error.status) {
                case 0:
                    message = 'No se puede conectar con el servidor. Verifica tu conexión a internet.';
                    break;
                case 400:
                    message = this.extractErrorMessage(error) || 'Datos inválidos. Verifica la información.';
                    break;
                case 401:
                    message = 'Sesión expirada. Por favor, inicia sesión nuevamente.';
                    break;
                case 403:
                    message = 'No tienes permisos para realizar esta acción.';
                    break;
                case 404:
                    message = 'El recurso solicitado no fue encontrado.';
                    break;
                case 409:
                    message = this.extractErrorMessage(error) || 'El recurso ya existe.';
                    break;
                case 422:
                    message = this.extractErrorMessage(error) || 'Datos de entrada inválidos.';
                    break;
                case 500:
                    message = 'Error interno del servidor. Inténtalo más tarde.';
                    break;
                case 503:
                    message = 'Servicio temporalmente no disponible. Inténtalo más tarde.';
                    break;
                default:
                    message = `Error ${error.status}: ${error.message}`;
            }
        }

        this.showError(message);
    }

    /**
     * Maneja errores de validación de formularios
     */
    handleValidationError(fieldName: string, errorType: string): string {
        const errorMessages: { [key: string]: { [key: string]: string } } = {
            firstName: {
                required: 'El nombre es requerido',
                minlength: 'El nombre debe tener al menos 2 caracteres'
            },
            lastName: {
                required: 'El apellido es requerido',
                minlength: 'El apellido debe tener al menos 2 caracteres'
            },
            email: {
                required: 'El email es requerido',
                email: 'Ingresa un email válido'
            },
            password: {
                required: 'La contraseña es requerida',
                minlength: 'La contraseña debe tener al menos 6 caracteres'
            },
            confirmPassword: {
                required: 'Confirma tu contraseña',
                passwordMismatch: 'Las contraseñas no coinciden'
            }
        };

        return errorMessages[fieldName]?.[errorType] || 'Campo inválido';
    }

    /**
     * Maneja errores de red
     */
    handleNetworkError(): void {
        this.showError('Error de conexión. Verifica tu conexión a internet.', 'warning');
    }

    /**
     * Maneja errores de timeout
     */
    handleTimeoutError(): void {
        this.showError('La operación tardó demasiado. Inténtalo nuevamente.', 'warning');
    }

    /**
     * Muestra un mensaje de error
     */
    showError(message: string, type: 'error' | 'warning' | 'info' = 'error', duration: number = 5000): void {
        const panelClass = this.getPanelClass(type);

        this.snackBar.open(message, 'Cerrar', {
            duration,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass
        });
    }

    /**
     * Muestra un mensaje de éxito
     */
    showSuccess(message: string, duration: number = 3000): void {
        this.snackBar.open(message, 'Cerrar', {
            duration,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
        });
    }

    /**
     * Muestra un mensaje de información
     */
    showInfo(message: string, duration: number = 4000): void {
        this.snackBar.open(message, 'Cerrar', {
            duration,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['info-snackbar']
        });
    }

    /**
     * Extrae el mensaje de error del response del servidor
     */
    private extractErrorMessage(error: HttpErrorResponse): string | null {
        if (error.error && error.error.message) {
            return error.error.message;
        }
        if (error.error && error.error.error) {
            return error.error.error;
        }
        if (error.error && error.error.errors) {
            const errors = error.error.errors;
            if (Array.isArray(errors)) {
                return errors.join(', ');
            }
            if (typeof errors === 'object') {
                return Object.values(errors).join(', ');
            }
        }
        return null;
    }

    /**
     * Obtiene la clase CSS para el tipo de mensaje
     */
    private getPanelClass(type: 'error' | 'warning' | 'info'): string[] {
        switch (type) {
            case 'error':
                return ['error-snackbar'];
            case 'warning':
                return ['warning-snackbar'];
            case 'info':
                return ['info-snackbar'];
            default:
                return ['error-snackbar'];
        }
    }

    /**
     * Log del error para debugging
     */
    logError(error: any, context?: string): void {
        console.error(`Error${context ? ` en ${context}` : ''}:`, error);
    }
}