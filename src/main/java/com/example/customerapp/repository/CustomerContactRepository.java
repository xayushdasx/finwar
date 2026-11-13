package com.example.customerapp.repository;

import com.example.customerapp.entity.CustomerContact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerContactRepository extends JpaRepository<CustomerContact, Long> {
}
