Project Setup:
clone this project and in directory path execute the following commands
```
npm i 
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
