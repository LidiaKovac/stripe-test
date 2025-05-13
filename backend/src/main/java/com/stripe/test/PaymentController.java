package com.stripe.test;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.net.URI;

@RestController
@RequestMapping("/payment")
@CrossOrigin({"*"})
public class PaymentController {

    @Value("${stripe.key}")
    String key;

    @PostMapping("/create-checkout-session")
    PaymentResponse createCheckoutSession(@RequestBody PaymentBody body) throws StripeException {
        try {

            String YOUR_DOMAIN = "http://localhost:5173/";
            Stripe.apiKey = key;
            double price = body.price();
            System.out.println(price);
            SessionCreateParams params = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl(YOUR_DOMAIN + "success")
                    .setCancelUrl(YOUR_DOMAIN + "cancel")
                    .addLineItem(SessionCreateParams.LineItem.builder()
                            .setQuantity(1L)
                            .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                    .setCurrency("eur")
                                    .setUnitAmount((long)(body.price() * 100)) //eur is cents not euros
                                    .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                            .setName("Pretend cart from pretend website")
                                            .build())
                                    .build())
                            .build())
                    .build();
            Session session = Session.create(params);
            return new PaymentResponse(session.getUrl());
        } catch (Exception e) {
            System.out.println(e);
            throw new RuntimeException(e);
        }
    }
}
