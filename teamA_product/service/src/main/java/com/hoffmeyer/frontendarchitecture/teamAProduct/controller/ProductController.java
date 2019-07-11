package com.hoffmeyer.frontendarchitecture.teamAProduct.controller;

import com.hoffmeyer.frontendarchitecture.teamAProduct.model.Product;
import com.hoffmeyer.frontendarchitecture.teamAProduct.model.ProductDetail;
import com.hoffmeyer.frontendarchitecture.teamAProduct.service.ProductService;
import io.netty.handler.codec.http2.Http2StreamFrameToHttpObjectCodec;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/")
public class ProductController {

    private ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{productid}")
    public Product getProduct(@PathVariable int productid) {

        return productService.getProdcut(productid).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/{productid}/details")
    public ProductDetail getProductDetail(@PathVariable int productid) {
        return productService.getProductDetail(productid).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
