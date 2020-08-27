module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: './data/expat-journal.db3' },
    useNullAsDefault: true,
    migrations: { directory: './data/migrations' },
    seeds: { directory: './data/seeds' }
  },
  testing: {
    client: 'sqlite3',
    connection: { filename: './data/test.db3' },
    useNullAsDefault: true,
    migrations: { directory: './data/migrations' },
    seeds: { directory: './data/seeds' }
  },
  production: {
    client: 'postgresql',
    connection: {
      database: 'ddp887n5epdnbe',
      user:     'ttzthvqclsqydf',
      password: '428e1d885ac9d2ae32e9e8ee3f2b350bd2f9a6f7eea3df0586226cbd0f0be142'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
