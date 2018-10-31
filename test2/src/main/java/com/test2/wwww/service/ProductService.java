package com.test2.wwww.service;

import com.test2.wwww.model.Product;
import com.test2.wwww.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    @Transactional
    public void insertValue(Product entity) {
        productRepository.save(entity);        
    }
    
//    public List<String> getNameList() {
//        return productRepository.findDistinctName();
//    }
}
