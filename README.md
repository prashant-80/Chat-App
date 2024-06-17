Project Setup:
clone this project and in directory path execute the following commands
```
npm i 
```
now create .env file
```
DB_URL=<your_db_uri>
```
```
npm run dev
```
URL: /chat/:roomid/:user
	•	Method: GET
	•	Description: Renders the chat room with previous messages.

URL: /group
	•	Method: GET
	•	Description: Renders the group creation page.

 URL: /group
	•	Method: POST
	•	Description: Creates a new group and redirects to the group creation page.

messsages are persistent as they get stored in mongodb and fetched when the page renders
