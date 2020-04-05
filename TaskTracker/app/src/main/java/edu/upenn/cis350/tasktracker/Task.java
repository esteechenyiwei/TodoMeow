package edu.upenn.cis350.tasktracker;

public class Task {

    String title, desc, deadline, id;

    public Task(){
    }

    public Task(String title, String desc, String deadline) {
        this.title = title;
        this.desc = desc;
        this.deadline = deadline;
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }

    public String getId() {
        return id;
    }
}
