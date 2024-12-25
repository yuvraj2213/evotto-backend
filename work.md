Backend
Objective:
Develop the backend infrastructure for Evotto, a one-stop solution for automobile rental, second-hand car purchases, and vehicle servicing.

---

Key Features
The backend should:

1. Handle user authentication (sign-up, login, and session management).
2. Manage data for automobile rentals, second-hand cars, and service bookings.
3. Provide APIs for front-end integration.
4. Use a relational or NoSQL database to store data securely.

---

Task Breakdown

Day 1: Backend Setup

1. Choose a backend framework (Node.js + Express or any preferred framework).
2. Set up the project structure with environment variables for configuration.
3. Integrate a database (MongoDB, MySQL, or PostgreSQL).

Day 2: Authentication System

1. Implement user authentication:
   - Sign-up: Collect and store user details securely (use password hashing).  
     -Login:Validate credentials and generate tokens (JWT or similar).
   - Include a middleware to authenticate protected routes.
2. Create API routes for authentication:
   - POST /signup
   - POST /login
   - GET /logout

Day 3: Automobile Rental API

1. Design database schema for rental vehicles:
   - Vehicle ID
   - Name
   - Type (car, bike, etc.)
   - Availability
   - Price per day
2. Create CRUD API routes:
   - GET /rentals (list all available vehicles)
   - POST /rentals (add a new vehicle)
   - PUT /rentals/:id (update vehicle details)
   - DELETE /rentals/:id (delete a vehicle)

Day 4: Second-Hand Car Purchase API

1. Design database schema for second-hand cars:
   - Car ID
   - Make and Model
   - Year
   - Price
   - Condition
   - Seller details
2. Create API routes:
   - GET /cars (list all available cars)
   - POST /cars (add a car for sale)
   - PUT /cars/:id (update car details)
   - DELETE /cars/:id (delete a car entry)

Day 5: Vehicle Servicing API

1. Design database schema for service bookings:
   - Booking ID
   - User ID
   - Service Type (repair, maintenance)
   - Vehicle details
   - Date and time
2. Create API routes:
   - POST /services (book a service)
   - GET /services/:id (get booking details)
   - GET /services (list all bookings for admin)
   - PUT /services/:id (update a booking)

Day 6: Integrations and Error Handling

1. Integrate front-end with APIs (provide clear documentation).
2. Add input validation (e.g., using libraries like Joi or Validator.js).
3. Implement error handling for API routes.
4. Use status codes and error messages to ensure clarity.

Day 7: Final Touches and Deployment

1. Test the APIs with tools like Postmanor Swagger
2. Deploy the backend using Heroku, AWS, or Render.
3. Share the base API URL and complete API documentation (Swagger preferred).

Submission Guidelines

1. Deadline:7 days from the task assignment.
2. Submit:
   - GitHub repository link.
   - Deployed backend API link.
   - API documentation.

Evaluation Criteria

1. Database design and efficiency.
2. Functionality of the API routes.
3. Code readability and modularity.
4. Integration with the front end.

Good luck!
