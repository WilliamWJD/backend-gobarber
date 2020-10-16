module.exports = [
    {
        "name": "default",
        "type": "postgres",
        "host": process.env.DB_HOST,
        "port": process.env.DB_PORT,
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "entities": [
          "./src/modules/**/infra/typeorm/entities/*.ts"
        ],
        "migrations": [
          "./src/shared/infra/typeorm/migrations/*.ts"
        ],
        "cli": {
          "migrationsDir": "./src/shared/infra/typeorm/migrations"
        }
    },
    {
        "name": "mongo",
        "type": "mongodb",
        "host": process.env.DB_MONGO_HOST,
        "port": process.env.DB_MONGO_PORT,
        "database": process.env.DB_MONGO_NAME,
        "useUnifiedTopology":true,
        "entities": [
          "./src/modules/**/infra/typeorm/schemas/*.ts"
        ],
    }
]
