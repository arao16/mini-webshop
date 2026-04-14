package com.arch.minishop.controller;

import com.arch.minishop.model.PurchaseRequest;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PurchaseController {

    private static final Logger logger = LoggerFactory.getLogger(PurchaseController.class);

    @PostMapping("/api/purchase")
    public ResponseEntity<Void> submitPurchase(@Valid @RequestBody PurchaseRequest purchaseRequest) {
        logger.info("Received purchase request with totalPrice={} and {} items.",
                purchaseRequest.getTotalPrice(),
                purchaseRequest.getItems().size());

        purchaseRequest.getItems().forEach(item ->
                logger.info("Purchased item: {} x{}",
                        item.getProduct().getName(),
                        item.getQuantity())
        );

        return ResponseEntity.ok().build();
    }
}
