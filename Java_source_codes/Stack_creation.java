import java.util.ArrayDeque;

public class Stack_creation {
    public static void main(String[] args) {
        ArrayDeque<Integer> stack = new ArrayDeque<>();
        stack.push(10);
        stack.push(20);
        stack.push(30);
        System.out.println("Stack: " + stack);
        int poppedElement = stack.pop();
        System.out.println("Popped Element: " + poppedElement);
        System.out.println("Stack after pop: " + stack);
        int topElement = stack.peek();
        System.out.println("Top Element: " + topElement);
        System.out.println("check stack is Empty or not: " + stack.isEmpty());
    }

}
