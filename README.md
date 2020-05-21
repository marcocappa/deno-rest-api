# Deno Rest API

This is a basic example of a REST API using deno (https://deno.land/)

# Install deno

See instructions here: https://deno.land/#installation

# How to run

Clone this repo and run the command:

```
deno run --allow-net server.ts
```

# Endpoints

| Method | Endpoints            | Description          |
| ------ | -------------------- | -------------------- |
| GET    | /api/v1/products     | Get all products     |
| GET    | /api/v1/products/:id | Get product by id    |
| POST   | /api/v1/products     | Add new product      |
| PUT    | /api/v1/products/:id | Update product by id |
| DELETE | /api/v1/products/:id | Delete product by id |
