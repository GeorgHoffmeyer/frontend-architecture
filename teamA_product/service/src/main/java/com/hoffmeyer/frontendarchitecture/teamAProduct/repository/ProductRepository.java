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

    private List<Product> products;
    private List<ProductDetail> productDetails;

    public List<Product> getAllProducts() {
        return products;
    }

    @PostConstruct
    private void init() {
        products = new ArrayList<>();
        productDetails = new ArrayList<>();

        Product a = new Product(1, "Produkt A");
        Product b = new Product(2, "Product B");

        products.add(a);
        products.add(b);

        ProductDetail detailsA = new ProductDetail(a, "Einzelheiten zu Produkt A");
        ProductDetail detailsB = new ProductDetail(b, "Einzelheiten zu Produkt B");

        productDetails.add(detailsA);
        productDetails.add(detailsB);
    }

    public Optional<ProductDetail> getDetail(int productId) {
        return productDetails.stream().filter(pd -> pd.getProduct().getId() == productId).findFirst();
    }
}
