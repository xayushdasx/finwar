package com.example.customerapp.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class CustomerContact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String contactType;
    private String contactValue;
    private LocalDate effectiveDate;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private CustomerDetails customer;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getContactType() { return contactType; }
    public void setContactType(String contactType) { this.contactType = contactType; }

    public String getContactValue() { return contactValue; }
    public void setContactValue(String contactValue) { this.contactValue = contactValue; }

    public LocalDate getEffectiveDate() { return effectiveDate; }
    public void setEffectiveDate(LocalDate effectiveDate) { this.effectiveDate = effectiveDate; }

    public CustomerDetails getCustomer() { return customer; }
    public void setCustomer(CustomerDetails customer) { this.customer = customer; }
}
