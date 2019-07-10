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
    public ResponseEntity<?> getProduct(@PathVariable int productid) {

        return productService.getProdcut(productid)
                .map(product -> new ResponseEntity<>(product, HttpStatus.OK))
                .orElse(new ResponseEntity("Product not found", HttpStatus.NOT_FOUND));
    }

    @GetMapping("/{productid}/details")
    public ResponseEntity<?> getProductDetail(@PathVariable int productid) {
        Optional<ProductDetail> productDetail = productService.getProductDetail(productid);

        if(productDetail.isPresent()) {
            return new ResponseEntity<>(productDetail, HttpStatus.OK);
        }

        return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
    }
}
