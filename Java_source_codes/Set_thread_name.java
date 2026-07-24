class GoodMorning extends Thread {
    public void run() {
        System.out.println(getName() + " : Good Morning");
    }
}

class GoodAfternoon extends Thread {
    public void run() {
        System.out.println(getName() + " : Good Afternoon");
    }
}

class GoodEvening extends Thread {
    public void run() {
        System.out.println(getName() + " : Good Evening");
    }

}

public class Set_thread_name {
    public static void main(String[] args) {

        GoodMorning t1 = new GoodMorning();
        GoodAfternoon t2 = new GoodAfternoon();
        GoodEvening t3 = new GoodEvening();
        System.out.println("Thread names set. helloo");
        t1.setName("Morning");
        t2.setName("Afternoon");
        t3.setName("Evening");
        t1.start();
        t2.start();
        t3.start();
        System.out.println("Thread 1 name: " + t1.getName());
        System.out.println("Thread 2 name: " + t2.getName());
        System.out.println("Thread 3 name: " + t3.getName());
    }
}