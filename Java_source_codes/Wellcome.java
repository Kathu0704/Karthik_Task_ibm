import java.util.Scanner;
public class Wellcome {
    public static void main(String[] args) {
        Scanner sc=new Scanner (System.in);
        String loginid="Kathu@ibm.com";
        String pass="kathu@2003";
        while(true){
            System.out.println("Enter Login ID :");
            String loginId=sc.nextLine();
            System.out.println("Enter Password :");
            String password=sc.nextLine();

    
        if (loginId==loginid && password==pass){
            System.out.println("****Login Successful************** wellome ***********");
            break;
        }
        else{
            System.out.println("Login Failed");
            continue;
        }
    }
    
}
