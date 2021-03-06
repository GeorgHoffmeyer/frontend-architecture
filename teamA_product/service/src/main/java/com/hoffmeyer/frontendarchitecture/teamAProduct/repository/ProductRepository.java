package com.hoffmeyer.frontendarchitecture.teamAProduct.repository;

import com.hoffmeyer.frontendarchitecture.teamAProduct.model.Product;
import com.hoffmeyer.frontendarchitecture.teamAProduct.model.ProductDetail;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class ProductRepository {

    private final List<Product> products = new ArrayList<>();
    private final List<ProductDetail> productDetails = new ArrayList<>();

    public List<Product> getAllProducts() {
        return products;
    }

    @PostConstruct
    private void init() {

        Product a = new Product(1, "Produkt A", "Summary for product A");
        Product b = new Product(2, "Product B", "Summary for product B");

        products.add(a);
        products.add(b);

        ProductDetail detailsA = new ProductDetail(a, "Einzelheiten zu Produkt A");
        ProductDetail detailsB = new ProductDetail(b, "Einzelheiten zu Produkt B");

        productDetails.add(detailsA);
        productDetails.add(detailsB);
    }

    public List<ProductDetail> getAllDetails() {
        return productDetails;
    }
}
