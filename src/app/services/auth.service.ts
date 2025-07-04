import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UserRegistration {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserResponse {
    id: number;
    nombre: string;
    email: string;
    telefono?: string;
    direccion?: string;
    token?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    // Registrar nuevo usuario
    register(userData: UserRegistration): Observable<UserResponse> {
        return this.http.post<UserResponse>(`${this.apiUrl}/auth/register`, userData);
    }

    // Iniciar sesión
    login(credentials: UserLogin): Observable<UserResponse> {
        return this.http.post<UserResponse>(`${this.apiUrl}/auth/login`, credentials);
    }

    // Verificar si el usuario está autenticado
    isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return !!token;
    }

    // Obtener token del localStorage
    getToken(): string | null {
        return localStorage.getItem('token');
    }

    // Guardar datos del usuario en localStorage
    saveUserData(userData: UserResponse): void {
        localStorage.setItem('token', userData.token || '');
        localStorage.setItem('user', JSON.stringify(userData));
    }

    // Obtener datos del usuario del localStorage
    getUserData(): UserResponse | null {
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;
    }

    // Cerrar sesión
    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
}