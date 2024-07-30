package com.example.webchatserver;

import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import org.json.JSONObject;

import java.io.IOException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


/**
 * This class represents a web socket server, a new connection is created and it receives a roomID as a parameter
 * **/
@ServerEndpoint(value="/ws/{roomID}")
public class ChatServer {

    // contains a static List of ChatRoom used to control the existing rooms and their users

    // Usernames and room lists, stored in their respective HashMaps

    // usernames holds <sessionID, username>
    private Map<String, String> usernames = new HashMap<String, String>();

    // room_list <sessionID, roomID>
    private static Map<String, String> room_list = new HashMap<String, String>();

    // chat_rooms holds <roomID, ChatRoom object>
    private static Map<String, ChatRoom> chat_rooms = new HashMap<String, ChatRoom>();

    /* open() creates and starts different chatRooms
        @param: roomID, sessionID
    * */
    @OnOpen
    public void open(@PathParam("roomID") String roomID, Session session) throws IOException, EncodeException
    {
        /*
        Check if we already have the room in the list.
        If not, create the new room and store it
         */
        if (!chat_rooms.containsKey(roomID))
        {
            ChatRoom new_room = new ChatRoom(roomID, session.getId());
            chat_rooms.put(roomID, new_room);
        }
        // If the room already exists, fetch it using its ID and add the userID to the room
        else
        {
            ChatRoom room = chat_rooms.get(roomID);
            room.setUserName(session.getId(), "");
        }

        ChatRoom room = chat_rooms.get(roomID);

        // Store the created room in the room list
        room_list.put(session.getId(), roomID);

        // Obtain our timestamp to be displayed with the message below
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm"));

        // Send the first message from the server on page load
        session.getBasicRemote().sendText(
                "{\"type\": \"chat\", \"message\":\"" + "[" + timestamp + "] " +
                        "(Server " + roomID + "): Welcome to the chat room." +
                        " Please state your username to begin.\"}");

        // Accessing the roomID parameter
        System.out.println(roomID);
    }

    /**  open() closes different chatRooms
        @param: Session sessionID
        @throws EncodeException
    * */
    @OnClose
    public void close(Session session) throws IOException, EncodeException {

        //Get the user's ID
        String userId = session.getId();

        // Do things for when the connection closes
        // Check if the userID is already in our usernames list
        if (usernames.containsKey(userId))
        {
            /*
            Obtain the username and room ID from the list using the user's store ID
            Remove both of them once the connection ends
             */
            String username = usernames.get(userId);
            usernames.remove(userId);
            String roomId = room_list.get(userId);
            room_list.remove(roomId);
            // Loop through the rooms and remove the user respective to their ID's
            chat_rooms.values().forEach(room -> room.removeUser(userId));
            //Obtain timestamp
            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm"));

            // Broadcast this person left the server
            int countPeers = 0;
            for (Session peer : session.getOpenSessions()){

                // Only broadcast messages to those in the same room
                if(room_list.get(peer.getId()).equals(roomId)) {
                    peer.getBasicRemote().sendText("{\"type\": \"chat\", \"message\":\"" +
                            "[" + timestamp + "] " + "(Server): " +
                            username + " left the chat room.\"}");
                    countPeers++;
                }
            }
        }
    }

    /**  handleMessage() sends messages to the chat room
        @param: String comm, String session
        @throws EncodeException
    * */
    @OnMessage
    public void handleMessage(String comm, Session session) throws IOException, EncodeException
    {
        // Get user and room ID's
        String userId = session.getId();
        String roomId = room_list.get(userId);

        //Parse the message
        JSONObject jsonmsg = new JSONObject(comm);
        String type = (String) jsonmsg.get("type");
        String message = (String) jsonmsg.get("msg");

        // Handle message if a username already exists
        if (usernames.containsKey(userId))
        {

            // Get userID
            String username = usernames.get(userId);
            System.out.println(username);

            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm")); // Timestamp

            // Display messages for all clients in a chat room session
            for (Session peer : session.getOpenSessions())
            {
                if (room_list.get(peer.getId()).equals(roomId))
                {
                    peer.getBasicRemote().sendText(
                            "{\"type\": \"chat\", \"message\":\"" + "[" + timestamp + "] "
                                    + username + ": " + message + "\"}");
                }
            }
        }

        // Handle message if a username does not exist
        else
        {
            // Display greeting message for new user chat room session
            usernames.put(userId, message);
            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm")); // Timestamp
            session.getBasicRemote().sendText(
                    "{\"type\": \"chat\", \"message\":\"" + "[" + timestamp + "] " + "(Server): Welcome, "
                            + message + "!\"}");

            // Display entry message for all other clients in a chat room session
            for (Session peer : session.getOpenSessions())
            {
                if (!peer.getId().equals(userId) && room_list.get(peer.getId()).equals(roomId))
                {
                    peer.getBasicRemote().sendText("{\"type\": \"chat\", \"message\":\"" +
                            "[" + timestamp + "] " + "(Server): "
                            + message + " joined the chat room.\"}");
                }
            }
        }
    }
}