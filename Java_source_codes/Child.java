class Parent1 {
    void show() {
        System.out.println("Class A");
    }
}

class Parent2{
    void display() {
        System.out.println("Class B");
    }
}

// Trying multiple inheritance
class Child extends Parent1, Parent2 {
    public static void main(String[] args) {
        Child obj = new Child();
        obj.show();
        obj.display();
    }
}