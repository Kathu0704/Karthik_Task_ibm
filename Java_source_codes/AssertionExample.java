public class AssertionExample {
    public static void main(String[] args) {
        int age = 20;

        assert age >= 18:"can vote";

        System.out.println("U are " + age);
    }
}