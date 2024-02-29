## API Installation

### NPM

```npm install```

### Yarn

```yarn install`

## Example Usage

GET Employees

Provides list of employees

```

{root_url}?api_key{your_api_key}

Example Response:

[
  {
    "id": "1",
    "first_name": "John",
    "last_name": "Doe",
    "name": "John Doe",
    "display_name": "JohnD",
    "email": "john.doe@example.com",
    "date_of_birth": "1990-01-01",
    "avatar_url": "https://example.com/avatar.jpg",
    "personal_phone_number": "123-456-7890",
    "work_email": "john.doe@work.com"
  }
]

```

## Pagination

The GET employees endpoint supports pagination using the following query params:

```offset={integer}```
```limit={integer}```

offset = The number of items to skip before starting to collect the result set
limit = The numbers of items to return


## Docs

Documentation on API request and expected response

```{root_url}/api-docs```

