package com.hoffmeyer.frontendarchitecture.teamAProduct.service;

import com.hoffmeyer.frontendarchitecture.teamAProduct.model.Product;
import com.hoffmeyer.frontendarchitecture.teamAProduct.model.ProductDetail;
import com.hoffmeyer.frontendarchitecture.teamAProduct.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.getAllProducts();
    }

    public Optional<ProductDetail> getProductDetail(int productId) {
        return productRepository.getAllDetails().stream().filter(pd -> pd.getProduct().getId() == productId).findFirst();
    }
}
