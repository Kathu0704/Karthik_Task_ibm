package Junit;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import com.example.Junit.Demo01_Calculator;

class Demo01_Basic_UnitTest {

    @Test
    void testAddition() {
        Demo01_Calculator calc = new Demo01_Calculator();
        assertEquals(15, calc.add(10, 5));
    }

    @Test
    void testAdditionFail() {
        Demo01_Calculator calc = new Demo01_Calculator();
        assertEquals(151, calc.add(10, 5), "Expected 15 but actual is different");
    }
}