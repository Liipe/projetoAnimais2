CREATE TABLE guests (
  id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  mytask VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE=InnoDB;