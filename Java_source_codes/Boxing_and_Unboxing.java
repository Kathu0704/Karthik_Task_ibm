public class Boxing_and_Unboxing {
    public static void main(String[] args){
         int num = 10;

        Integer obj = num;   // Auto boxing

        System.out.println(obj);

        Integer obj1 = 20;

        int num1 = obj1;   // Auto unboxing

        System.out.println(num1);
    }

}
