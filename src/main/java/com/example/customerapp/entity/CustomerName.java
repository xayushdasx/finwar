package com.example.customerapp.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class CustomerName {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nameType;
    private String nameValue;
    private LocalDate effectiveDate;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private CustomerDetails customer;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNameType() { return nameType; }
    public void setNameType(String nameType) { this.nameType = nameType; }

    public String getNameValue() { return nameValue; }
    public void setNameValue(String nameValue) { this.nameValue = nameValue; }

    public LocalDate getEffectiveDate() { return effectiveDate; }
    public void setEffectiveDate(LocalDate effectiveDate) { this.effectiveDate = effectiveDate; }

    public CustomerDetails getCustomer() { return customer; }
    public void setCustomer(CustomerDetails customer) { this.customer = customer; }
}
