import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';
import { AuthService, UserRegistration } from '../../services/auth.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
    selector: 'app-registro-usuario',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        RouterModule
    ],
    templateUrl: './registro-usuario.html',
    styleUrls: ['./registro-usuario.scss']
})
export class RegistroUsuario {
    registroForm: FormGroup;
    isLoading = false;
    hidePassword = true;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private errorHandler: ErrorHandlerService
    ) {
        this.registroForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(2)]],
            lastName: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]]
        }, { validators: this.passwordMatchValidator });
    }

    // Validador personalizado para verificar que las contraseñas coincidan
    passwordMatchValidator(form: FormGroup) {
        const password = form.get('password');
        const confirmPassword = form.get('confirmPassword');

        if (password && confirmPassword && password.value !== confirmPassword.value) {
            confirmPassword.setErrors({ passwordMismatch: true });
            return { passwordMismatch: true };
        }

        if (confirmPassword && confirmPassword.errors) {
            delete confirmPassword.errors['passwordMismatch'];
            if (Object.keys(confirmPassword.errors).length === 0) {
                confirmPassword.setErrors(null);
            }
        }

        return null;
    }

    onSubmit() {
        if (this.registroForm.valid) {
            this.isLoading = true;

            const userData: UserRegistration = {
                firstName: this.registroForm.value.firstName,
                lastName: this.registroForm.value.lastName,
                email: this.registroForm.value.email,
                password: this.registroForm.value.password
            };

            this.authService.register(userData).subscribe({
                next: (response) => {
                    this.authService.saveUserData(response);
                    this.errorHandler.showSuccess('¡Registro exitoso! Bienvenido a PetSOS');
                    this.router.navigate(['/']);
                },
                error: (error) => {
                    this.errorHandler.logError(error, 'Registro de usuario');
                    this.errorHandler.handleHttpError(error, 'Error en el registro. Inténtalo de nuevo.');
                    this.isLoading = false;
                },
                complete: () => {
                    this.isLoading = false;
                }
            });
        } else {
            this.markFormGroupTouched();
        }
    }

    // Marcar todos los campos como tocados para mostrar errores
    markFormGroupTouched() {
        Object.keys(this.registroForm.controls).forEach(key => {
            const control = this.registroForm.get(key);
            control?.markAsTouched();
        });
    }

    // Getters para facilitar el acceso a los campos del formulario
    get firstName() { return this.registroForm.get('firstName'); }
    get lastName() { return this.registroForm.get('lastName'); }
    get email() { return this.registroForm.get('email'); }
    get password() { return this.registroForm.get('password'); }
    get confirmPassword() { return this.registroForm.get('confirmPassword'); }
}