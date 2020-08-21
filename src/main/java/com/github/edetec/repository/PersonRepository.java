package com.github.edetec.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.github.edetec.model.Person;

public interface PersonRepository extends PagingAndSortingRepository<Person, Long> {

}
