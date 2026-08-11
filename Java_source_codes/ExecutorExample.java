import java.util.concurrent.*;

public class ExecutorExample {
    public static void main(String[] args) {

        // Executors creates the thread pool
        ExecutorService service = Executors.newFixedThreadPool(2);

        // ExecutorService submits tasks
        service.submit(() -> {
            System.out.println("Task 1: " +
                    Thread.currentThread().getName());
        });

        service.submit(() -> {
            System.out.println("Task 2: " +
                    Thread.currentThread().getName());
        });

        // Stop accepting new tasks
        service.shutdown();
    }
}
