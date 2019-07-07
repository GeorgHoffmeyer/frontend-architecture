package com.hoffmeyer.frontendarchitecture.teamCOrder.controller;

import com.hoffmeyer.frontendarchitecture.teamCOrder.model.Customer;
import com.hoffmeyer.frontendarchitecture.teamCOrder.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PutMapping("/{orderid}")
    public String addCustomer(@PathVariable int orderid, @RequestBody Customer customer) {

        return "GOTO PAYMENT";
    }
}
