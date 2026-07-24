import java.util.LinkedList;
public class Demo_linkedlist {
    public static void main(String[] args) {
        LinkedList<String> names = new LinkedList<String>();
        names.add("kathu");
        names.add("vicky");
        names.add("monika");
        System.out.println(names);
        names.addFirst("karthik");
        System.out.println(names);
        names.remove(2);
        System.out.println(names);
        names.addLast("sai");
        System.out.println(names);
        names.removeLast();
        System.out.println(names);
    }
}
