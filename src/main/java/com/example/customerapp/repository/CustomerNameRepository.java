package com.example.customerapp.repository;

import com.example.customerapp.entity.CustomerName;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerNameRepository extends JpaRepository<CustomerName, Long> {
}
