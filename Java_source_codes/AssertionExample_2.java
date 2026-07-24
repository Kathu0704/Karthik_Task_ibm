public class AssertionExample_2{
    public static void main(String[] args) {
        int x = -1;

        assert x > 0 : "x must be positive";

        System.out.println("Assertions are disabled.");
    }
}