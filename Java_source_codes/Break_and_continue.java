public class Break_and_continue {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int n = sc.nextInt();
        for (int i = 1; i <= n; i++) {
            if (i == 5) {
                continue; // Skip the rest of the loop when i is 5
            }
            else if (i == 10) {
                break; 
            }
            System.out.println(i);
        }
        System.out.println("Loop completed.");
    }
    
}
