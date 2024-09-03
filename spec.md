# API SPecification

## Register

Endpoint: POST http://localhost:3000/register

### Request:

Headers:

- Content-Type: 'application/json'

Body: { email: 'string', password: 'string' }

Example:

```json
{
  "email": "test@mail.com",
  "password": "rahsia"
}
```

### Response

Status Code: 201
Content-Type: 'application/json'
Body:

```json
{
  "id": 1,
  "email": "test@mail.com",
  "password": "hashed password",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

## Login

Endpoint: POST http://localhost:3000/login

### Request

Headers:

- Content-Type: 'application/json'

Body: { email: 'string', password: 'string' }

Example:

```json
{
  "email": "test@mail.com",
  "password": "rahsia"
}
```

### Response

Status Code: 200
Content-Type: 'application/json'
Body:

```json
{
  "token": "jwt string"
}
```

## Get All Todos

Endpoint: GET http://localhost:3000/todos

### Request

Headers:

- Content-Type: 'application/json'
- Authorization: Bearer token

### Response

Status Code: 200
Body:

```json
[
  {
    "id": 1,
    "task": "Belajar nodejs",
    "UserId": 1,
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  },
  {
    "id": 2,
    "task": "Belajar react",
    "UserId": 1,
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  },
  ...
]
```

## Get single todo

Endpoint: GET http://localhost:3000/todos/{id}

### Request

Params:

- id : number

Headers:

- Content-Type: 'application/json'
- Authorization: Bearer token

### Response

Status Code: 200
Body:

```json
{
  "id": 1,
  "task": "Belajar nodejs",
  "UserId": 1,
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
},
```

## Create new todo

Endpoint: POST http://localhost:3000/todos

### Request

Headers:

- Content-Type: 'application/json'
- Authorization: Bearer token

Body:

```json
{
  "task": "Belajar nodejs",
  "UserId": 1
},
```

### Response

Status Code: 201
Body:

```json
{
  "id": 1,
  "task": "Belajar nodejs",
  "UserId": 1,
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
},
```

## Update todo

Endpoint: PUT http://localhost:3000/todos/{id}

### Request

Params:

- id: number

Headers:

- Content-Type: 'application/json'
- Authorization: Bearer token

Body:

```json
{
  "task": "Belajar nodejs with express",
  "UserId": 1
},
```

### Response

Status Code: 200
Body:

```json
{
  "id": 1,
  "task": "Belajar nodejs with express",
  "UserId": 1,
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
},
```

## Delete todo

Endpoint: DELETE http://localhost:3000/todos/{id}

### Request

Params:

- id: number

Headers:

- Content-Type: 'application/json'
- Authorization: Bearer token

### Response

#### Success

Status Code: 200
Body:

```json
{
  "message": "Task has been deleted"
},
```
