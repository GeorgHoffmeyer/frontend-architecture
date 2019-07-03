package com.hoffmeyer.frontendarchitecture.teamAProduct.controller;

import com.hoffmeyer.frontendarchitecture.teamAProduct.service.ProductService;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {

    private ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }
}
