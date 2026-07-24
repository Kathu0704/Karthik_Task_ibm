import java.util.ArrayDeque;
public class creation_queue {
    public static void main(String[] args) {
        ArrayDeque<Integer> queue = new ArrayDeque<>();

        queue.offer(10);
        queue.offer(20);
        queue.offer(30);

        System.out.println("Queue: " + queue);

        int dequeuedElement = queue.poll();
        System.out.println("Dequeued Element: " + dequeuedElement);
        System.out.println("Queue after dequeue: " + queue);

        int frontElement = queue.peek();
        System.out.println("Front Element: " + frontElement);
        System.out.println("check Queue is Empty or not: " + queue.isEmpty());
    }   
}
