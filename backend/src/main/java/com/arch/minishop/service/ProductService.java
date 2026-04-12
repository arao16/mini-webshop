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
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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

    public Optional<Product> getProductById(Long id) {
        return products.stream()
                .filter(product -> product.getId().equals(id))
                .findFirst();
    }

    public List<Product> searchProducts(String query) {
        if (query == null || query.isBlank()) {
            return getAllProducts();
        }

        String lowerQuery = query.toLowerCase();
        return products.stream()
                .filter(product ->
                        contains(product.getName(), lowerQuery) ||
                                contains(product.getDescription(), lowerQuery) ||
                                contains(product.getCategory(), lowerQuery) ||
                                contains(product.getBrand(), lowerQuery))
                .toList();
    }

    public List<String> getAllCategories() {
        Set<String> categories = new LinkedHashSet<>();
        for (Product product : products) {
            categories.add(product.getCategory());
        }
        return new ArrayList<>(categories);
    }

    public List<String> getAllBrands() {
        Set<String> brands = new LinkedHashSet<>();
        for (Product product : products) {
            brands.add(product.getBrand());
        }
        return new ArrayList<>(brands);
    }

    private boolean contains(String value, String query) {
        return value != null && value.toLowerCase().contains(query);
    }
}