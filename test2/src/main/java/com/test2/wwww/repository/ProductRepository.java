package com.test2.wwww.repository;

import com.test2.wwww.model.Product;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{
	
	@Query(nativeQuery = true, value = "select p.name from product p")
	public List<String> getNameList();
	
	public List<Product> findByName(String name);
}
