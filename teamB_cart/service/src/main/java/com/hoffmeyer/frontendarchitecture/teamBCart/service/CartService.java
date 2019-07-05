package com.hoffmeyer.frontendarchitecture.teamBCart.service;

import com.hoffmeyer.frontendarchitecture.teamBCart.model.Cart;
import com.hoffmeyer.frontendarchitecture.teamBCart.model.CartItem;
import com.hoffmeyer.frontendarchitecture.teamBCart.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository repository;

    @PostConstruct
    private void init() {
        createNewCart();
    }

    public void addItemToCart(int cartId, CartItem item) {

        repository.get().stream()
                .filter(c -> cartId == c.getId())
                .findFirst()
                .map(cart1 -> cart1.getCartItems().add(item))
                .orElseThrow();
    }

    public List<CartItem> getItemsInCart(int cartId) {
        return repository.get().stream()
                .filter(c -> cartId == c.getId())
                .findFirst()
                .map(cart1 -> cart1.getCartItems())
                .orElseThrow();
    }

    public Cart createNewCart() {
        Cart cart = new Cart(repository.getNextIndex(), new ArrayList<>());
        repository.get().add(cart);
        return cart;
    }
}
