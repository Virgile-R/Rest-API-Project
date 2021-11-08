# REST API PROJECT FOR THE FSJS TeamTreeHouse Course

## Routes

### User routes

- GET /api/users (requires auth) : returns the current user
- POST /api/users : create a new user

### Course routes

- GET /api/courses : returns all courses in the DB
- GET /api/courses/:id : returns a specific course
- POST /api/courses (requires auth): create a new course with the logged-in user as Course Creator
- PUT /api/courses/:id (requires auth): edit a course
- DELETE /apî/courses/:id (requires auth): delete a course
