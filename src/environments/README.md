# Configuraciones de Entorno - PetSOS

Este directorio contiene las configuraciones para diferentes entornos de la aplicación.

## 📁 Archivos de Configuración

### 🔧 `environment.ts` - Desarrollo Local
- **URL del API**: `http://localhost:3000/api`
- **Debug**: Habilitado
- **Logs**: Detallados
- **Analytics**: Deshabilitado

### 🧪 `environment.staging.ts` - Staging/Testing
- **URL del API**: `https://staging-api.petsos.com/api`
- **Debug**: Habilitado
- **Logs**: Detallados
- **Analytics**: Deshabilitado

### 🚀 `environment.prod.ts` - Producción
- **URL del API**: `https://api.petsos.com/api`
- **Debug**: Deshabilitado
- **Logs**: Mínimos
- **Analytics**: Habilitado

## 🛠️ Comandos para Diferentes Entornos

### Desarrollo Local
```bash
# Servir en modo desarrollo
ng serve

# Construir para desarrollo
ng build
```

### Staging
```bash
# Servir en modo staging
ng serve --configuration=staging

# Construir para staging
ng build --configuration=staging
```

### Producción
```bash
# Servir en modo producción
ng serve --configuration=production

# Construir para producción
ng build --configuration=production
```

## 🔄 Cómo Funciona

Angular automáticamente reemplaza el archivo `environment.ts` con el archivo correspondiente al entorno seleccionado:

- **Desarrollo**: Usa `environment.ts`
- **Staging**: Reemplaza con `environment.staging.ts`
- **Producción**: Reemplaza con `environment.prod.ts`

## 📝 Configuración de URLs

### Para Cambiar las URLs del Backend

1. **Desarrollo Local** (`environment.ts`):
   ```typescript
   apiUrl: 'http://localhost:3000/api'
   ```

2. **Staging** (`environment.staging.ts`):
   ```typescript
   apiUrl: 'https://staging-api.petsos.com/api'
   ```

3. **Producción** (`environment.prod.ts`):
   ```typescript
   apiUrl: 'https://api.petsos.com/api'
   ```

## 🔧 Uso en el Código

```typescript
import { environment } from '../environments/environment';

// Usar la URL del API
const apiUrl = environment.apiUrl;

// Verificar si está en producción
if (environment.production) {
  // Código específico para producción
}

// Habilitar logs solo en desarrollo
if (environment.debug) {
  console.log('Debug info');
}
```

## 🚀 Despliegue

### Para Desplegar en Producción
```bash
# Construir para producción
ng build --configuration=production

# Los archivos se generan en dist/petsos-front/
```

### Para Desplegar en Staging
```bash
# Construir para staging
ng build --configuration=staging

# Los archivos se generan en dist/petsos-front/
```

## 🔒 Configuraciones de Seguridad

Cada entorno tiene configuraciones de seguridad específicas:

- **Desarrollo**: Token válido por 24 horas
- **Staging**: Token válido por 12 horas
- **Producción**: Token válido por 2 horas

## 📊 Configuraciones de Analytics

- **Desarrollo/Staging**: Analytics deshabilitado
- **Producción**: Analytics habilitado

## 🎯 Configuraciones de la Aplicación

Todos los entornos comparten las mismas configuraciones de aplicación:

- **Idioma por defecto**: Español
- **Idiomas soportados**: Español, Inglés
- **Tamaño máximo de archivo**: 5MB
- **Tipos de archivo permitidos**: JPEG, PNG, GIF