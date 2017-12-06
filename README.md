UF Transportation Safety Center

CEN3031 Group 7C
	Erica Weber
	Jose Rafael Diaz 
	Grant Montgomery 
	Andrew Zhang
	Kyle Schneider
	Lucas Sanders 

This repository holds the development code for the Web App created for the UF Transportation Safety Center during the Fall semester of 2017. 

The Transportation Safety Center is an organization which was established in 2015 and is housed with the Technology and Transfer Center (T2 Center) at the University of Florida. 

The TSC resides under the umbrella of the University of Florida Transportation Institute (UFTI). The focus of TSC is on safety-related research, training, and outreach that has increased over the past five years as the FDOT has affirmed its commitment to reducing the number of highway crashes which result in fatalities and serious injuries in the state.

This Web App was created to establish a central site for members of the TSC to keep track of their projects, current customers to be able to view their project updates, and potential customers to gain information about the TSC, view the different types of projects that have been conducted, and to view and register for training classes hosted by the T2 Center throughout the state. 

As a user, this app contains the following features:

*A Home Page with:
	* A twitter widget to display in real time tweets with the hashtag "Rural Safety" (hashtag can be changed to display tweets with a different hashtag within code in modules/core/client/views/home.client.view.html)
	* A carousel of sliding images related to the Transportation Safety Center, UF, and road safety (images can be changed through image links in the code within modules/core/client/controllers/home.client.controller.js)
	* An About Us textbox which holds static information in 2 paragraphs (can be edited within the code at modules/core/client/views/home.client.view.html) 
	* ![Home Page](/img/1.png?raw=true "Optional Title")
- An About Us Page with:
	- Static information and photo (can be edited at modules/aboutus/client/views/list-aboutus.client.view.html)

- A Contact Us Page with:
	- Static information and photo (can be edited at modules/contactus/client/views/list-contactus.client.view.html)

- A Resources Page with:
	- Static information and links based on category (can be edited at modules/resources/client/views/list-resources.client.view.html)

- A Trainings Page with:
	- A google calendar to display all of the upcoming training classes hosted by the TSC with time, date, and location (populated through google account with credentials given in the documentation associated with this WebApp) 
	- A register now button to redirect to the sign up page for these classes (link can be edited from moodules/trainings/client/views/list-trainings.client.view.html)

- A Projects Page with:
	- A google map with filtering options to display all projects and detailed information about each project upon click on the marker in info windows. These projects can be filtered through the "filter" button to display completed, in progress, proposed, intersection, curve, and pavement marking projects. 
	- Any information in the code regarding these UI features (to edit info windows or map) are found at modules/userprojects/client/views/project-map.client.view.html 
	- Any information in the code regarding the filtering functionality/marker display and backend is found at modules/userprojects/client/controllers/map-userprojects.client.controller.js 

As a client (logged in with a user account- can sign up with signup/sign in links in navbar), this app contains the following added features:

	- A User Page with:
		- Ability to view details about each project, including the project that you associate with in a list format with detailed information 

As an admin (logged in with an admin account- can sign up with signup/sign in links in navbar), this app contains the following added features:

	- An Admin Page with:
		- Ability to view details about each project, in a list format with detailed information by category of project to keep track of all projects
		- Ability to edit each project that is listed upon viewing details
		- Ability to add a new project with any information/photo 
		- Ability to edit the status of other user accounts 
	









