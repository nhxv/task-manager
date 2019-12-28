package com.nhxv.taskmanager.model;

import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.Indexed;

import javax.persistence.*;

@Entity
@Table(name = "task_archive")
@Indexed
public class TaskArchive {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;

    @Column(name = "name")
    @Field
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "employee_name")
    @Field
    private String employeeName;

    public TaskArchive() {}

    public TaskArchive(String name, String description, String employeeName) {
        this.name = name;
        this.description = description;
        this.employeeName = employeeName;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }
}
