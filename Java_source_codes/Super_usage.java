class Employee {
    String name="kathu";
    int age =20;

void display(){
    
    System.out.println("Name: "+name);
    System.out.println("Age: "+age);
}

}
class Manager extends Employee{
    void getdata1(){
        int age1=this.age;
        String name1=this.name;
        System.out.println("Name: "+name1);             
        System.out.println("Age: "+age1);
        
    }
    public static void main(String[] args) {
        Manager m1=new Manager();
        m1.getdata1();
    }
}
