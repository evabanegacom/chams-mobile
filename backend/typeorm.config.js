// module.exports = {
//   "type": "mysql",
//   "host": "localhost",
//   "port": 3306,
//   "username": "desert-storm",
//   "password": "precious",
//   "database": "nestjs",
//   "entities": ["src/**/*.entity.ts"],
//   "synchronize": true,
//   "autoLoadEntities": true
// }

module.exports = {
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [TodoEntity], // or [__dirname + '/**/*.entity{.ts,.js}']
  synchronize: true,
};

