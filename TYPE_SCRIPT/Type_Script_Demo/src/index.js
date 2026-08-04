var msg = "demon is monika's best friend";
console.log("*********************************************");
console.log(msg);
console.log("*********************************************");
function Sum(a, b) {
    return a + b;
}
console.log(Sum(5, 10));
console.log("*********************************************");
function Greet(message) {
    return message;
}
console.log(Greet("Hello, ******good morning******"));
console.log("*********************************************");
var person1 = {
    name: "kathu",
    age: 23
};
console.log(person1);
console.log("*********************************************");
var Student = /** @class */ (function () {
    function Student() {
        this.name = "Vicky";
        console.log("Default Constructor Called");
    }
    return Student;
}());
var s1 = new Student();
console.log(s1.name);
console.log("*********************************************");
// Class with parameterized constructor
var Employee = /** @class */ (function () {
    function Employee(id, name) {
        this.emp_id = id;
        this.emp_name = name;
    }
    return Employee;
}());
var emp1 = new Employee(1, "Alice");
console.log(emp1);
console.log("*********************************************");
// Class with access modifiers
var Employee_details = /** @class */ (function () {
    function Employee_details(name, salary, department) {
        this.name = name;
        this.salary = salary;
        this.department = department;
    }
    Employee_details.prototype.displayDetails = function () {
        console.log("Name:", this.name);
        console.log("Salary:", this.salary);
        console.log("Department:", this.department);
    };
    return Employee_details;
}());
var emp = new Employee_details("Karthik", 50000, "IT");
console.log(emp.name);
emp.displayDetails();
console.log("*********************************************");
// Generic function
function display(value) {
    return value;
}
console.log(display("Hello"));
console.log(display(100));
console.log("*********************************************");
var value1 = "Hello";
console.log(value1.toUpperCase()); // Works without checking
var value2 = "Hello";
// console.log(value2.toUpperCase()); // Error: Need type checking first
if (typeof value2 === "string") {
    console.log(value2.toUpperCase()); // Works after checking the type
}
console.log("*********************************************");
