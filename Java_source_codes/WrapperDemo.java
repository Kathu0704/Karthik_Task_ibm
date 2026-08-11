public class WrapperDemo {
    public static void main(String[] args) {

        // Autoboxing: primitive to wrapper
        int primitiveInt = 10;
        Integer wrappedInt = primitiveInt; // compiler converts automatically

        System.out.println("Primitive int: " + primitiveInt);
        System.out.println("Wrapped Integer: " + wrappedInt);

        // Explicitly creating a wrapper object
        Integer objInt = new Integer(25);

        // Unboxing: wrapper to primitive
        int unboxedInt = objInt; // compiler converts automatically

        System.out.println("Wrapper object: " + objInt);
        System.out.println("Unboxed int: " + unboxedInt);

        // Wrapper class method
        String str = "50";
        int number = Integer.parseInt(str);

        System.out.println("String to int: " + number);
    }
}