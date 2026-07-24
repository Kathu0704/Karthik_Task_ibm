import java.util.Scanner;

@FunctionalInterface
interface Math_operations{
    float calculate(int a, int b);
}
 
public class Arithmetic_calculator {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the first number: "); 
        int a = sc.nextInt();
        System.out.println("Enter the second number: ");
        int b = sc.nextInt();
        Math_operations Addition = (a, b) -> (float) (a + b) ;
        Math_operations Subtraction = (a, b) -> (float) (a - b) ;
        Math_operations Multiplication = (a, b) -> (float) (a * b) ;
        Math_operations Division = (a, b) -> (float) (a / b) ;
 
        System.out.println("Addition result: " + Addition.calculate(a, b));
        System.out.println("Subtraction result: " + Subtraction.calculate(a, b));
        System.out.println("Multiplication result: " + Multiplication.calculate(a, b));
        System.out.println("Division result: " + Division.calculate(a, b));

        sc.close();
    }
}