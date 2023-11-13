package com.chatgpt.controllers;

import com.chatgpt.entity.responses.PurchaseResponse;
import com.chatgpt.services.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Objects;

@RestController
public class PurchaseController {

    @Autowired
    PurchaseService purchaseService;

    @PostMapping(path = "/purchase")
    public PurchaseResponse<?> getItem(@RequestParam Map<String, String> allRequestParams) {

        for (String name : allRequestParams.keySet()) {
            String value = allRequestParams.get(name);
            System.out.println(name + " : " + value);
        }

        if (
                Objects.equals(allRequestParams.get("notification_type"), "get_subscription") ||
                        Objects.equals(allRequestParams.get("notification_type"), "get_subscription_test")
        ) {
            System.out.println("purchase____________________get_subscription");
            purchaseService.isAccessSig(allRequestParams);

            return new PurchaseResponse<>(purchaseService.getItem(allRequestParams.get("item")));
        }

        if (
                Objects.equals(allRequestParams.get("notification_type"), "subscription_status_change") ||
                        Objects.equals(allRequestParams.get("notification_type"), "subscription_status_change_test")
        ) {
            System.out.println("purchase____________________subscription_status_change");

            purchaseService.isAccessSig(allRequestParams);

            return new PurchaseResponse<>(purchaseService.getItem(allRequestParams.get("item")));
        }

        return null;

    }

}
