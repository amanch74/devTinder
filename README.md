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

