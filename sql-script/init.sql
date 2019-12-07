use mytodo;
INSERT IGNORE INTO `role` VALUES
(1, 'Admin role', 'ADMIN'),
(2, 'User role', 'USER');

INSERT IGNORE INTO `employee` VALUES
(1, 'admin@gmail.com', 'Admin', '$2y$12$D3wl929Xy6N9f01GjSWBy.rwFl7R9xPMaT76sgvdEoeII6NqVA8OO', 'admin');

INSERT IGNORE INTO `employee_roles` VALUES
(1, 1);