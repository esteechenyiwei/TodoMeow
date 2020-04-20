package edu.upenn.cis350.tasktracker;

import java.net.URL;

public class CatHomeDataSource {

    public static String getLevelStatus(String inputusername) {
        try {
            URL url = new URL("http://10.0.2.2:3000/getnumcompleted?username="
                    + inputusername);
            CatHomeAccessWebTask task = new CatHomeAccessWebTask();
            task.execute(url);
            String level = task.get();
            return level;
        }
        catch (Exception e) {
            return e.toString();
        }
    }
}
