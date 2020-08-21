package com.github.edetec.repository;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import com.github.edetec.model.Person;

@RunWith(SpringRunner.class)
@DataJpaTest
class PersonRepositoryTest {

	@Autowired
	private TestEntityManager entityManager;

	@Autowired
	private PersonRepository personRepository;

	@SuppressWarnings("deprecation")
	@Test
	public void whenFindAll_thenReturnPersonList() {
		GregorianCalendar dateOfBirth = new GregorianCalendar(2000, 1, 15);
		Person alex = new Person();
		alex.setCpf("049.909.529-44");
		alex.setName("Alex Silva");
		alex.setDateOfBirth(Date.from(dateOfBirth.toInstant()));
		entityManager.persist(alex);
		entityManager.flush();

		
		long count = personRepository.count();

		assertEquals(count, 1);
	}

}
