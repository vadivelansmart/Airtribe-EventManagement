# Airtribe Event-Management API

This API allows users to create and authenticate users, create, modify, and delete events, and register participants for events.

Table of Contents
- Installation
- Usage
- Endpoints
- Dependencies
- Contributing
- License

## Installation

1. Clone the repository : git clone https://github.com/vadivelansmart/Airtribe-EventManagement.git
2. Navigate to the project directory: cd Airtribe-EventManagement.
3. Install dependencies using `npm install`.


## Usage

1.Start the server: npm start
2.Access the API endpoints at http://localhost:3000  by using a tool like Postman.

## Endpoints

### POST user/register

- Registers a new user
- Expects a JSON object with `fullName`, `email`, `password`, and `role` properties
- Hashes the password using bcrypt
- Saves the user to the database
- Returns a success message if the user is registered successfully

payload : {
    "fullName": "Vadivelan",
    "email": "sampleemail@gmail.com",
    "password": "samplePassword",
    "role": "admin"
}

response: {
    "message": "User Successfully Registered"
}

### POST user/login

- Authenticates a user
- Expects a JSON object with `email` and `password` properties
- Finds the user by email
- Compares the provided password with the hashed password in the database using bcrypt
- If the password is valid, generates a JWT token
- Returns the user ID, success message, and the JWT token

payload: {
    "email": "sampleemail@gmail.com",
    "password":"samplePassword"
}

response: {
    "user": {
        "id": "664f0b248f7587d59d82fd68"
    },
    "message": "Login Successfull",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGYwYjI0OGY3NTg3ZDU5ZDgyZmQ2OCIsImlhdCI6MTcxNjgzMjMwOCwiZXhwIjoxNzE2OTE4NzA4fQ.yyAsp5wXxcGjfflDR995AWVN_f8hhbx0JiRSE7Rj8cA"
}



### POST /events
- Creates a new event
- Requires the user to be authenticated and have an admin role
- Expects a JSON object with event details according to the Event schema
- Validates user role and token
- Saves the event to the database
- Returns a success message or appropriate error messages

payload:{
    "title": "Event Title",
    "description": "Event Description",
    "date": "2024-06-15",
    "time": "10:00 AM",
    "location": "Event Location"
}

response :{
    "message": "Event Successfully Registered"
}

### PUT /event/
- Updates an existing event
- Requires the user to be authenticated and have an admin role
- Expects an event ID as a URL parameter and event details in the request body
- Validates the event ID and user role
- Updates the event in the database if valid
- Returns a success message or appropriate error messages

payload:{
    "title": "Updated Event Title",
    "description": "Updated Event Description",
    "date": "2024-06-20",
    "time": "02:00 PM",
    "location": "Updated Event Location"
    // additional fields as per your Event schema
}

response: {
    "message": "Event Successfully updated"
}

### DELETE /event/
- Deletes an existing event
- Requires the user to be authenticated and have an admin role
- Expects an event ID as a URL parameter
- Validates the event ID and user role
- Deletes the event from the database if valid
- Returns a success message or appropriate error messages

parameters:
-id: The ID of the event to be deleted.

response:
{
    "message": "Event Successfully deleted"
}

### POST /event/register
- Registers a user for an event
- Requires the user to be authenticated
- Expects an event ID as a URL parameter
- Validates the event ID and checks if the user is already registered
- Creates a new participant entry if the user is not already registered
- Increments the participant count for the event
- Sends a confirmation email to the user
- Returns a success message or appropriate error messages

payloadURL: http://localhost:3000/event/66521f31fb7f8195f6cf5ed8/register
    where 66521f31fb7f8195f6cf5ed8 is the EventId

response:{
    "message": "Congratulations, you have successfully registered for the event.",
    "event": {
        "id": "eventId",
        "eventName": "Event Name",
        "date": "Event Date",
        "time": "Event Time",
        "participantCount": updatedParticipantCount
    }
}

### DELETE /participant/
- Removes a user's registration from an event
- Requires the user to be authenticated
- Expects a participant ID as a URL parameter
- Validates the participant ID
- Deletes the participant entry from the database if valid
- Decrements the participant count for the event
- Returns a success message or appropriate error messages

Parameters:
url:http://localhost:3000/participant/66521f31fb7f8195f6cf5ed8
id: 66521f31fb7f8195f6cf5ed8

response: {
    "message": "The registration has been successfully removed.",
}



## Dependencies

- Express.js
- Nodemon
- bcrypt
- jsonwebtoken	
- mongoose
- dotenv
- fs (File System)
- moment
- sib-api-v3-sdk
- module-alias
- Other custom utility functions for Event Management.
## Author

A.VADIVELAN

## License

This project is licensed under the MIT License - see the [LICENSE.md](link-to-license-file) file for details.
