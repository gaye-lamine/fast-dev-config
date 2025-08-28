import chalk from 'chalk';

export const log = {
    success: (message) => console.log(chalk.green('✅ ' + message)),
    error: (message) => console.log(chalk.red('❌ ' + message)),
    warning: (message) => console.log(chalk.yellow('⚠️  ' + message)),
    info: (message) => console.log(chalk.blue('ℹ️  ' + message)),
    title: (message) => console.log(chalk.bold.cyan('\n🚀 ' + message + '\n'))
};

export const validateCompatibility = (language, database, framework) => {
    const incompatibilities = [];
    
    if (language === 'PHP' && database === 'MongoDB' && framework === 'Laravel') {
        incompatibilities.push('Laravel avec MongoDB nécessite des packages supplémentaires');
    }
    
    if (database === 'Firebase' && !['Node.js', 'Python', 'Java'].includes(language)) {
        incompatibilities.push('Firebase est mieux supporté avec Node.js, Python ou Java');
    }
    
    return incompatibilities;
};

export const getFrameworkDependencies = (language, framework) => {
    const deps = {
        'Node.js': {
            'Express': ['express', 'cors', 'helmet', 'morgan'],
            'NestJS': ['@nestjs/core', '@nestjs/common', '@nestjs/platform-express'],
            'Fastify': ['fastify', '@fastify/cors'],
            'Koa': ['koa', 'koa-router', 'koa-cors']
        },
        'Python': {
            'Django': ['Django', 'djangorestframework', 'python-decouple'],
            'Flask': ['Flask', 'Flask-CORS', 'python-decouple'],
            'FastAPI': ['fastapi', 'uvicorn', 'python-decouple']
        },
        'PHP': {
            'Laravel': ['laravel/framework', 'vlucas/phpdotenv'],
            'Symfony': ['symfony/framework-bundle', 'symfony/dotenv']
        },
        'Java': {
            'Spring Boot': ['spring-boot-starter-web', 'spring-boot-starter-data-jpa']
        }
    };
    
    return deps[language]?.[framework] || [];
};