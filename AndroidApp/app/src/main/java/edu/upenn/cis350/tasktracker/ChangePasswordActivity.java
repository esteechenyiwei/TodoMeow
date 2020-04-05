package edu.upenn.cis350.tasktracker;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;


public class ChangePasswordActivity extends AppCompatActivity {

    public static final int E = 4;

    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.change_password_activity);
        String level = getIntent().getStringExtra("LEVEL");
    }


    public void onSubmitClick(View view) {
        EditText username = (EditText)findViewById(R.id.username);
        String usernamestr = username.getText().toString();
        EditText password1 = (EditText)findViewById(R.id.newPass);
        String passwordstr1 = password1.getText().toString();
        EditText password2 = (EditText)findViewById(R.id.confirmedNewPass);
        String passwordstr2 = password2.getText().toString();
        if (usernamestr == null || passwordstr1 == null || passwordstr2 == null) {
            Toast.makeText(
                    getApplicationContext(),
                    "Please fill in all required information!",
                    Toast.LENGTH_LONG).show();
            return;
        } else if (usernamestr.equals("") || passwordstr1.equals("") || passwordstr2.equals("")) {
            Toast.makeText(
                    getApplicationContext(),
                    "Please fill in all required information!",
                    Toast.LENGTH_LONG).show();
            return;
        } else if (!passwordstr1.equals(passwordstr2)) {
            Toast.makeText(
                    getApplicationContext(),
                    "Please enter the same passwords!",
                    Toast.LENGTH_LONG).show();
            return;
        } else {
            String status = LoginDataSource.changePassword(usernamestr, passwordstr1, passwordstr2);
            if (status.equals("success")) {
                Toast.makeText(
                        getApplicationContext(),
                        "Successfully changed! Please try log in again :)",
                        Toast.LENGTH_LONG).show();
                Intent i = new Intent(this, MainActivity.class);
                startActivityForResult(i, E);
            } else {
                Toast.makeText(
                        getApplicationContext(),
                        "Unsuccessful! Please try again!",
                        Toast.LENGTH_LONG).show();
                return;
            }

        }
    }
}
