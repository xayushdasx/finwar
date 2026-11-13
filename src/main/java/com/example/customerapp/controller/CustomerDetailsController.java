package com.example.customerapp.controller;

import com.example.customerapp.entity.CustomerDetails;
import com.example.customerapp.repository.CustomerDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/customers")
public class CustomerDetailsController {

    @Autowired
    private CustomerDetailsRepository repository;

    @GetMapping
    public List<CustomerDetails> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public CustomerDetails add(@RequestBody CustomerDetails customer) {
        return repository.save(customer);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
