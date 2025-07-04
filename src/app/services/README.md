# Servicio de Autenticación - PetSOS

## Configuración del Backend

El servicio de autenticación está configurado para conectarse con tu backend. Para configurar la URL correcta:

### 1. Editar la URL del Backend

Abre el archivo `src/app/services/auth.service.ts` y modifica la línea:

```typescript
private apiUrl = 'http://localhost:3000/api'; // Cambia esta URL por la de tu backend
```

Reemplaza `http://localhost:3000/api` con la URL de tu servidor backend.

### 2. Endpoints Esperados

El servicio espera que tu backend tenga los siguientes endpoints:

#### POST /api/auth/register
Registra un nuevo usuario.

**Body:**
```json
{
  "nombre": "string",
  "email": "string",
  "password": "string",
  "telefono": "string (opcional)",
  "direccion": "string (opcional)"
}
```

**Response:**
```json
{
  "id": "number",
  "nombre": "string",
  "email": "string",
  "telefono": "string",
  "direccion": "string",
  "token": "string"
}
```

#### POST /api/auth/login
Inicia sesión de un usuario.

**Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "id": "number",
  "nombre": "string",
  "email": "string",
  "telefono": "string",
  "direccion": "string",
  "token": "string"
}
```

### 3. Manejo de Errores

El servicio maneja los siguientes códigos de error:

- **400**: Datos inválidos
- **409**: Email ya registrado
- **500**: Error del servidor

### 4. Almacenamiento Local

El servicio guarda automáticamente:
- Token de autenticación
- Datos del usuario

Estos se almacenan en `localStorage` y se pueden acceder usando los métodos:
- `getToken()`
- `getUserData()`
- `isAuthenticated()`

### 5. Ejemplo de Uso

```typescript
// En tu componente
constructor(private authService: AuthService) {}

registerUser() {
  const userData = {
    nombre: 'Juan Pérez',
    email: 'juan@ejemplo.com',
    password: '123456',
    telefono: '+56 9 1234 5678'
  };

  this.authService.register(userData).subscribe({
    next: (response) => {
      console.log('Usuario registrado:', response);
      // El token y datos se guardan automáticamente
    },
    error: (error) => {
      console.error('Error en registro:', error);
    }
  });
}
```