# Despliegue a GitHub Pages

Este proyecto está configurado para desplegarse automáticamente a GitHub Pages.

## Configuración Automática (Recomendado)

El proyecto utiliza GitHub Actions para desplegar automáticamente cuando se hace push a la rama `main` o `master`.

### Pasos para activar el despliegue automático:

1. **Habilitar GitHub Pages en tu repositorio:**
   - Ve a Settings > Pages
   - En "Source", selecciona "GitHub Actions"

2. **Hacer push de los cambios:**
   ```bash
   git add .
   git commit -m "Configurar despliegue a GitHub Pages"
   git push origin main
   ```

3. **Verificar el despliegue:**
   - Ve a la pestaña "Actions" en tu repositorio
   - El workflow "Deploy to GitHub Pages" se ejecutará automáticamente
   - Una vez completado, tu aplicación estará disponible en: `https://TU_USUARIO.github.io/petsos-front/`

## Despliegue Manual

Si prefieres hacer el despliegue manualmente:

### Opción 1: Usando el script de npm
```bash
# Reemplaza TU_USUARIO con tu nombre de usuario de GitHub
npm run deploy:prod
```

### Opción 2: Usando angular-cli-ghpages directamente
```bash
# Construir el proyecto
npm run build:prod

# Desplegar
npx angular-cli-ghpages --dir=dist/petsos-front/browser --base-href=/petsos-front/
```

## Configuración del Base Href

El proyecto está configurado para usar `/petsos-front/` como base href, lo cual es necesario para GitHub Pages cuando el repositorio no es el repositorio principal del usuario.

Si cambias el nombre del repositorio, actualiza:
1. El `baseHref` en `angular.json`
2. Los scripts de despliegue en `package.json`
3. La URL en el workflow de GitHub Actions

## Solución de Problemas

### Error de dependencias
Si encuentras errores de dependencias, usa:
```bash
npm install --legacy-peer-deps
```

### Error de permisos
Si el despliegue falla por permisos:
1. Ve a Settings > Actions > General
2. Asegúrate de que "Workflow permissions" esté configurado en "Read and write permissions"

### Página en blanco
Si la página aparece en blanco:
1. Verifica que el `baseHref` esté configurado correctamente
2. Revisa la consola del navegador para errores
3. Asegúrate de que las rutas estén configuradas correctamente para el base href

## URLs de Despliegue

- **Desarrollo:** `https://TU_USUARIO.github.io/petsos-front/`
- **Producción:** `https://TU_USUARIO.github.io/petsos-front/`

## Notas Importantes

- GitHub Pages solo sirve contenido estático
- Las llamadas a APIs deben estar configuradas para funcionar en producción
- El proyecto debe estar en una rama pública para usar GitHub Pages gratuito
- Los cambios pueden tardar unos minutos en aparecer después del despliegue