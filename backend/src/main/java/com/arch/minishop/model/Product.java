package com.arch.minishop.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private String category;
    private String brand;
    private Integer stock;
    private String imageUrl;
}