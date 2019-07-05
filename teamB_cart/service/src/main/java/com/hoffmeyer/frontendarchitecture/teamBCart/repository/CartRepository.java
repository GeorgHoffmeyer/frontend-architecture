package com.hoffmeyer.frontendarchitecture.teamBCart.repository;

import com.hoffmeyer.frontendarchitecture.teamBCart.model.Cart;
import com.hoffmeyer.frontendarchitecture.teamBCart.model.CartItem;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Component
public class CartRepository {
    private final List<Cart> repository = new ArrayList<>();

    private int index = 0;

    @PostConstruct
    private void init() {
    }

    public int getNextIndex() {
        return ++index;
    }

    public List<Cart> get() {
        return repository;
    }
}
