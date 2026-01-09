create table clientes (
    id_cliente int primary key auto_increment,
    nombre varchar(100) not null,
    direccion varchar(200),
    telefono varchar(15),
    email varchar(100) unique
);

create table productos (
    id_producto int primary key auto_increment,
    nombre varchar(100) not null,
    descripcion text,
    precio decimal(10,2) not null,
    stock int not null
);