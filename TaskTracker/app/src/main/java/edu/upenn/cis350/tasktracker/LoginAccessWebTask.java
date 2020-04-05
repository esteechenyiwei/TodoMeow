package edu.upenn.cis350.tasktracker;

import android.os.AsyncTask;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.ProtocolException;
import java.net.URL;
import java.util.Scanner;

public class LoginAccessWebTask extends AsyncTask<URL, String, String> {

    protected String doInBackground(URL... urls) {
        try {
            // get the first URL from the array
            URL url = urls[0];
            // create connection and send HTTP request
            HttpURLConnection conn = (HttpURLConnection)url.openConnection();
            conn.setRequestMethod("GET"); conn.connect();
            // read first line of data that is returned
            Scanner in = new Scanner(url.openStream());
            String msg = in.nextLine();
            JSONObject jo = new JSONObject(msg);
            String status = jo.getString("status");
            /**
             * Estee's note to Jasmine: I added this so the error message can be
             * displayed, easier for debug. The logic is that if the status is
             * success, then "success" is returned. Else, the error message in the
             * returned json object is returned.
             */

            if (status.equals("success")) {
                return status;
            } else {
                return jo.getString("message");
            }
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



    protected void onPostExecute(String msg) {
        // not implemented but you can use this if you’d like
    }

}


