package com.hoffmeyer.frontendarchitecture.teamAProduct.service;

import com.hoffmeyer.frontendarchitecture.teamAProduct.repository.ProductRepository;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    private ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
}
