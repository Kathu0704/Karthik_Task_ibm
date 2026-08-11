import java.io.*;

public class CharacterIOExample {
    public static void main(String[] args) throws IOException {

        // Writing characters to a file
        FileWriter writer = new FileWriter("data.txt");

        writer.write("Hello Java!");
        writer.write("\nCharacter I/O Example");

        writer.close();

        // Reading characters from a file
        FileReader reader = new FileReader("data.txt");

        int ch;

        while ((ch = reader.read()) != -1) {
            System.out.print((char) ch);
        }

        reader.close();
    }
}
