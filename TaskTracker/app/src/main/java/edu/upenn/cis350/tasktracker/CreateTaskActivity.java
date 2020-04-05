package edu.upenn.cis350.tasktracker;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class CreateTaskActivity extends AppCompatActivity {

    TextView titlepage, addtitle, adddesc, adddeadline;
    EditText newtitle, newdesc, newdeadline;
    Button createbtn, cancelbtn;
    String username;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_create_task);

        username = getIntent().getStringExtra("username");

        titlepage = findViewById(R.id.titlepage);
        addtitle = findViewById(R.id.addtitle);
        adddesc = findViewById(R.id.adddesc);
        adddeadline = findViewById(R.id.adddeadline);
        newtitle = findViewById(R.id.newtitle);
        newdesc = findViewById(R.id.newdesc);
        newdeadline = findViewById(R.id.newdeadline);

        createbtn = findViewById(R.id.createbtn);
        createbtn.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v){
                Task t = new Task(newtitle.getText().toString()+"",
                        newdesc.getText().toString()+"",
                        newdeadline.getText().toString()+"");
                TaskDataSource.addTask(username, t);
                Intent i = new Intent(CreateTaskActivity.this, TaskActivity.class);
                i.putExtra("username", username);
                startActivity(i);
            }
        });

        cancelbtn = findViewById(R.id.cancelbtn);
        cancelbtn.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v){
                Intent a = new Intent(CreateTaskActivity.this, TaskActivity.class);
                startActivity(a);
            }
        });

    }
}
