package com.hoffmeyer.frontendarchitecture.teamCOrder.controller;

import com.hoffmeyer.frontendarchitecture.teamCOrder.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
}
