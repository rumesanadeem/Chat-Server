let ws;
let current_room_code = null;

/*
Function that creates a newRoom on each button press
Uses improved logic in ChatServlet.java to allow connectivity between clients
 */
function newRoom() {
    let callURL = "http://localhost:8080/WSChatServer-1.0-SNAPSHOT/chat-servlet?create=true";
    fetch(callURL)
        .then(response => response.json())
        .then(data => {
            /*If the room list in data contains at least one element,
            the room code is assigned the last element in the list
            */
            let roomCode;
            if (data.code) {
                roomCode = data.code; //Set the room code if data.code already exists
            } else if (data.rooms && data.rooms.length > 0) {
                roomCode = data.rooms[data.rooms.length - 1];
            } else {
                roomCode = null;
            }
            updateRoomList(roomCode); //Update the list with the code
            enterRoom(roomCode); //Access the room using its code
        })
        .catch(error => {
            console.error('Could not create new room: ', error);
        })
}
/*
Function that fetches the room list to be displayed on the webpage
This is called on page load
 */
function fetchRoomList()
{
    //Makes sure it is not creating a new JSONobject which conflicts with client connectivity (create=false)
    let url = "http://localhost:8080/WSChatServer-1.0-SNAPSHOT/chat-servlet?create=false"
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let room_list = data.rooms || []; //Get the roomlist from our response data
            //Obtain new room list
            const room_container = document.getElementById('room-list');
            room_container.innerHTML = ''; //Clear the room list that already exists
            /*
            Each room list becomes a button you can press and access
            Calls the enterRoom function using the room's code
            Appends the newly created button to the list of room buttons
             */
            room_list.forEach(room => {
                let room_button = document.createElement('button');
                room_button.textContent = room;
                //Allows interaction with each button and allows you to access the room
                room_button.addEventListener('click', function(){
                    enterRoom(room);
                });
                room_container.appendChild(room_button); // Add the created room button to the list
            })
        })
        .catch(error => {
            console.error("Could not fetch room list", error);
        })
}

function enterRoom(code) {
    if (current_room_code !== code) {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.close();
        }
        // Refresh rooms
        clearMessages(); //Calls this function so not all room's text contents are in the same place
        current_room_code = code;

        // Display Room Name/Header
        let currentRoom = document.getElementById('roomName');
        currentRoom.textContent = "You are chatting in room " + code;

        console.log(code); //Display the room code in console

        // Create the WebSocket connection for the selected room
        ws = new WebSocket("ws://localhost:8080/WSChatServer-1.0-SNAPSHOT/ws/" + code);

        // Handle incoming messages for the current room
        ws.onmessage = function (event) {
            let message = JSON.parse(event.data);
            console.log(message);
            if (message.type === "chat") {
                displayMessage(message.message); //Display the message from user using this endpoint
            }
        };

        /*Allows the user to hit enter or click send to send the message to the server
        Calls the handleSendMessage function below to achieve this
         */
        const messageForm = document.getElementById("messageForm");
        messageForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission
            handleSendMessage();
        });
    }
}

/*
This function clears the currently displayed text content
This prevents rooms from overlapping each other in the text box
 */
function clearMessages() {
    let chat_container = document.getElementById("chatMessages");
    chat_container.innerHTML = ''; //Clear the chat messages
}

/*
This function handles the incoming input from the user
First it checks that the state of our websocket is open, then set's the request to the user's input
It then sends that input to the websocket and clears the input so the user can enter more messages after
 */
function handleSendMessage() {
    //Obtain the text the user has entered
    let messageInput = document.getElementById("input");
    if (messageInput.value.trim() !== "") {
        if (ws && ws.readyState === WebSocket.OPEN) {
            //Set the request to user input
            let request = { "type": "chat", "msg": messageInput.value.trim() };
            ws.send(JSON.stringify(request)); //Send the request
            messageInput.value = ""; // Clear input after sending message
        } else {
            console.error("WebSocket connection not established or closed.");
        }
    }
}

/*
Function that updates the active room list with the new room's code and adds its button
This function also creates a room button similar to fetchRoomList but it is used in our newRoom function
 */
function updateRoomList(roomCode) {
    const roomListContainer = document.getElementById('room-list');
    //Follows same logic as the buttons created in fetchRoomList
    let roomButton = document.createElement('button');
    roomButton.textContent = roomCode;

    roomButton.addEventListener('click', function () {
        enterRoom(roomCode);
    });

    roomListContainer.appendChild(roomButton);
}

/*
This function adds the user's message input to the chat box
It dynamically adds messages to the associated contained in HTML
 */
function displayMessage(message) {
    //Set the container and create the messageElement to be added
    const chatMessagesContainer = document.getElementById("chatMessages");
    const messageElement = document.createElement('li');
    const contentSpan = document.createElement('span');
    contentSpan.textContent = message; //Set it to the user's message
    messageElement.appendChild(contentSpan); //Append it to the element then add it to the container
    chatMessagesContainer.appendChild(messageElement);
}

// welcomeMessage() populates the chat header with a greeting message before the user enters a room
function welcomeMessage() {
    let greeting = document.getElementById('roomName');
    greeting.textContent = "WELCOME TO CHAT SERVER: Create or Join a room to start chatting";
}

// This event listener calls the fetchRoomList() function on page load
document.addEventListener('DOMContentLoaded', () => {
    welcomeMessage();
    fetchRoomList(); // Fetch and display the initial room list
});