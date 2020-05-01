package edu.upenn.cis350.tasktracker;

import java.net.URL;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

public class TaskDataSource {

    public static ArrayList<Task> getTask(String inputusername) {
        try {
            URL url = new URL("http://10.0.2.2:3000/gettask?username=" + inputusername);
            TaskAccessWebTask task = new TaskAccessWebTask();
            task.execute(url);
            ArrayList<Task> a = task.get();
            return a;
        }
        catch (Exception e) {
            return null;
        }
    }

    public static String addTask(String inputusername, Task t) {
        try {
            String title = t.getTitle();
            String desc = t.getDesc();
            String ddldate = t.getDeadline();

            URL url = new URL("http://10.0.2.2:3000/addtask?username=" + inputusername +
                    "&title=" + title + "&desc=" + desc + "&deadline=" + ddldate);
            LoginAccessWebTask task = new LoginAccessWebTask();
            task.execute(url);
            String a = task.get();
            return a;
        }
        catch (Exception e) {
            return null;
        }
    }

    public static String editTask(String inputusername, Task t, String orgtitle) {
        try {
            String title = t.getTitle();
            String desc = t.getDesc();
            String ddldate = t.getDeadline();
            URL url = new URL("http://10.0.2.2:3000/edittask?orginaltitle=" + orgtitle +
                    "&username=" + inputusername + "&title=" + title + "&desc=" + desc +
                    "&deadline=" + ddldate);
            LoginAccessWebTask task = new LoginAccessWebTask();
            task.execute(url);
            String a = task.get();
            return a;
        }
        catch (Exception e) {
            return null;
        }
    }

    public static String completeTask(String inputusername, String title) {
        try {
            URL url = new URL("http://10.0.2.2:3000/delete?username=" + inputusername +
                    "&title=" + title);
            LoginAccessWebTask task = new LoginAccessWebTask();
            task.execute(url);
            String a = task.get();
            return a;
        }
        catch (Exception e) {
            return null;
        }
    }

    public static String deleteTask(String inputusername, String title) {
        try {
            URL url = new URL("http://10.0.2.2:3000/delete?username=" + inputusername +
                    "&title=" + title);
            LoginAccessWebTask task = new LoginAccessWebTask();
            task.execute(url);
            String a = task.get();
            return a;
        }
        catch (Exception e) {
            return null;
        }
    }





}
