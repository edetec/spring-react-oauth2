package com.github.edetec.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.github.edetec.exception.BadRequestException;
import com.github.edetec.model.Person;
import com.github.edetec.repository.PersonRepository;




@RestController
@RequestMapping(value = "api/v1/persons")
public class PersonResource {

	@Autowired
	PersonRepository personRepository;

	@GetMapping
	public ResponseEntity<List<Person>> getAllPersons() {
		List<Person> list = (List<Person>) personRepository.findAll();
		return new ResponseEntity<List<Person>>(list, HttpStatus.OK);

	}

	@GetMapping(path = "/{id}")
	public ResponseEntity<Person> getPersonById(@PathVariable long id) {
		return personRepository.findById(id).map(person -> {
			return new ResponseEntity<>(person, HttpStatus.OK);
		}).orElse(ResponseEntity.notFound().build());
	}

	@PostMapping
	public ResponseEntity<Person> newPerson(@Valid @RequestBody Person personParam) {
		try {
		Person person = personRepository.save(personParam);
		return new ResponseEntity<>(person, HttpStatus.OK);
		} catch (DataIntegrityViolationException e) {
			throw new BadRequestException("This CPF has already been registered");
		}
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<Person> update(@PathVariable long id, @Valid @RequestBody Person person) {
		return personRepository.findById(id).map(record -> {
			record.setName(person.getName());
			record.setEmail(person.getEmail());
			record.setCpf(person.getCpf());
			record.setGender(person.getGender());
			record.setNationality(person.getNationality());
			record.setNaturalness(person.getNaturalness());
			record.setDateOfBirth(person.getDateOfBirth());
			Person updated = personRepository.save(record);
			return ResponseEntity.ok().body(updated);
		}).orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping(path = { "/{id}" })
	public ResponseEntity<?> delete(@PathVariable long id) {
		return personRepository.findById(id).map(record -> {
			personRepository.deleteById(id);
			return ResponseEntity.ok().build();
		}).orElse(ResponseEntity.notFound().build());
	}
}
