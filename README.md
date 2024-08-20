## Project Proposal

# Project Title
	Momentum
	
## Overview
	Momentum is an all-in-one fitness app that integrates various aspects of health and 
	fitness management, catering to users' diverse needs.
	Momentum is a fitness solution that combines workouts, fitness tracking, and meal 
	planning into a single platform. By addressing the multifaceted nature of health and 
	fitness, the app seeks to empower users to achieve their personal fitness goals 
	effectively.
	
### Problem
	Momentum is an all-in-one fitness app designed to help users achieve their health 
	and fitness goals through a combination of workouts, fitness tracking, and meal 
	planning. However, many individuals struggle to find a comprehensive fitness 
	solution that meets their unique needs. Currently, users often have to navigate a 
	fragmented landscape of fitness apps, each specializing in one area—whether it’s 
	workout routines, tracking progress, or meal planning. This can lead to a 
	time-consuming process of downloading multiple apps, setting them up, and trying 
	to integrate their features. As a result, users may feel overwhelmed and frustrated, 
	ultimately hindering their motivation to maintain a consistent fitness routine. 
	
### User Profile
	- Fitness Enthusiasts:
		- looking for workout routines based on their level of activity and goals. 
		- looking to keep track of their gym days, body measures, etc.
		- looking to have Meal plans generated based on their nutrition goals.
	
### Features
	- As a user, I want to be able to create an account to manage my fitness goals.
	- As a user, I want to be able to login to my account to manage my fitness goals.
	- As a logged in user, I want to be able to set up my own workout routines.
	- As a logged in user, I want to be able to track certain fitness metrics. 
	- As a logged in user, I want to be able to have meal plans created for me based on my 
		nutrition goals. 
		
## Implementation

### Tech Stack
	- React
	- JavaScript
	- Express
	- SQL
	- Client libraries:
		- react
		- axios		
		- react-router
		- sass
	- Server libraries:
		- express
		- knex
		- bcrypt - password hashing
		
### APIs
	- External APIs:
		- Gemini AI API - for meal plan generation 
		- Health Tracker API  
		
### Sitemap
	- Home page
	- Sign up
	- Login
	- Workouts list by selection
	- Meal Plans by selection
	- Health tracking
	-Profile

### Endpoints

**POST /auth/SignUp**

- Add a user account 

Parameters: 
- Name: user's name
- email: user's email
- password: user's chosen password

Response:
```
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```

**POST /auth/LogIn**

- Login a user

Parameters:
- email: User's email
- password: User's provided password

Response:
```
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```

**GET /user/profile**

- Get User info

**PUT /user/profile**

- Update user info

**GET /Workouts/all**

- get all workouts

**GET /Workouts**

- get workouts by type and difficulty 

**POST /gemini/generate-content**

- post prompt parameter - data payload

### Auth
	- JWT auth
		- All API requests will be made after auth
		- Added before core features have first been implemented
		- Store JWT in sessionStorage, remove when a user logs out
		- May not need states to show different UI when logged in since
			core features are only available after logging in
			
## Roadmap
	- Create client
			- react project with routes and boilerplate pages (base pages) 
			
	- Create Server
			- express project with routing with appropriate responses.
			
	- Create database 
	
	- create migrations
	
	- gather data for 20-25 workouts 
	
	- create seeds with workout data
	
	- Develop all features
	
	--Feature: Home Page
	
	--Feature: Create account
		- Implement register page + form 
		- create POST /register endpoint
		
	--Feature: Login
		- Implement login page + form
		- create POST /login endpoint
		
	--Feature: Implement JWT tokens
    - Server: Update expected requests / responses on protected endpoints
    - Client: Store JWT in local storage, include JWT on axios calls
	
	--Feature: List of Workouts 
		- Implement list of workouts page including drop downs for workout type, muscle, and difficulty
		- create GET /workouts endpoint 
		- create GET endpoints for all possible selected options (will be displayed in the same page)
	
	--Feature: Fitness tracking 
			- Implement fitness tracking API 
			- Create axios GET request to api with specific params - based on the fitness tracking 
				type
	
	--Feature: List of Weekly Meals Plans 
		- Implement Gemini API - link and api key
		- Create axios GET request to api with specific params - number of days + nutrition goal etc
	
	- Bug Fixes
	
	- Deploy to client and server to prod - merge with main branch
	
	- DEMO DAY
	
## Nice-to-haves
	-	Forgot password functionality
	- Unit and Integration Tests
	- Extend User Profile: Full Name, fitness info - BMI, Height, Weight etc. 
	- Extended features:
		- save preferred workouts, meal plans
		- create their own routines and meal plans