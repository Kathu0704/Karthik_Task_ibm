interface Message {
    void show();
}

public class LambdaExample {
    public static void main(String[] args) {
        Message msg = () -> System.out.println("Welcome");
        msg.show();
    }
}