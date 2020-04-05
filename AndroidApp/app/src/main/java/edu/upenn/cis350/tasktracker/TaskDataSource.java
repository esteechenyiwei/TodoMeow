package edu.upenn.cis350.tasktracker;

import java.net.URL;
import java.util.ArrayList;

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

    public static ArrayList<Task> addTask(String inputusername, Task t) {
        try {
            String title = t.getTitle();
            String desc = t.getDesc();
            String deadline = t.getDeadline();
            URL url = new URL("http://10.0.2.2:3000/addtask?username=" + inputusername +
                    "&title=" + title + "&desc=" + desc + "&deadline=" + deadline);
            TaskAccessWebTask task = new TaskAccessWebTask();
            task.execute(url);
            ArrayList<Task> a = task.get();
            return a;
        }
        catch (Exception e) {
            return null;
        }
    }

    public static ArrayList<Task> deleteTask(String inputusername, String title) {
        try {
            URL url = new URL("http://10.0.2.2:3000/delete?username=" + inputusername +
                    "&title=" + title);
            TaskAccessWebTask task = new TaskAccessWebTask();
            task.execute(url);
            ArrayList<Task> a = task.get();
            return a;
        }
        catch (Exception e) {
            return null;
        }
    }





}
