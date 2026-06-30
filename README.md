- difference between json and javasript object
- Add the express.json middleware to your app
- Make your signup Api dynamic to recieve data from the end user

- first fetch the one user using userEmail = req.body.emailId and model.find({emailId : userEmail})
- find all the users than
- which user will it return on model.findOne
- create a delete user Api
- difference between PATCH and PUT
- Api - update a user
- Explore the mongoose documentation especially for the Models.methods()
- What are options in a Model.findOneAndUpdate , explore more about it 
- API - update the user with emailId

- explore schemaType options from the documentation
- add required, unique, lowercase, min, minLength, trim
- Add default
- create a custom validate function for gender
- Improve the DB schema - PUT all appropriate validationson each field in schema
- Add timestamps to the schema 
- Add API level validation on patch request & sign up post API
- DATA sanitization - ADD API validation for each field
- Install Validator 
- Explore validator library function and use validator function for password, email, etc.
- NEVER TRUST req.body - end user can send anythingssss


- Validate data in signup Api
- Install bcrypt package
- Create passwordHash using bcrypt.hash & save the user with encrypted password
- Create login API
- Compare passwords and throw errors if email or password is invalid


- Install a cookie-parser
- Just send a dummy cookie to the user
- create a GET/profile API and check if you got the cookie back
- Install jsonWebToken 
- In login API, after email and password validation, create a JWT token and send it to the user inside cookies
- read the cookie in the profile API and find the user logged in user
- userAuth Middleware
- Add the userAuth Middleware in profile API and a new sendConnectionRequest
- set the expiry of JWT token and cookies to 7 days.

- create userSchema method to comparePassword(passwordInputByUser)

- Explore tinder APIs
- create a list all API you can think of in devTinder
- Group multiple routes under respective routers
- Read documentation from express.Router();
- create routes folder for managing auth, profile, request routers
- create authRouter, profileRouter and requestRouter
- Import these routers in app.js
- Create POST/logout API
- create PATCH/profile/edit API
- create PATCH/profile/password API => forgot password API
- Make sure validate all data in POST,PATCH apis