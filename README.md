# Recipe Management API

This is a simple Recipe Management API built with Node.js, Express, and TypeScript, interfacing with a MySQL database. It allows for basic CRUD operations on recipes.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- Node.js
- npm or yarn
- MySQL

### Installing

A step-by-step series of examples that tell you how to get a development env running:

First, clone the repository to your local machine:

```bash
git clone https://your-repository-url-here.git
cd your-repository-name
```

### Install the dependencies:

```bash
yarn
```

### Set up your MySQL database and create a .env file with the necessary environment variables:
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_DATABASE=recipes_db

### Run the development server:

```bash
yarn start
```

## API Endpoints

The following endpoints are available:

- `GET /recipes` - Retrieve all recipes.
- `GET /recipes/:id` - Retrieve a single recipe by its ID.
- `POST /recipes` - Create a new recipe.
- `PUT /recipes/:id` - Update an existing recipe.
- `DELETE /recipes/:id` - Delete a recipe.

## Built With

- **Node.js** - The JavaScript runtime environment.
- **Express** - Web framework for Node.js.
- **TypeScript** - Typed superset of JavaScript.
- **MySQL** - Open-source relational database management system.
