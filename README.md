## API Installation

### NPM

```
npm install
npm run dev

```

### Yarn

```
yarn install
yarn run dev
```

### Environment Variables

You can set the following environment variables as per the ```.example.env``` file:

### Required
#### SUBDOMAIN=

The ```SUBDOMAIN``` must be set to the domain of the users Bamboo Hr ```companyDomain```

### Not Required
#### PORT=

The ```PORT``` will default to 3000 if not set

#### API_KEY=

The ```API_KEY``` is available to pass in as a query param but you can set here for development

## Example Usage

### GET Employees

Provides list of employees

#### Required

```api_key```

#### Example Request:

```localhost:3000?api_key={your_api_key}```

#### Example Response:

```
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

### Offset

offset = The number of items to skip before starting to collect the result set
```offset={integer}```

### Limit

limit = The numbers of items to return
```limit={integer}```

## Docs

Comprehensive documentation on API request and expected response

```localhost:3000/api-docs```

