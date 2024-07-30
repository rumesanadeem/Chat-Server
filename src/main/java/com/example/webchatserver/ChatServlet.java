package com.example.webchatserver;

import java.io.*;
import java.util.HashSet;
import java.util.Set;

import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import org.apache.commons.lang3.RandomStringUtils;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 * This is a class that has services
 * In our case, we are using this to generate unique room IDs**/
@WebServlet(name = "chatServlet", value = "/chat-servlet")
public class ChatServlet extends HttpServlet {
    private String message;

    private static final int LENGTH = 5;

    // Static so this set is unique
    public static Set<String> rooms = new HashSet<>();

    /**
     * Method generates unique room codes
     * @param length of code
     * **/
    public String generatingRandomUpperAlphanumericString(int length) {
        String generatedString = RandomStringUtils.randomAlphanumeric(length).toUpperCase();

        // Generating unique room code
        while (rooms.contains(generatedString)){
            generatedString = RandomStringUtils.randomAlphanumeric(length).toUpperCase();
        }
        rooms.add(generatedString);

        return generatedString;
    }

    /**
     * doGet() sends the room codes as a json file
     * @param request, response
     * @throws IOException
     */
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        Boolean create_room = Boolean.parseBoolean(request.getParameter("create"));

        JSONObject object = new JSONObject();
        JSONArray current_rooms = new JSONArray(rooms);

        // Add the codes to the json file
        if (create_room == true) {
            object.put("code", generatingRandomUpperAlphanumericString(LENGTH));
        }

        object.put("rooms", current_rooms);

        PrintWriter out = response.getWriter();
        out.println(object);
    }

    public void destroy() {
    }
}