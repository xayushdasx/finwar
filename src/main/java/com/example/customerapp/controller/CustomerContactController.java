package com.example.customerapp.controller;

import com.example.customerapp.entity.CustomerContact;
import com.example.customerapp.repository.CustomerContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "*")
public class CustomerContactController {

    @Autowired
    private CustomerContactRepository repository;

    @GetMapping
    public List<CustomerContact> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public CustomerContact addContact(@RequestBody CustomerContact contact) {
        return repository.save(contact);
    }

    @DeleteMapping("/{id}")
    public void deleteContact(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
