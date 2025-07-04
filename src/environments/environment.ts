export const environment = {
    production: false,
    apiUrl: 'http://localhost:3000',
    appName: 'PetSOS - Desarrollo',
    version: '1.0.0',
    debug: true,
    // Configuraciones adicionales para desarrollo
    features: {
        enableDebugLogs: true,
        enableMockData: false,
        enableAnalytics: false
    },
    // Configuraciones de seguridad para desarrollo
    security: {
        tokenExpirationTime: 24 * 60 * 60 * 1000, // 24 horas en milisegundos
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