# Web API Endpoints Documentation

## Login/Register

Endpoints for users register and log in.

### Database Schemas

The resources for both user's registration and user's log in

#### Users
| Field    | Data Type        | Metadata                                            |
| -------- | -----------------| --------------------------------------------------- |
| id       | unsigned integer | primary key, auto-increments, generated by database |
| username | string           | required, unique, max 128 characters                |
| password | string           | required                                            |

### Register

#### Endpoint:

```sh
/api/auth/register
```

#### URL:

```sh
https://build-week-expat-journal-1.herokuapp.com/api/auth/register
```

#### Request (JSON Object)

```sh
{ 
  "username": string(128),
  "password": string
}
```

#### Response (Object)

```sh
{ 
  status: 'success',
  message: `Registered Successfully. Welcome, ${username}.`
}
```



