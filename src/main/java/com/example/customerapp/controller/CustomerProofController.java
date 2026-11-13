package com.example.customerapp.controller;

import com.example.customerapp.entity.CustomerProofOfIdentity;
import com.example.customerapp.repository.CustomerProofRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/proofs")
@CrossOrigin(origins = "*")
public class CustomerProofController {

    @Autowired
    private CustomerProofRepository repository;

    @GetMapping
    public List<CustomerProofOfIdentity> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public CustomerProofOfIdentity addProof(@RequestBody CustomerProofOfIdentity proof) {
        return repository.save(proof);
    }

    @DeleteMapping("/{id}")
    public void deleteProof(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
