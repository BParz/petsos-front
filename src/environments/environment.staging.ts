export const environment = {
    production: false,
    apiUrl: 'https://staging-api.petsos.com/api', // Cambia esta URL por tu API de staging
    appName: 'PetSOS - Staging',
    version: '1.0.0',
    debug: true,
    // Configuraciones adicionales para staging
    features: {
        enableDebugLogs: true,
        enableMockData: false,
        enableAnalytics: false
    },
    // Configuraciones de seguridad para staging
    security: {
        tokenExpirationTime: 12 * 60 * 60 * 1000, // 12 horas en milisegundos
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