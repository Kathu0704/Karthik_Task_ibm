// Abstraction
abstract class Vehicle {

    // Abstract method
    abstract void start();

    // Normal method
    void stop() {
        System.out.println("Vehicle stopped");
    }
}

// Encapsulation
class Car extends Vehicle {

    // Private data members
    private String brand;
    private int speed;

    // Constructor
    Car(String brand, int speed) {
        this.brand = brand;
        this.speed = speed;
    }

    // Implementing abstract method
    @Override
    void start() {
        System.out.println(brand + " is starting");
    }

    // Getter
    public int getSpeed() {
        return speed;
    }

    // Setter with validation
    public void setSpeed(int speed) {
        if (speed >= 0) {
            this.speed = speed;
        }
    }
}

public class Abstraction_Encapsulation {
    public static void main(String[] args) {

        // Abstraction
        Vehicle v = new Car("Toyota", 60);
        v.start();
        v.stop();

        // Encapsulation
        Car c = new Car("Honda", 80);

        System.out.println("Speed: " + c.getSpeed());

        c.setSpeed(100);

        System.out.println("Updated Speed: " + c.getSpeed());
    }
}