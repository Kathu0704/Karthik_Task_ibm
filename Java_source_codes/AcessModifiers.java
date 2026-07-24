class Student {

    public String name = "Karthik";     
    protected int rollNo = 101;          
    String course = "Java";               
    private int marks = 90;              

    public void displayMarks() {
        System.out.println("Marks: " + marks); 
    }
}

class AcessModifiers {
    public static void main(String[] args) {

        Student s = new Student();

        System.out.println("Name: " + s.name);       
        System.out.println("Roll No: " + s.rollNo);  
        System.out.println("Course: " + s.course);   

       

        s.displayMarks(); 
    }
}