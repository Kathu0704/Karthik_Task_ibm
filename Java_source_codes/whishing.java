class GoodMorning extends Thread {
    public void run() {
        System.out.println("Good Morning");
    }
}

class GoodAfternoon extends Thread {
    public void run() {
        System.out.println("Good Afternoon");
    }
}

class GoodEvening extends Thread {
    public void run() {
        System.out.println("Good Evening");
    }
}

public class whishing {
    public static void main(String[] args) {

        GoodMorning t1 = new GoodMorning();
        GoodAfternoon t2 = new GoodAfternoon();
        GoodEvening t3 = new GoodEvening();

        t1.start();
        t2.start();
        t3.start();
    }
}