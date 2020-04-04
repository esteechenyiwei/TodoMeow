package edu.upenn.cis350.todo;

import java.net.URL;

public class LoginDataSource {

    public static String getUserStatus(String inputusername, String inputpassword) {
        try {
            URL url = new URL("http://10.0.2.2:3000/login?username="
                    + inputusername + "&password=" + inputpassword);
            LoginAccessWebTask task = new LoginAccessWebTask();
            task.execute(url);
            String status = task.get();
            return status;
        }
        catch (Exception e) {
            return e.toString();
        }
    }

    public static String signUpUser(String inputusername, String inputemail, String inputpassword) {
        try {
            URL url = new URL("http://10.0.2.2:3000/signup?username="
                    + inputusername + "&email=" + inputemail + "&password=" + inputpassword);
            LoginAccessWebTask task = new LoginAccessWebTask();
            task.execute(url);
            String status = task.get();
            return status;
        }
        catch (Exception e) {
            return e.toString();
        }
    }

    public static String changePassword(String inputusername, String inputpassword1,
                                        String inputpassword2) {
        try {
            URL url = new URL("http://10.0.2.2:3000/changepassword?username="
                    + inputusername + "&oldpassword=" + inputpassword1
                    + "&newpassword=" + inputpassword2);
            LoginAccessWebTask task = new LoginAccessWebTask();
            task.execute(url);
            String status = task.get();
            return status;
        }
        catch (Exception e) {
            return e.toString();
        }

    }

}
