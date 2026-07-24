class Person {
    String name = "Karthik";

    void displayPerson() {
        System.out.println("Person name: " + name);
    }
}

class Employee extends Person {
    int empId = 101;

    void displayEmployee() {
        System.out.println("Employee ID: " + empId);
    }
}

class Manager extends Employee {
    String department = "IT";

    void displayManager() {
        System.out.println("Department: " + department);
    }
}

class Main {
    public static void main(String[] args) {

        Manager m = new Manager();

        m.displayPerson();    
        m.displayEmployee(); 
        m.displayManager();   
    }
}