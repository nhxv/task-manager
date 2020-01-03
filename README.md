## Task manager
A full stack web application allowing leader to assign tasks to their employees.

Live demo: coming soon™.

### Features
Admin account can: 
- create, view, edit, delete, and assign tasks to employees
- view, delete, and search for task archives
- view and delete employees
- edit personal information

Employee account can:
- view, accept and complete assigned task
- edit personal information

Guest can:
- create an employee account

*Due to 1-1 relationship between employee and task, admin can only assign one task to each employee. 

### Built with
HTML, CSS, SCSS, NgBootstrap, Typescript, Angular, Maven, Java, Spring Boot, Spring Security, Spring Data JPA, Hibernate Search, MySQL

### Installation
Follow these steps to run this application on your local server:
1. Run create-user in /sql-script directory to create a new database user
2. Run Spring boot application to create database tables
3. Run init in /sql-script directory to create an admin account (username: admin, password: password)
4. Run Angular dev server with command ng serve in /web directory







