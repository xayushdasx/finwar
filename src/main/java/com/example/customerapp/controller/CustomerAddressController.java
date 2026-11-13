package com.example.customerapp.controller;

import com.example.customerapp.entity.CustomerAddress;
import com.example.customerapp.repository.CustomerAddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
@CrossOrigin(origins = "*")
public class CustomerAddressController {

    @Autowired
    private CustomerAddressRepository repository;

    @GetMapping
    public List<CustomerAddress> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public CustomerAddress addAddress(@RequestBody CustomerAddress address) {
        return repository.save(address);
    }

    @DeleteMapping("/{id}")
    public void deleteAddress(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
