package edu.upenn.cis350.tasktracker;

import android.os.AsyncTask;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.ProtocolException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Scanner;

public class TaskAccessWebTask extends AsyncTask<URL, String, ArrayList<Task>> {

    protected ArrayList<Task> doInBackground(URL... urls) {
        try {
            // get the first URL from the array
            URL url = urls[0];
            // create connection and send HTTP request
            HttpURLConnection conn = (HttpURLConnection)url.openConnection();
            conn.setRequestMethod("GET"); conn.connect();
            // read first line of data that is returned
            Scanner in = new Scanner(url.openStream());
            String msg = in.nextLine();
            JSONArray data =  new JSONArray(msg);
            System.out.println(msg);
            ArrayList<Task> t = new ArrayList<Task>();

            //iterating over JSONArray
            int size = data.length();
            for (int i = 0; i < size; i++) {
                JSONObject task = (JSONObject) data.get(i);
                String title = (String) task.get("title");
                String desc = (String) task.get("desc");
                String deadline = (String) task.get("deadline");
                Task j = new Task(title, desc, deadline);
                t.add(j);
            }

            return t;
        } catch (ProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return null;
    }




    protected void onPostExecute(String msg) {
        // not implemented but you can use this if you’d like
    }

}


