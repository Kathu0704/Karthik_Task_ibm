import java.util.Scanner;

public class LoginDemo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String id, pwd;
        do {
            System.out.print("Enter Login ID: ");
            id = sc.next();
            System.out.print("Enter Password: ");
            pwd = sc.next();
            if (id.equals("admin") && pwd.equals("1234")) {
                System.out.println("Welcome!");
            } else {
                System.out.println("Wrong Login ID or Password");
            }
        } while (!id.equals("admin") || !pwd.equals("1234"));
        sc.close();
    }
}