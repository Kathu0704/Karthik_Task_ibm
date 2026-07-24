class Person {
    String name = "Karthik";

    void displayName() {
        System.out.println("Name: " + name);
    }
}

class Employee extends Person {
    int empId = 101;

    void displayEmployee() {
        System.out.println("Employee ID: " + empId);
    }
}

class Manager extends Person {
    String department = "IT";

    void displayManager() {
        System.out.println("Department: " + department);
    }
}

class HyrachicalInheritance {
    public static void main(String[] args) {

        Employee e = new Employee();
        e.displayName();       // From Person
        e.displayEmployee();

        Manager m = new Manager();
        m.displayName();       // From Person
        m.displayManager();
    }
}