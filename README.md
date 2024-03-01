## API Installation

### NPM

Create .env file with SUBDOMAIN set to your bamboo domain (see Environment Variable section below)

```
npm install
npm run dev
```

### Yarn

Create .env file with SUBDOMAIN set to your bamboo domain (see Environment Variable section below)

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

### Comprehensive documentation on API requests, routes and expected responses

```localhost:3000/api-docs```

## Example Usage

### GET Employees

Provides list of employees

#### Required

```api_key``` as a query param if not set in the ```.env``` file

This corresponds to the ```API_KEY``` provided by Bamboo Hr for the user

#### Example Request:

```localhost:3000?api_key={your_api_key}```

#### Example Response:

```
[
  {
    "id": "1",
    "firstName": "John",
    "lastName": "Doe",
    "name": "John Doe",
    "displayName": "JohnD",
    "workEmail": "john.doe@work.com",
    "dateOfBirth": "1990-01-01",
    "avatarUrl": "https://example.com/avatar.jpg",
    "personalPhoneNumber": "123-456-7890",
    "jobTitle": "HR Manager",
    "department": "Human Resources",
    "managerId": 6,
    "startDate": "2023-03-10",
    "tenure": 0,
    "workAnniversary": "2024-03-10"
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

