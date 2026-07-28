package com.customerapp;

import java.sql.*;

public class CustomerDAO {

    private String driver;
    private String url;
    private String userName;
    private String password;

    public void setDriver(String driver) {
        this.driver = driver;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void selectAllRows() throws Exception {

        System.out.println("Retrieving customer data..");

        Class.forName(driver);

        Connection con = DriverManager.getConnection(
                url,
                userName,
                password);

        Statement stmt = con.createStatement();

        ResultSet rs = stmt.executeQuery(
                "SELECT * FROM CustomerInfo");

        while (rs.next()) {

            int id = rs.getInt(1);
            String name = rs.getString(2);
            double fees = rs.getDouble(3);
            String address = rs.getString(4);

            System.out.println(
                    id + " " +
                            name + " " +
                            fees + " " +
                            address);
        }

        con.close();
    }
}