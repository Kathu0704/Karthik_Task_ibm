@FunctionalInterface
interface Demo {
    void display();
    default void show() {
        System.out.println("Default Method 1");
    }
    default void print() {
        System.out.println("Default Method 2");
    }
}

public class Demo_Abstract_default {
    public static void main(String[] args) {

        Demo obj = () -> System.out.println("Abstract Method Implemented");

        obj.display();
        obj.show();
        obj.print();
    }
}