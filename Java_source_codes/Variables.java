class Variables{
    int normal_variable = 10;

    static int static_variable = 20;

    void increament(){
        normal_variable++;
        static_variable++;

        System.out.println("Normal variable: " + normal_variable);
        System.out.println("Static variable: " + static_variable);
        System.out.println();
    
    }
}
class Main{
    public static void main(String[] args) {
        Variables obj1 = new Variables();
        Variables obj2 = new Variables();

        System.out.println("object 1 increments: ");
        obj1.increament();
        System.out.println("object 2 increments: ");
        obj2.increament();
    }
}