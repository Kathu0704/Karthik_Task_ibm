public class Employee {
    int empid=10001
    String empname="Karthik"
   
}
class Manager extends Employee{
    int empid=10002
    String empname="Ramesh"
}
class Final{
    public static void main(String[] args) {
        Employee e=new Employee();
        System.out.println("Employee id is:"+e.empid);
        System.out.println("Employee name is:"+e.empname);
        Manager m=new Manager();
        System.out.println("Manager id is:"+m.empid);
        System.out.println("Manager name is:"+m.empname);
        Employee e1=new Manager();
        System.out.println("Employee id is:"+e1.empid); 
        System.out.println("Employee name is:"+e1.empname);
    }
}
