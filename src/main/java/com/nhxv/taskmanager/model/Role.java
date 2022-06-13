package com.nhxv.taskmanager.model;

import javax.persistence.*;

@Entity
@Table(name = "role")
public class Role {

    public static final String ADMIN = "ADMIN";
    public static final String USER = "USER";
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column
    private long id;

    @Column
    private String name;

    public Role() {}

    public Role(String name) {
        this.name = name;
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
}
