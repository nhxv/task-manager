# Task manager
A fullstack web application that allows manager to assign tasks to their employees.

Live demo: coming soon.

### Built with
HTML, CSS, SCSS, NgBootstrap, Typescript, Angular, Maven, Java, Spring Boot, Spring Security, Spring Data JPA, Hibernate Search, MySQL

### How to run locally

    - run create-user.sql in /sql-script folder to create a new database user
    - run Spring application to create database tables
    - run init in /sql-script folder to create admin account (username: admin, password: password)
    - open /web folder and run Angular server

### Main features
Admin account can:

    - create, view, edit, delete, archive and assign tasks to employees
    - view, delete, and search for task archives
    - view and delete employees
    - edit personal information

Employee account can:

    - view, accept and complete assigned task
    - edit personal information

Guest can:

    - create an employee account

(*) Due to business requirement, employee can only work on one task at a time.







