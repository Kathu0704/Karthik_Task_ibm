package com.customerapp;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Main {

    public static void main(String[] args) throws Exception {

        ApplicationContext context = new ClassPathXmlApplicationContext(
                "beans.xml");

        CustomerDAO dao = context.getBean(
                "customerDAO",
                CustomerDAO.class);

        dao.selectAllRows();

    }
}