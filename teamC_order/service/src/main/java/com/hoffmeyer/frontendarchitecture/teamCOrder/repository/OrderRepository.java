package com.hoffmeyer.frontendarchitecture.teamCOrder.repository;

import com.hoffmeyer.frontendarchitecture.teamCOrder.model.Order;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Component
public class OrderRepository {
    private final List<Order> repository = new ArrayList<>();

    private int index = 0;

    @PostConstruct
    private void init() {
    }

}
