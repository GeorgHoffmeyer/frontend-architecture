package com.hoffmeyer.frontendarchitecture.teamBCart.controller;

import com.hoffmeyer.frontendarchitecture.teamBCart.model.CartItem;
import com.hoffmeyer.frontendarchitecture.teamBCart.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public List<CartItem> getItemsInCart() {
        return cartService.getItemsInCart(1);
    }

    @PutMapping
    public void addItemToCart(@RequestBody CartItem item) {
        cartService.addItemToCart(1, item);
    }
}
