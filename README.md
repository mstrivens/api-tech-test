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

## Docs

### Comprehensive documentation on API request and expected response

```localhost:3000/api-docs```

## Example Usage

### GET Employees

Provides list of employees

#### Required

```api_key```

This corresponds to the ```API_KEY``` provided by Bamboo Hr for the user

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
    "work_email": "john.doe@work.com",
    "date_of_birth": "1990-01-01",
    "avatar_url": "https://example.com/avatar.jpg",
    "personal_phone_number": "123-456-7890",
    "job_title": "HR Manager",
    "department": "Human Resources",
    "manager_id": 6,
    "start_date": "2023-03-10",
    "tenure": 0,
    "work_anniversary": "2024-03-10"
  }
]
```

## Pagination

The GET employees endpoint supports pagination using the following query params:

### Offset

#### The number of items to skip before starting to collect the result set
```offset={integer}```

### Limit

#### The numbers of items to return
```limit={integer}```

