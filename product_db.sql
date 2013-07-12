USE sfclax_product_db;

CREATE TABLE IF NOT EXISTS categories(
	cat_id int not null auto_increment primary key,
	cat_name varchar(255) not null,
	cat_description text
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS subcats(
	subcat_id int not null auto_increment primary key,
	subcat_name varchar(255) not null,
	cat_id int not null,
	FOREIGN KEY fk_cat(cat_id)
	REFERENCES categories(cat_id)
	ON UPDATE CASCADE
	ON DELETE RESTRICT
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS  products(
	prd_id int not null auto_increment primary key,
	prd_name varchar(355) not null,
	prd_price float,
	prd_imageurl varchar(355) not null, 
	cat_id int not null,
	subcat_id int not null,
	FOREIGN KEY fk_cat(cat_id)
	REFERENCES categories(cat_id)
	ON UPDATE CASCADE
	ON DELETE RESTRICT,

	FOREIGN KEY fk_subcat(subcat_id)
	REFERENCES subcats(subcat_id)
	ON UPDATE CASCADE
	ON DELETE RESTRICT

) ENGINE = InnoDB;

INSERT INTO categories(cat_name)
VALUES('Flowers'),
	  ('Supplies'),
	  ('Etc');

INSERT INTO subcats(subcat_name,cat_id)
VALUES('Carnations',1),
	  ('Gypsophylia',1),
	  ('Roses',1),
	  ('Tulips',1),
	  ('Adhesive',2),
	  ('Baloons',2),
	  ('Ceramics',2),
	  ('Stock Vases',2),
	  ('Florist Tools',2);

INSERT INTO products(prd_name,prd_price,cat_id,subcat_id,prd_imageurl)
VALUES('Roses',12.99,1,3,'roses.jpg'),
	  ('Orchids',10.50,1,2,'orchids.jpg'),
	  ('Vase',25.95,2,4,'vase.jpg'),
	  ('Plant Food',5,2,5,'food.jpg');