package com.example.customerapp.repository;

import com.example.customerapp.entity.CustomerProofOfIdentity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerProofRepository extends JpaRepository<CustomerProofOfIdentity, Long> {
}
