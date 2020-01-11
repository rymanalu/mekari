# Mekari Todo List App

## Installation

### Server Requirements

This app has a few system requirements:

- [Laravel 5.2 Requirements](https://laravel.com/docs/5.2/installation#server-requirements)
- [Node.js](https://nodejs.org/en/) (>= v10) and NPM (>= v6)

### Installing

```
mekari $ cp .env.example .env # Create .env from example
mekari $ nano .env # Change your configuration, such as: database connection, app url, etc
mekari $ composer install # Install Laravel dependencies
mekari $ php artisan migrate # Create new tables in DB
mekari $ npm install # Install front-end dependencies
mekari $ npm run prod # Compile front-end assets
```
