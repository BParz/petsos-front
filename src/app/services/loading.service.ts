import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface LoadingState {
    isLoading: boolean;
    message?: string;
}

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    private loadingSubject = new BehaviorSubject<LoadingState>({ isLoading: false });
    public loading$ = this.loadingSubject.asObservable();

    private requestCount = 0;

    /**
     * Muestra el loading global
     */
    show(message?: string): void {
        this.requestCount++;
        this.loadingSubject.next({ isLoading: true, message });
    }

    /**
     * Oculta el loading global
     */
    hide(): void {
        this.requestCount = Math.max(0, this.requestCount - 1);

        if (this.requestCount === 0) {
            this.loadingSubject.next({ isLoading: false });
        }
    }

    /**
     * Fuerza el ocultamiento del loading (útil para errores)
     */
    forceHide(): void {
        this.requestCount = 0;
        this.loadingSubject.next({ isLoading: false });
    }

    /**
     * Obtiene el estado actual del loading
     */
    getCurrentState(): LoadingState {
        return this.loadingSubject.value;
    }

    /**
     * Verifica si está cargando
     */
    isLoading(): boolean {
        return this.loadingSubject.value.isLoading;
    }
}