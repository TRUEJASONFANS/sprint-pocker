CREATE USER 'sprinter'@localhost IDENTIFIED BY 'sprint_987';
GRANT ALL PRIVILEGES ON `sprint_poker`.* TO 'sprinter'@localhost;
FLUSH PRIVILEGES;
