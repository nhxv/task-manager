## Task manager
A full stack web application allowing leader to assign tasks to employees.

Live demo: coming soon™

### Features
Admin account can: 
- create, view, edit, delete, and assign task to employees
- view and delete task archives
- view and delete employees

Employee account can:
- accept and complete task
- edit personal account information

*Due to 1-1 relationship between employee and task, admin can only assign 1 task to each employee 

### Built with
HTML, CSS, SCSS, NgBootstrap, Typescript, Angular, Maven, Java, Spring Boot, Spring Security, Spring Data JPA, Hibernate Search, MySQL

### Installation
Follow these steps to run this application on your local server:
1. Run create-user in /sql-script directory to create a new database user
2. Run Spring boot application to create database tables
3. Run init in /sql-script directory to create an admin account (username: admin, password: password)
4. Run Angular dev server with command ng serve in /web directory







