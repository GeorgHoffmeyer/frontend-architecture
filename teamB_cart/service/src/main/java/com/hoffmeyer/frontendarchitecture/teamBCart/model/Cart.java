package com.hoffmeyer.frontendarchitecture.teamBCart.model;

import lombok.Data;

import java.util.List;

@Data
public class Cart {

    private final int id;
    private final List<CartItem> cartItems;
}
