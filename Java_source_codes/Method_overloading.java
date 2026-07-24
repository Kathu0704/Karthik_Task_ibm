class Parent_class {
    int sum_num(int a,int b){
        return a+b;
    }
    int sum_num(int a,int b,int c){
        return a+b+c;
    }
    void display (int roll_number,String name){
        System.out.println("Roll Number: " + roll_number);
        System.out.println("Name: " + name);
    }
    void display(String name,int roll_number){
        System.out.println("Name: " + name);
        System.out.println("Roll Number: " + roll_number);
    }
    
}
public class Method_overloading{
    public static void main(String[] args) {
        Parent_class obj = new Parent_class();
        System.out.println("Sum of two numbers: " + obj.sum_num(10, 20));
        System.out.println("Sum of three numbers: " + obj.sum_num(10, 20, 30));
        obj.display(101, "John");
        obj.display("Alice", 102);
    }
}
