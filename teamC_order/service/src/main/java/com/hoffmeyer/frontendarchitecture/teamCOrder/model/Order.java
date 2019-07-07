package com.hoffmeyer.frontendarchitecture.teamCOrder.model;

import lombok.Data;

import java.util.List;

@Data
public class Order {

    private int id;
    private List<OrderItem> orderItems;
    private Customer customer;
    private String payment;
    private List<String> finishedForms;
}
