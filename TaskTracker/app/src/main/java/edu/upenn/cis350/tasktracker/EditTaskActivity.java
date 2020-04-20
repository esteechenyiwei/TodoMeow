package edu.upenn.cis350.tasktracker;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class EditTaskActivity extends AppCompatActivity {

    EditText newtitle, newdesc, newdeadline;
    Button btnSaveUpdate, btnComplete, btnDelete;
    String username;
    String orgtitle;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_task);

        username = getIntent().getStringExtra("username");
        orgtitle = getIntent().getStringExtra("title");

        newtitle = findViewById(R.id.newtitle);
        newdesc = findViewById(R.id.newdesc);
        newdeadline = findViewById(R.id.newdeadline);

        btnSaveUpdate = findViewById(R.id.editbtn);
        btnComplete = findViewById(R.id.completebtn);
        btnDelete = findViewById(R.id.deletebtn);

        //get a value from previous one
        newtitle.setText(getIntent().getStringExtra("title"));
        newdesc.setText(getIntent().getStringExtra("desc"));
        newdeadline.setText(getIntent().getStringExtra("deadline"));

        //make an event for button
        btnSaveUpdate.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                Task t = new Task(newtitle.getText().toString()+"",
                        newdesc.getText().toString()+"",
                        newdeadline.getText().toString()+"");
                TaskDataSource.editTask(username, t, orgtitle);
                Intent i = new Intent(EditTaskActivity.this, TaskActivity.class);
                i.putExtra("username", username);
                startActivity(i);
            }
        });

        btnComplete.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                TaskDataSource.completeTask(username, orgtitle);
                Intent i = new Intent(EditTaskActivity.this, TaskActivity.class);
                i.putExtra("username", username);
                startActivity(i);
            }
        });

        btnDelete.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                TaskDataSource.deleteTask(username, orgtitle);
                Intent i = new Intent(EditTaskActivity.this, TaskActivity.class);
                i.putExtra("username", username);
                startActivity(i);
            }
        });
    }
}
