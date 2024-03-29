package edu.upenn.cis350.tasktracker;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    public static final int B = 1;
    public static final int C = 2;
    public static final int D = 3;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }


    public void onLoginClick(View view) {
        EditText username = (EditText)findViewById(R.id.username);
        String usernamestr = username.getText().toString();
        EditText password = (EditText)findViewById(R.id.password);
        String passwordstr = password.getText().toString();
        if (usernamestr == null || usernamestr.equals("")) {
            Toast.makeText(
                    getApplicationContext(),
                    "Please enter username!",
                    Toast.LENGTH_LONG).show();
            return;
        }
        if (passwordstr == null || passwordstr.equals("")) {
            Toast.makeText(
                    getApplicationContext(),
                    "Please enter password!",
                    Toast.LENGTH_LONG).show();
            return;
        }
        String status = LoginDataSource.getUserStatus(usernamestr, passwordstr);
        if (status.equals("success")) {
            Intent i = new Intent(this, TaskActivity.class);
            i.putExtra("username", usernamestr);
            startActivityForResult(i, D);
        } else if (status.equals("error")) {
            Toast.makeText(
                    getApplicationContext(),
                    "error: message -- " + status,
                    Toast.LENGTH_LONG).show();
            return;
        } else if (status == null) {
            System.out.println("error occured");
        } else {
            Toast.makeText(
                    getApplicationContext(),
                    "Incorrect username or password!",
                    Toast.LENGTH_LONG).show();
            return;
        }
    }

    public void onForgotPasswordClick(View view) {
        Intent i = new Intent(this, ChangePasswordActivity.class);
        i.putExtra("LEVEL", 1);
        startActivityForResult(i, B);
    }

    public void onCreateClick(View view) {
        Intent i = new Intent(this, CreateLoginActivity.class);
        startActivityForResult(i, C);
    }
}
