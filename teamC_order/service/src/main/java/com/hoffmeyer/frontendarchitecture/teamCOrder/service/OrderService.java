package com.hoffmeyer.frontendarchitecture.teamCOrder.service;

import com.hoffmeyer.frontendarchitecture.teamCOrder.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository repository;

    @PostConstruct
    private void init() {

    }

}
