# TransActionary: Save your transactions!

## George Brown

[Virtual Desk Live Site](https://virtual-desk.vercel.app/)

## Table of Contents

1. Need
2. Description
3. How It Works
4. Client Documentation/Screenshots
5. API Documentation
   - POST Auth Endpoint
   - GET Item Endpoints
   - POST Item Endpoints
   - GET User Endpoints
6. Technologies
7. Link to API repo

---

## Description

TransActionary is an web application that allows you to conviently store lists of items "or transactions", with a vendor name and total price included. Users are then able to view the created list. 

---

## How It Works

As a user, I can:

- Sign into account
- Sign out of account
- View saved transactions
- Create new transactions

---

## Client Documentation/Screenshots

1. **Welcome Page** - Landing page; click sign in to get started

![Welcome Page](https://github.com/GeorgeTheDevelopr/TransActionary-Client/blob/master/public/static/screenshots/Welcome.PNG?raw=true)

2. **Sign In Page** - Login with given credentials; this will be an email and a password.

![Login Page](https://github.com/GeorgeTheDevelopr/TransActionary-Client/blob/master/public/static/screenshots/SignIn.PNG?raw=true)

3. **About Page** - Information about web app.

![About Page](https://github.com/GeorgeTheDevelopr/TransActionary-Client/blob/master/public/static/screenshots/About.PNG?raw=true)

4. **Main View Page** - Main view for saved transaction lists; Can also add new list from this view.

![Main View](https://github.com/GeorgeTheDevelopr/TransActionary-Client/blob/master/public/static/screenshots/MainView.PNG?raw=true)

5. **Single Item List View** - View for Item list by ID

![Single Item View](https://github.com/GeorgeTheDevelopr/TransActionary-Client/blob/master/public/static/screenshots/ItemDetails.PNG?raw=true)

6. **NewItem Form** - Upload new transaction/items. Vendor name, items *separated by commas* and total price are required.

![New Item Form](https://github.com/GeorgeTheDevelopr/TransActionary-Client/blob/master/public/static/screenshots/AddItem.PNG?raw=true)


## API Documentation

### POST Auth Endpoint

#### Submit User Credentials

Returns JSON data containing auth token

- **URL**

  `/auth/login`

- **Method**

  `POST`

- **URL Params**

  None

- **Data Params**

  - **Required:** `{email, password}`

- **Success Response**

  - **Code:** 200
  - **Content:** `{authToken: token}`

- **Error Response**

  - **Code:** 400
  - **Content:** `{error: "Missing '${key}' in body"}`

    OR

  - **Code:** 400
  - **Content:** `{error: "Incorrect email or password"}`

    OR

  - **Code:** 401
  - **Content:** `{error: 'User not found'}`

---

### GET Item Endpoints

#### Retrieve all Items

Returns 200 and JSON data about all items

- **URL**

  `/items`

- **Method**

  GET

- **URL Params**

  None

- **Data Params**

  - **Required:** None

- **Success Response**

  - **Code:** 200
  - **Content:** `{id, items, price, owner_id, altId, altId2}`

- **Error Response**

  - **Code:** 400

    OR

  - **Code:** 401
  - **Content:** `{error: 'Unauthorized'}`

<p>&nbsp;</p>


#### Retrieve Item by id

Returns 200 and JSON data about selected item

- **URL**

  `/items/:id`

- **Method**

  GET

- **URL Params**

  - **Required:** `id = <integer>`

- **Data Params**

  - **Required:** `{Authorization", Bearer ${bearerToken}}`

- **Success Response**

  - **Code:** 200
  - **Content:** `{id, itemName, fullPrice, ownerId, altId, altId2}`

- **Error Response**

  - **Code:** 400

    OR

  - **Code:** 401
  - **Content:** `{error: 'Unauthorized'}`

---

### POST Item Endpoints

#### Add a Item

Returns 201 and JSON data about new item

- **URL**

  `/items`

- **Method**

  POST

- **URL Params**

  None

- **Data Params**

  - **Required:** `{ subject, question, date_due }`
  - **Required:** `{Authorization", Bearer ${bearerToken}}`

- **Success Response**

  - **Code:** 201
  - **Content:** `{ id, items, fullPrice, ownerId, altId, altId2 }`

- **Error Response**

  - **Code:** 400
  - **Content:** `{error: "Missing '${key}' details in body"}`

    OR

  - **Code:** 401
  - **Content:** `{error: 'Unauthorized'}`

---

### GET User Endpoints

#### Retrieve all Users

Returns 201 and JSON data about all users

- **URL**

  `/users`

- **Method**

  `GET`

- **URL Params**

  - **Required:** None

- **Data Params**

  - **Required:** None

- **Success Response**

  - **Code:** 201
  - **Content:** `{id, firstName, lastName, email, password}`

- **Error Response**

  - **Code:** 400
  - **Content:** `{error: 'Missing ${key} in request body'}`

    OR

  - **Code:** 400
  - **Content:** `{error: 'Email address already in use'}`

#### Retrieve Users by id

Returns 201 and JSON data about a user

- **URL**

  `/users/user`

- **Method**

  `GET`

- **URL Params**

  - **Required:** None

- **Data Params**

  - **Required:** `user = <integer>`

- **Success Response**

  - **Code:** 201
  - **Content:** `{id, firstName, lastName, email, password}`

- **Error Response**
  - **Code:** 401
  - **Content:** `{error: 'Unauthorized'}`

---

## Technologies

TransActionary is built using the PERN stack, which includes PostgreSQL, Express, React and Node.

## Links

[Github Client Repo](https://github.com/GeorgeTheDevelopr/TransActionary-Client)