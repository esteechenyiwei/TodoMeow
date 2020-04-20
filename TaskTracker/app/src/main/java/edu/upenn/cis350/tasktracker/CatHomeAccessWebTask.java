package edu.upenn.cis350.tasktracker;

import android.os.AsyncTask;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.ProtocolException;
import java.net.URL;
import java.util.Scanner;

public class CatHomeAccessWebTask extends AsyncTask<URL, String, String> {
    @Override
    protected String doInBackground(URL... urls) {
        try {
            // get the first URL from the array
            URL url = urls[0];
            // create connection and send HTTP request
            HttpURLConnection conn = (HttpURLConnection)url.openConnection();
            try {
                conn.setRequestMethod("GET");
                conn.connect();
            } catch (Exception e) {
                System.out.println("error in connection");
            }
            // read first line of data that is returned
            Scanner in = new Scanner(url.openStream());

            String msg = in.nextLine();
           // System.out.println("msg");
            JSONObject jo = new JSONObject(msg);
            String status = jo.getString("status");
            if (status.equals("success")) {
                return status;
            } else {
                return jo.getString("message");
            }

            //System.out.println("status");
            /**
             * Estee's note to Jasmine: I added this so the error message can be
             * displayed, easier for debug. The logic is that if the status is
             * success, then "success" is returned. Else, the error message in the
             * returned json object is returned.
             */

        } catch (ProtocolException e) {
            e.printStackTrace();
            return e.toString();
        } catch (IOException e) {
            e.printStackTrace();
            return e.toString();
        } catch (JSONException e) {
            e.printStackTrace();
            return e.toString();
        }
    }
}
