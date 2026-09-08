package com.example.employee.service;

import com.example.employee.entity.Employee;
import com.example.employee.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    // Create employee
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Get all employees
    public List<Employee> getEmployees() {
        return employeeRepository.findAll();
    }

    // Get employee by ID
    public Optional<Employee> getEmployeeById(Integer id) {
        return employeeRepository.findById(id);
    }

    // Update employee
    public Employee updateEmployee(Integer id, Employee employee) {

        Optional<Employee> existingEmployee =
                employeeRepository.findById(id);

        if (existingEmployee.isPresent()) {

            Employee existing = existingEmployee.get();

            existing.setName(employee.getName());
            existing.setDepartment(employee.getDepartment());
            existing.setEmail(employee.getEmail());

            return employeeRepository.save(existing);
        }

        return null;
    }

    // Delete employee
    public void deleteEmployee(Integer id) {
        employeeRepository.deleteById(id);
    }
}