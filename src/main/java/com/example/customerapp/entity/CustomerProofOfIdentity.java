package com.example.customerapp.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class CustomerProofOfIdentity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String idType;
    private String idValue;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDate effectiveDate;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private CustomerDetails customer;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getIdType() { return idType; }
    public void setIdType(String idType) { this.idType = idType; }

    public String getIdValue() { return idValue; }
    public void setIdValue(String idValue) { this.idValue = idValue; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public LocalDate getEffectiveDate() { return effectiveDate; }
    public void setEffectiveDate(LocalDate effectiveDate) { this.effectiveDate = effectiveDate; }

    public CustomerDetails getCustomer() { return customer; }
    public void setCustomer(CustomerDetails customer) { this.customer = customer; }
}
