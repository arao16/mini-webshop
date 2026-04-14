package com.arch.minishop.model;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseRequest {

    @NotNull(message = "items must not be null")
    @NotEmpty(message = "items must not be empty")
    @Valid
    private List<PurchaseItem> items;

    @NotNull(message = "totalPrice must not be null")
    private Double totalPrice;
}
