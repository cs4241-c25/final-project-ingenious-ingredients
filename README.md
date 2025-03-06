Let Them Cook! README

Deployment: https://let-them-cook-groupi.vercel.app/ 

Brief Description: Our website, Let Them Cook!, is a collaborative culinary catalog filled with recipes made by programmers and coders. This website allows users to 
browse recipes, set up timers, create recipes (when signed in), view others authors pages, and add to a pantry. Some features that we couldn't include in time is 
finishing the backend to the pantry, the meal plan page (a calendar that you could write about what you want to eat during the week), nutrition based databases, 
some serving size stuff in create recipes, and finally cross-referencing pantry to the recipes to see if you can make it.

Instructions: Sometimes, when the website has not been visited in awhile, the database will take a bit of time to start up, so if you do not see anything when 
logging on, just give it a few minutes.

Outline of technologies.
On the client side we utilized a NextJS framework in combination with MaterialUI. For the server side we used Node.js. The programming language that we used was 
Typescript. For authentication, we used NextAuth as it came built into the NextJS framework. Our database was built in MongoDB as we didn't need our collections to 
be heavily relational. When deploying we ended up hosting our client on Vercel and our server on Render.

Challenges we faced:

* Finding time to work on the final project alongside our other assignments in this class was something that hindered our starting progress. Most of the members of 
  our group needed to prioritize finishing the assignments, which took up most of our time. Luckily after assignment A4 was completed this wasn't a problem anymore,
  but did set us behind basically from the start.


* Deployment of the website was an especially difficult challenge for our group. Initially, we chose to deploy our final project on Vercel, and managed to do so
  with minimal errors. However, we realized that our server wasn't being accessed by the client, and with more testing it was clear that the server wasn't even 
  running at all. After much troubleshooting we managed to get the server running, but hosted on a different service, Render. 


Group Member Tasks:

Thomas Branchaud
* Created a database using MongoDB
* Created a server with endpoints that access the database
* Created any endpoints that were needed by the client side
* Created functions for the client that make accessing the endpoints easy
	
Zoe Fisk
* Created the recipe card component
* Created like button that allows users to like & unlike recipes
* Created the recipe slug (details) page
* Created edit recipe button, which includes the option to delete recipes
* Created the sort button for browse recipes
* Created the parallax image for the hero page
* Created the website footer on the hero page
* Created the recipe creation page
* Created some of the server endpoints
* Get recipe from slug
* Delete recipe
* Populated the database with sample recipes from NYT Cooking website
* Helped other teammates learn to use slug pages
	
Mauricio Mergal
* Created a custom timer component
* Created the trending recipes component for the hero page
* Created a RecipeGrid component
* Created a filter tags component that interacts with the RecipeGrid component
* Created the “Your Recipes” section on the Author Page
* Created the “Liked Recipes” section on the Author Page
* Helped overall stylization.
	
Andrew Simonini
* Created Navbar
* Top Section of the Author Page
* The Author Slug (for viewing other Authors)
* The Pantry Frontend
	

Video Link: https://www.youtube.com/watch?v=VEtBeMubpuI