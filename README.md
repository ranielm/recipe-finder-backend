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

## Set up the environment variables:

Copy the .env.sample file to a new file named .env and update the variables to match your local setup.

```bash
cp .env.sample .env
```

### Run the development server:

```bash
yarn start
```

## API Endpoints

The following endpoints are available:

- `GET /recipes` - Retrieve all recipes.
- `GET /recipes/:id` - Retrieve a single recipe by its ID.
- `POST /recipes` - Create a new recipe:

```bash
http://localhost:5000/api/recipes
{
  "title": "Chocolate Cake",
  "description": "Rich and moist chocolate cake with a silky chocolate ganache.",
  "ingredients": [
    { "name": "all-purpose flour", "quantity": "200g" },
    { "name": "sugar", "quantity": "100g" },
    { "name": "cocoa powder", "quantity": "50g" }
	]
}
```

![Create a new recipe](/assets/image.png)

- `PUT /recipes/:id` - Update an existing recipe.
- `DELETE /recipes/:id` - Delete a recipe.
- `GET /recipes/search` - Search for recipes by ingredients:

```bash
http://localhost:5000/api/recipes/search?ingredients=garlic,broccoli
```

## Built With

- **Node.js** - The JavaScript runtime environment.
- **Express** - Web framework for Node.js.
- **TypeScript** - Typed superset of JavaScript.
- **MySQL** - Open-source relational database management system.

## Development Timeline

This project was initiated and advanced to its current state as a result of a 4-hour coding challenge, during which the fundamental functionalities were established. Nonetheless, it is important to note that this version serves primarily as a prototype. The full-fledged application, with comprehensive features and enhancements, will be developed in a new project, separate from this initial challenge. Updates and progress on the new project will be shared as they occur.

https://github.com/ranielm/recipe-finder-backend-complete
