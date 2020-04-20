package edu.upenn.cis350.tasktracker;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class CatHomeActivity extends AppCompatActivity {

    String usernamestr;
    public static final int D = 3;
    int silver = 6;
    int gold = 16;
    int platinum = 31;
    int ruby = 66;
    int sapphire = 106;
    int diamond = 166;

    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cat_home);

        usernamestr = getIntent().getStringExtra("username");

        TextView leveltv = (TextView) findViewById(R.id.level);
        TextView numcompletedtv = (TextView) findViewById(R.id.numCompleted);
        TextView tonextleveltv = (TextView) findViewById(R.id.numtonextlevel);

        String numcompleted = CatHomeDataSource.getLevelStatus(usernamestr);
        int level = 0;
        if (numcompleted.equals("error")) {
            Toast.makeText(this, "error in getting response", Toast.LENGTH_LONG );
        } else {
            level = Integer.parseInt(numcompleted);
        }
        numcompletedtv.setText(numcompleted);
        String levelstr = determineLevel(level);
        leveltv.setText(levelstr);
        int tonextlevel = determineTasksToNextLevel(level);
        tonextleveltv.setText("" + tonextlevel);
    }


    public void onShopClick(View view) {
    }

    public void onBackClick(View view) {
        Intent i = new Intent(CatHomeActivity.this, TaskActivity.class);
        i.putExtra("username", usernamestr);
        startActivityForResult(i, D);
    }

    public String determineLevel(int i) {
        if (i < 0) {
            return "Invalid";
        } else if (i >= 0 && i <= 5) {
            return "Yellow";
        } else if (i > 5 && i <= 15) {
            return "Silver";
        } else if (i > 15 && i <= 30) {
            return "Gold";
        } else if (i > 30 && i <= 65) {
            return "Platinum";
        } else if (i > 65 && i <= 105) {
            return "Ruby";
        } else if (i > 105 && i <= 165) {
            return "Sapphire";
        } else {
            return "Diamond";
        }
    }

    public int determineTasksToNextLevel(int i) {
        if (i < 0) {
            return -1;
        } else if (i < silver) {
            return silver - i;
        } else if (i < gold) {
            return gold - i;
        } else if (i < platinum) {
            return platinum - i;
        } else if (i < ruby) {
            return ruby - i;
        } else if (i < sapphire) {
            return sapphire - i;
        } else if (i < diamond) {
            return diamond - i;
        } else {
            return 0;
        }

    }
}
