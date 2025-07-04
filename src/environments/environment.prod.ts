export const environment = {
    production: true,
    apiUrl: 'https://api.petsos.com/api', // Cambia esta URL por tu API de producción
    appName: 'PetSOS',
    version: '1.0.0',
    debug: false,
    // Configuraciones adicionales para producción
    features: {
        enableDebugLogs: false,
        enableMockData: false,
        enableAnalytics: true
    },
    // Configuraciones de seguridad para producción
    security: {
        tokenExpirationTime: 2 * 60 * 60 * 1000, // 2 horas en milisegundos (más restrictivo)
        refreshTokenEnabled: true
    },
    // Configuraciones de la aplicación
    app: {
        defaultLanguage: 'es',
        supportedLanguages: ['es', 'en'],
        maxFileSize: 5 * 1024 * 1024, // 5MB
        allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif']
    }
};