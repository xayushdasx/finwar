package com.example.customerapp.controller;

import com.example.customerapp.entity.CustomerName;
import com.example.customerapp.repository.CustomerNameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/names")
@CrossOrigin(origins = "*")
public class CustomerNameController {

    @Autowired
    private CustomerNameRepository repository;

    @GetMapping
    public List<CustomerName> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public CustomerName addName(@RequestBody CustomerName name) {
        return repository.save(name);
    }

    @DeleteMapping("/{id}")
    public void deleteName(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
