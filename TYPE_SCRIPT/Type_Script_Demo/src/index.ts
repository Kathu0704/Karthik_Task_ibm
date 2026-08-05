let msg: string = "demon is monika's best friend";
console.log("*********************************************");
console.log(msg);
console.log("*********************************************");
function Sum(a: number, b: number): number {
    return a + b;
}
console.log(Sum(5, 10));
console.log("*********************************************");
function Greet(message:string):string {
    return message;
}
console.log(Greet("Hello, ******good morning******"));
console.log("*********************************************");
interface person {
    name : string ;
    age : number;
    email?: string;

}
let person1: person = {
    name : "kathu",
    age: 23
};
console.log(person1);
console.log("*********************************************");

class Student {
    name: string = "Vicky";

    constructor() {
        console.log("Default Constructor Called");
    }
}

const s1 = new Student();

console.log(s1.name);
console.log("*********************************************");

// Class with parameterized constructor
class Employee {
    emp_id:number;
    emp_name:string;
    constructor(id:number, name:string) {
        this.emp_id = id;
        this.emp_name = name;
    }
}
let emp1 = new Employee(1, "Alice");
console.log(emp1);
console.log("*********************************************");

// Class with access modifiers
class Employee_details {
    public name: string;
    private salary: number;
    protected department: string;

    constructor(name: string, salary: number, department: string) {
        this.name = name;
        this.salary = salary;
        this.department = department;
    }

    public displayDetails(): void {
        console.log("Name:", this.name);
        console.log("Salary:", this.salary);
        console.log("Department:", this.department);
    }
}

const emp = new Employee_details("Karthik", 50000, "IT");

console.log(emp.name);    

emp.displayDetails();
console.log("*********************************************");

// Generic function
function display<T>(value: T): T {
    return value;
}

console.log(display<string>("Hello"));
console.log(display<number>(100));

console.log("*********************************************");


let value1: any = "Hello";
console.log(value1.toUpperCase()); // Works without checking

let value2: unknown = "Hello";

// console.log(value2.toUpperCase()); // Error: Need type checking first

if (typeof value2 === "string") {
  console.log(value2.toUpperCase()); // Works after checking the type
}

console.log("*********************************************");

class Student_2{

  name: string;
  age: number;

  // Constructor
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // Function / Method
  displayDetails() {
    console.log("Name: " + this.name);
    console.log("Age: " + this.age);
  }
}

// Creating an object
let student1 = new Student_2("John", 20);

// Calling function
student1.displayDetails();

console.log("*********************************************");