import java.util.Scanner;

public class NestedIfExample {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter Login ID: ");
        String id = sc.next();

        System.out.print("Enter Password: ");
        String pwd = sc.next();

        if (id.equals("admin")) {
            if (pwd.equals("1234")) {
                System.out.println("Login Successful");
            } else {
                System.out.println("Wrong Password");
            }
        } else {
            System.out.println("Invalid Login ID");
        }

        sc.close();
    }
}