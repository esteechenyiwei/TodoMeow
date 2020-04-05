package edu.upenn.cis350.tasktracker;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import java.util.ArrayList;

public class TaskActivity extends AppCompatActivity {

    TextView titlepage, subtitlepage, endpage;
    protected String username;
    RecyclerView ourTasks;
    ArrayList<Task> list;
    TaskAdapter taskAdapter;
    Button addbtn;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_task);

        username = getIntent().getStringExtra("username");

        titlepage = findViewById(R.id.titlepage);
        subtitlepage = findViewById(R.id.subtitlepage);
        endpage = findViewById(R.id.endpage);

        addbtn = findViewById(R.id.addbtn);
        addbtn.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v){
                Intent i = new Intent(TaskActivity.this, CreateTaskActivity.class);
                i.putExtra("username", username);
                startActivity(i);
            }
        });

        //working with data
        ourTasks = findViewById(R.id.ourTasks);
        ourTasks.setLayoutManager(new LinearLayoutManager(this));
        list = new ArrayList<>();
        //list = TaskDataSource.getTask(username);
        list.add(new Task("CIS 350", "Demo", "Tomorrow"));
        list.add(new Task("CIS 350 2", "Demo", "Tomorrow"));
        list.add(new Task("CIS 350 3", "Demo", "Tomorrow"));
        list.add(new Task("CIS 350 4", "Demo", "Tomorrow"));
        list.add(new Task("CIS 350 5", "Demo", "Tomorrow"));

        taskAdapter = new TaskAdapter(TaskActivity.this, list);
        ourTasks.setAdapter(taskAdapter);
    }

}