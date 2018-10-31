package com.test2.wwww.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.test2.wwww.model.Product;
import com.test2.wwww.repository.ProductRepository;
import com.test2.wwww.service.ProductService;

@RestController
@CrossOrigin(origins = {"http://192.168.209.75:3000","http://localhost:3000" })
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;
    
    @Autowired
    private ProductRepository productRepository;

    @PostMapping("/productss")
    public List<Product> getAllProducts() {
        //return productService.getAllProducts();
        
        Sort sort = new Sort(Sort.Direction.ASC, "name");
    	Pageable pageable = new PageRequest(0, 7, sort);
    	Page<Product> pa = productRepository.findAll(pageable);
    	return pa.getContent(); 
    }
    
    @PostMapping("/productsPaged")
    public List<Product> getAllProductsPaged(@RequestParam int page, @RequestParam int pageSize) {
    	Sort sort = new Sort(Sort.Direction.ASC, "name");
    	Pageable pageable = new PageRequest(page, pageSize, sort);
    	Page<Product> pa = productRepository.findAll(pageable);
    	return pa.getContent();        
    }
    
    @GetMapping("/productsInsert")
    public void insertProduct(@RequestParam String name) {
    	Product entity = new Product();
    	entity.setName(name);
        productService.insertValue(entity);
    }
    
    @PostMapping("/products")
    public void insertPost(@RequestParam String name) {
    	Product entity = new Product();
    	entity.setName(name);
        productService.insertValue(entity);
    }
    
    @GetMapping("/getproducts")
    public List<String> getProducts() {
        return productRepository.getNameList();
    }
    
    @GetMapping("/finddistinct")
    public List<Product> findDistinct(@RequestParam String name) {
        return productRepository.findByName(name);
    }
    
    @DeleteMapping("/deleteId")   
    public void deleteById(@RequestParam Long id) {
        productRepository.delete(id);
    }
    
    @PutMapping("/updateName")
    public void updateName(@RequestParam Long id, @RequestParam(value = "noulNume") String newName) {
    	Product product = productRepository.getOne(id);
    	product.setName(newName);
        productRepository.save(product);
    }

    

    @GetMapping("/say")
    public String say() {
        return "Hello there";
    }
}
