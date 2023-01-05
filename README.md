# Kenility Test
##  This is a login Api

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

## Setup

- Open docker desktop (be sure that docker is running )
- Download this project
- Execute in order the following commands for initalize the project
```sh
npm run start:docker
```

## Methods

| Method | Type |Route | description |
| ------ | ------ | ------ |------ |
| CreateUser | POST | localhost:3000/user | This method create a new user in the database |

 - Body
```javascript
{
    "name":"Esteban",
    "lastName": "Camacho",
    "address": "cali",
    "password":"1234"
    "picture": "file1"
}
```

| Method | Type | Route | Description |
| ------ | ------ | ------ | ------ |
| Login | POST | localhost:3000/auth/login | This method validate if the credentials are valid and return a token (aditional method) |

 - Body
```javascript
{
    "username":"lookiron2",
    "password":"1234bcA"
}
```

| Method | Type | Route | Description | constrain |
| ------ | ------ |------ | ------ | ------ |
| FindAll | GET | localhost:3000/user | This methods return all the user that are in database|


| Method | Type | Route | Description |
| ------ | ------ | ------ | ------ |
| UpdateUser | PATCH | localhost:3000/user/${ID}| This method search for the userID and update id (all the parameters in the body are optional)|

 - Body
```javascript
{
    "name":"Esteban",
    "lastName": "Camacho",
    "address": "cali",
    "password":"1234"
    "picture": "file1"
}
```

| Method | Type | Route | Description | constrain |
| ------ | ------ |------ | ------ | ------ |
| FindOne | GET | localhost:3000/user/{id} | This methods return a user (aditional method)|

| Method | Type | Route | Description | constrain |
| ------ | ------ |------ | ------ | ------ |
| UploadImgae | POST | localhost:3000/file/upload | To use this method we must select in the postman body the option "form-data", in the key type file and select the image we want to load, this will return us a string in base64 that represents our image, we pass it in the body of the user to create the user.|

## How does it work?

### Steps

1. Create user: This step is done to obtain our user with which we will login to obtain the token which we will pass to the other api in the form of authorization because they are protected.

2. Login: From the previous step take the automatically formed username and password, use the login method to obtain the token. Once the token is obtained it must be passed as bearer token to our other methods to get response otherwise it will get an error of not being authorized.


### Decisions

1. It is decided to set a password, which is encrypted, in order to use the token provided by JWT, the main idea of JWT is to protect our apis with an authorization token which is given with a combination of user and password.

2. When creating the user and with the same idea of being able to make a successful authentication, it is decided to generate a username that will be unique per user.

3. It is decided to create a method that converts the image into a base64 encoded image to be stored in our database. 
In another scenario this method would be used by the front end to convert the image.

### Future improvements

1. For user creation, ask for an email or a unique field for easy identification.
2. Save the images in another environment, as an example it can be an amazon S3 and in the database just save the url