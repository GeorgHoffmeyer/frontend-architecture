package com.hoffmeyer.frontendarchitecture.teamAProduct.service;

import com.hoffmeyer.frontendarchitecture.teamAProduct.model.Product;
import com.hoffmeyer.frontendarchitecture.teamAProduct.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.getAllProducts();
    }
}
