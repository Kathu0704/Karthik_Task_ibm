import java.util.ArrayList;
import java.util.Scanner;

public class Even_or_Odd_Lambda {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        ArrayList<Integer> numbers = new ArrayList<>();
        System.out.println("how many numbers do you want to enter?");
        int n = sc.nextInt();
        System.out.println("Enter the numbers:");
        for (int i = 0; i < n; i++) {
            numbers.add(sc.nextInt());
        }
        numbers.forEach(num -> {
            if (num % 2 == 0) {
                System.out.println(num + " is Even");
            } else {
                System.out.println(num + " is Odd");
            }
        });
        sc.close();
    }
}