# Project Information:

For this assignment, we were tasked with creating a web chat application, which uses 
Java technologies, such as with WebSockets, and front-end technologies such as HTML, Javascript, and CSS. 
Our system of web application allows for instantaneous messaging within multiple chat rooms, and users have a choice
to be able to join an existing chat room or initiate a new one. To easily distinguish between various chat rooms, we have 
designated each by a distinct alphanumeric identifier. Furthermore, to make this process of web chatting easier for multiple users, 
we have also incorporated the idea of choosing usernames where users must choose a username as they use the application, so that they 
are identified during conversations between multiple participants of the chat. 

Furthermore, when a user joins a room, the chat server recognizes and notifies existing members of the 
new user's entry. The dialogue within each room is exclusive to its participants, keeping safe both the relevance and
privacy of the conversation. The user interface is designed in such a way where it efficiently displays the roster 
of chat rooms on the side of the page for users to view. Moreover, some additional core functions of the web application
include timestamps on messages sent by user and the "send" button made for users to easily send their messages. 

The collective goal of our team, **Sanhith Amarathunge, Rosie Khurmi, Rumesa Nadeem, and Aryan Ved**, has been to fulfill the basic requirements of the 
application, while also working towards adding new and improved features that enhance the application's efficiency and 
user engagement. These improvements have made the application an attractive and user-friendly chat server. 

### Screen-recording of the Chat Server:

[Link to Video Of Chat Server](https://www.youtube.com/watch?v=YZpLbCeJeoE)

# Improvements:
****The improvements that we made to the interface and/or the interaction functionalities 
of the server:****

### Server Model/Interface:

While working on this project, we prioritized aesthetic and usability in the design process. As a result, the chat 
application shows a modern and clean layout with clear navigation buttons-- which makes it incredibly user-friendly. 
Additionally, in order to allow users to seamlessly join pre-existing chat rooms, we also incorporated a list of chat 
rooms which dynamically updates, in real-time, as new chat rooms are created and available. Furthermore, we additionally
incorporated a feature in the about section of our application, where users are abe to copy our team members' email just 
by a click-- allowing for users to have easy access to our contacts. 

These improvements were made in effort and commitment to ensuring that users of this application are able to seamlessly 
engage with this platform and multiple users, and we believe these enhancements will contribute to the appeal of our web
chat application. 

# How to run:
Step-by-step on how to successfully clone and run your chat server:

### 1. Locating the Directory in Terminal:
Open your terminal/command prompt and navigate to the directory where you want to clone
the repository using the "cd" command.
Example:
   ```bash
   cd path/to/your/directory
   ```
### 2. Cloning the Repository:
Clone the repository using the git clone command followed by the URL of the repository.
Example:
  ```bash
   git clone https://github.com/your-username/your-repo.git
   ```
### 3. Launching IntelliJ IDEA:
Open the project, in IntelliJ IDEA, by selecting "Open" from the File menu and navigate
to the directory where you cloned the repository. Now, choose the project folder, and click "Open".

### 4. Converting the Project into a Maven Project:
If the project is not recognized as a Maven project, you must convert it (if necessary) by navigating to the
project window,
Next, press Ctrl+Shift+A (Windows/Linux) or Cmd+Shift+A (Mac) to open the action
search. Then, type "Add Maven Project" to press Enter.

### 5. Configuring Project Settings:
Configure the project settings according to your environment.
This can include setting up a JDK version or other dependencies.

### 6. Launching Glassfish Server:
Start Glassfish Server in IntelliJ IDEA by clicking on the "Run" button
Then, select "Edit Configurations", and add a new Glassfish Server configuration.

### 7. Specify the Server Domain:
Keep in mind to set JRE to the latest version by setting the "Domain" option to "domain1".
Afterwards, click on the "Run" option to start the server.
Next, add an artifact and choose WSChatServer:war exploded.

### 8. Deploy the Application:
Once Glassfish Server is running, deploy the chat server by right-clicking on the project directory in
IntelliJ IDEA. 
Once deployment is completed, use the URL provided by Glassfish to access the chat server.
The URL for access will be: `http://localhost:8080/WSChatServer-1.0-SNAPSHOT/chat-servlet`

### 9. Run the Application:
In order to launch the chat server in your default web browser, navigate to index.html in the project structure, 
right-click on it, then select "Run index.html". 

### 10. Use Multiple Users:
Once you get the link, copy paste the link into new tabs to allow for multiple users to use the application.


# Group Members and Contribution Report:

### Rosie Khurmi and Sanhith Amarathunge:
- ChatServer.java
- ChatServlet.java
- main.js
- about.js

### Rumesa Nadeem and Aryan Ved:
- about.html
- about-style.css
- index.html
- style.css
- about.js
- README.md
