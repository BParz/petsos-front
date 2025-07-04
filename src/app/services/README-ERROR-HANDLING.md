# Sistema de Manejo de Errores - PetSOS

Este documento explica cómo usar el sistema completo de manejo de errores implementado en PetSOS.

## 🏗️ **Arquitectura del Sistema**

### **1. Interceptores HTTP**
- **`AuthInterceptor`**: Agrega automáticamente el token de autenticación a todas las requests
- **`ErrorInterceptor`**: Maneja errores HTTP globalmente y muestra mensajes apropiados

### **2. Servicios**
- **`ErrorHandlerService`**: Servicio centralizado para manejo de errores
- **`LoadingService`**: Servicio para manejar estados de carga global

### **3. Componentes**
- **`Loading`**: Componente de loading global
- **SnackBars**: Mensajes de error, éxito, advertencia e información

## 🚀 **Uso del Sistema**

### **Manejo Automático de Errores**

Los interceptores manejan automáticamente los errores HTTP más comunes:

```typescript
// No necesitas hacer nada especial en tus componentes
this.authService.register(userData).subscribe({
  next: (response) => {
    // Éxito
  },
  error: (error) => {
    // El interceptor ya manejó el error y mostró el mensaje
  }
});
```

### **Manejo Manual de Errores**

Para casos específicos, usa el `ErrorHandlerService`:

```typescript
import { ErrorHandlerService } from '../services/error-handler.service';

constructor(private errorHandler: ErrorHandlerService) {}

// Manejar error HTTP
this.errorHandler.handleHttpError(error, 'Mensaje personalizado');

// Mostrar mensajes específicos
this.errorHandler.showSuccess('Operación exitosa');
this.errorHandler.showError('Algo salió mal');
this.errorHandler.showWarning('Advertencia');
this.errorHandler.showInfo('Información');

// Log de errores para debugging
this.errorHandler.logError(error, 'Contexto del error');
```

### **Loading Global**

El sistema de loading se maneja automáticamente, pero puedes controlarlo manualmente:

```typescript
import { LoadingService } from '../services/loading.service';

constructor(private loadingService: LoadingService) {}

// Mostrar loading
this.loadingService.show('Procesando...');

// Ocultar loading
this.loadingService.hide();

// Forzar ocultamiento (útil en errores)
this.loadingService.forceHide();
```

## 📋 **Tipos de Errores Manejados**

### **Errores HTTP**
- **400**: Datos inválidos
- **401**: No autorizado (auto-logout)
- **403**: Acceso denegado
- **404**: Recurso no encontrado
- **409**: Conflicto (recurso ya existe)
- **422**: Datos de entrada inválidos
- **500**: Error interno del servidor
- **503**: Servicio no disponible

### **Errores de Red**
- Conexión perdida
- Timeout
- Errores de DNS

### **Errores de Validación**
- Campos requeridos
- Formatos inválidos
- Contraseñas que no coinciden

## 🎨 **Estilos de SnackBars**

El sistema incluye diferentes estilos para diferentes tipos de mensajes:

- **Error**: Rojo (#f44336)
- **Warning**: Naranja (#ff9800)
- **Success**: Verde (#4caf50)
- **Info**: Azul (#2196f3)

## 🔧 **Configuración**

### **Interceptores Automáticos**

Los interceptores se configuran automáticamente en `app.config.ts`:

```typescript
provideHttpClient(
  withInterceptorsFromDi(),
  withInterceptors([AuthInterceptor, ErrorInterceptor])
)
```

### **Loading Global**

El componente de loading se incluye automáticamente en `app.html`:

```html
<app-loading
  [isLoading]="(loadingService.loading$ | async)?.isLoading || false"
  [message]="(loadingService.loading$ | async)?.message || 'Cargando...'">
</app-loading>
```

## 📝 **Ejemplos de Uso**

### **Registro de Usuario**
```typescript
onSubmit() {
  if (this.registroForm.valid) {
    this.isLoading = true;

    this.authService.register(userData).subscribe({
      next: (response) => {
        this.errorHandler.showSuccess('¡Registro exitoso!');
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorHandler.logError(error, 'Registro de usuario');
        // El interceptor ya manejó el error
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
```

### **Manejo de Errores Específicos**
```typescript
try {
  // Código que puede fallar
} catch (error) {
  this.errorHandler.showError('Error específico: ' + error.message);
  this.errorHandler.logError(error, 'Operación específica');
}
```

## 🛠️ **Personalización**

### **Mensajes Personalizados**
```typescript
// En el ErrorHandlerService, puedes agregar más casos
handleHttpError(error: HttpErrorResponse, customMessage?: string): void {
  // Tu lógica personalizada aquí
}
```

### **Estilos Personalizados**
```scss
// En styles.scss, puedes modificar los colores
.error-snackbar {
  background: tu-color-personalizado !important;
}
```

## 🔍 **Debugging**

### **Logs Automáticos**
Todos los errores se logean automáticamente en la consola con contexto:
- URL de la request
- Método HTTP
- Código de estado
- Mensaje de error
- Error completo

### **Logs Manuales**
```typescript
this.errorHandler.logError(error, 'Contexto específico');
```

## 📚 **Mejores Prácticas**

1. **Usa el sistema automático** cuando sea posible
2. **Personaliza mensajes** solo cuando sea necesario
3. **Logea errores** para debugging
4. **Maneja estados de loading** apropiadamente
5. **Proporciona feedback** claro al usuario
6. **Mantén consistencia** en los mensajes de error

## 🚨 **Casos Especiales**

### **Errores de Autenticación (401)**
- Se maneja automáticamente
- Limpia datos de sesión
- Redirige al home

### **Errores de Red**
- Reintento automático (1 vez)
- Mensaje claro sobre problemas de conexión

### **Errores de Validación**
- Extracción automática de mensajes del servidor
- Fallback a mensajes genéricos