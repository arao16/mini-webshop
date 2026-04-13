package com.arch.minishop.service;

import com.arch.minishop.model.Product;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class ProductService {

    private final ObjectMapper objectMapper;
    private List<Product> products = new ArrayList<>();

    public ProductService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @PostConstruct
    public void loadProducts() {
        try (InputStream inputStream = new ClassPathResource("products.json").getInputStream()) {
            products = objectMapper.readValue(inputStream, new TypeReference<>() {});
            products.sort(Comparator.comparing(Product::getId));
        } catch (IOException e) {
            throw new IllegalStateException("Failed to load products.json", e);
        }
    }

    public List<Product> getAllProducts() {
        return products;
    }
}