package com.wellcome;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class BeanFactoryDemo {

    public static void main(String[] args) {

        BeanFactory factory = new ClassPathXmlApplicationContext("bean-factory-demo.xml");

        Student student = (Student) factory.getBean("student");

        System.out.println("Student Bean Details:");
        System.out.println(student);
    }
}