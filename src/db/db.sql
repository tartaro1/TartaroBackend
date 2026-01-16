-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-05-2024 a las 23:52:44
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tartaro`
--

DELIMITER $$
--
-- Procedimientos
--
DROP PROCEDURE IF EXISTS `IniciarSesionUsuario`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `IniciarSesionUsuario` (IN `correo` VARCHAR(100), IN `contrasena` VARCHAR(150), OUT `mensaje` VARCHAR(255))   BEGIN
    DECLARE usuario_existente INT;

    -- Verificar si el correo y la contraseña coinciden en la base de datos
    SELECT COUNT(*)
    INTO usuario_existente
    FROM Usuarios
    WHERE Correo = correo AND Contrasena = contrasena;

    IF usuario_existente = 1 THEN
        SET mensaje = 'Inicio de sesión exitoso';
    ELSE
        SET mensaje = 'Correo o contraseña incorrectos';
    END IF;
END$$

DROP PROCEDURE IF EXISTS `ObtenerDireccionEntrega`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `ObtenerDireccionEntrega` (IN `idRepartidor` INT, IN `idPedido` INT)   BEGIN
    DECLARE existeRepartidor INT;
    DECLARE existePedido INT;

    -- Verificar si el repartidor existe
    SELECT COUNT(*) INTO existeRepartidor
    FROM Usuarios
    WHERE ID_Usuario = idRepartidor AND ID_Rol = (SELECT ID_Rol FROM Cargo WHERE Nombre = 'Repartidor');

    -- Verificar si el pedido existe y está asignado al repartidor
    SELECT COUNT(*) INTO existePedido
    FROM Pedidos
    WHERE ID_Pedido = idPedido AND ID_Repartidor = idRepartidor;

    IF existeRepartidor > 0 AND existePedido > 0 THEN
        SELECT
            Pedidos.Direccion,
            Usuarios.Nombre AS Cliente
        FROM Pedidos
        INNER JOIN Usuarios ON Pedidos.Cliente = Usuarios.ID_Usuario
        WHERE Pedidos.ID_Pedido = idPedido;
    ELSEIF existeRepartidor = 0 THEN
        SELECT 'El repartidor no existe o no tiene el rol de repartidor' AS Mensaje;
    ELSEIF existePedido = 0 THEN
        SELECT 'El pedido no existe o no está asignado al repartidor' AS Mensaje;
    END IF;
END$$

DROP PROCEDURE IF EXISTS `RastrearEstadoPedido`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `RastrearEstadoPedido` (IN `ID_Pedido` INT)   BEGIN
  SELECT EstadoPedido
  FROM Pedidos
  WHERE ID_Pedido = ID_Pedido;
END$$

DROP PROCEDURE IF EXISTS `RegistrarUsuario`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `RegistrarUsuario` (IN `nombre` VARCHAR(100), IN `celular` VARCHAR(20), IN `cedula` INT(10), IN `direccion` VARCHAR(200), IN `correo` VARCHAR(100), IN `contrasena` VARCHAR(150), IN `id_rol` INT(11), IN `estado_usuario` VARCHAR(50))   BEGIN
    -- Insertar nueva información de usuario en la tabla Usuarios
    INSERT INTO Usuarios (Nombre, Celular, Cedula, Direccion, Correo, Contrasena, ID_Rol, EstadoUsuario)
    VALUES (nombre, celular, cedula, direccion, correo, contrasena, id_rol, estado_usuario);
END$$

DROP PROCEDURE IF EXISTS `ReporteEntregasPorRepartidor`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `ReporteEntregasPorRepartidor` (IN `ID_Repartidor` INT)   BEGIN
  SELECT
    p.ID_Pedido,
    p.FechaEntrega,
    u.Nombre,
    p.Direccion
  FROM Pedidos p
  INNER JOIN Usuarios u ON p.Cliente = u.ID_Usuario
  WHERE p.ID_Repartidor = ID_Repartidor
  AND p.EstadoPedido = 'Entregado';
END$$

DROP PROCEDURE IF EXISTS `ReporteVentasPorSupermercado`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `ReporteVentasPorSupermercado` ()   BEGIN
    SELECT
        s.NombreSupermercado,
        SUM(f.Total) AS 'Ventas Totales'
    FROM Facturas f
    INNER JOIN Pedidos p ON f.ID_Pedido = p.ID_Pedido
    INNER JOIN Usuarios u ON p.Cliente = u.ID_Usuario
    INNER JOIN Supermercados s ON u.ID_Supermercado = s.ID_Supermercado
    GROUP BY s.NombreSupermercado;
END$$

DROP PROCEDURE IF EXISTS `SP_ActualizarDisponibilidad`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_ActualizarDisponibilidad` (IN `disponible` INT(11), IN `id` INT(11))   BEGIN
UPDATE productos SET disponibilidad = disponible WHERE ID_Producto = id;
END$$

DROP PROCEDURE IF EXISTS `SP_ActualizarProductos`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_ActualizarProductos` (IN `id` INT(11), IN `nombre` VARCHAR(200), IN `id_categoria` INT(11), IN `marca` VARCHAR(20), IN `id_proveedor` INT(11), IN `descripcion` VARCHAR(200), IN `disponibilidad` INT(20), IN `calificacion` DECIMAL(3))   BEGIN
UPDATE productos p SET p.NombreProducto = nombre, p.ID_Categoria = id_categoria, p.Marca = marca, p.ID_Proveedor = id_proveedor, p.Descripcion = descripcion, p.Disponibilidad = disponibilidad, p.Calificacion = calificacion WHERE p.ID_Producto = id_producto;
END$$

DROP PROCEDURE IF EXISTS `SP_AddProducto`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_AddProducto` (IN `nombre` VARCHAR(200), IN `id_categoria` INT(11), IN `marca` VARCHAR(100), IN `id_proveedor` INT(11), IN `descripcion` VARCHAR(200), IN `precio` DECIMAL(10,3), IN `calificacion` INT(3))   BEGIN
INSERT INTO `productos`(`NombreProducto`, `ID_Categoria`, `Marca`, `ID_Proveedor`, `Descripcion`, `PrecioVenta`, `Calificacion` ) VALUES (nombre, id_categoria, marca, id_proveedor, descripcion, precio, calificacion);
END$$

DROP PROCEDURE IF EXISTS `SP_AsignarRepartidorPedido`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_AsignarRepartidorPedido` (IN `id_pedido` INT, IN `id_repartidor` INT)   BEGIN
  UPDATE Pedidos
  SET ID_Repartidor = id_repartidor
  WHERE ID_Pedido = id_pedido;
END$$

DROP PROCEDURE IF EXISTS `SP_BuscarCalificacion`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_BuscarCalificacion` (IN `minimo` DECIMAL(20), IN `maximo` DECIMAL(20))   BEGIN
    SELECT *
FROM Productos p
WHERE p.Calificacion BETWEEN minimo AND maximo;
END$$

DROP PROCEDURE IF EXISTS `SP_BuscarCategoria`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_BuscarCategoria` (IN `categoria` VARCHAR(200))   BEGIN
SELECT *
FROM Productos p INNER JOIN categorias c ON p.ID_Categoria = c.ID_Categoria
WHERE c.Nombre LIKE CONCAT('%', Categoria, '%');
END$$

DROP PROCEDURE IF EXISTS `SP_BuscarDisponibilidad`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_BuscarDisponibilidad` ()   BEGIN
SELECT ID_Producto, Disponibilidad FROM productos;
END$$

DROP PROCEDURE IF EXISTS `SP_BuscarMarca`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_BuscarMarca` (IN `marca` VARCHAR(200))   BEGIN
SELECT *
FROM Productos p
WHERE p.Marca LIKE CONCAT('%', marca, '%');
END$$

DROP PROCEDURE IF EXISTS `SP_BuscarMasVendidos`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_BuscarMasVendidos` ()   BEGIN

SELECT productos.*, COUNT( detallepedido.ID_Pedido) AS Ventas FROM productos LEFT JOIN detallepedido ON productos.ID_Producto = detallepedido.ID_Producto GROUP BY productos.ID_Producto ORDER BY ventas DESC;


END$$

DROP PROCEDURE IF EXISTS `SP_BuscarOfertas`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_BuscarOfertas` (IN `precio_viejo` DECIMAL(20))   BEGIN
    SELECT *
FROM Productos p
WHERE p.PrecioVenta < precio_viejo;
END$$

DROP PROCEDURE IF EXISTS `SP_BuscarPrecio`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_BuscarPrecio` (IN `minimo` DECIMAL(20), IN `maximo` DECIMAL(20))   BEGIN
    SELECT *
FROM Productos p
WHERE p.PrecioVenta BETWEEN minimo AND maximo;
END$$

DROP PROCEDURE IF EXISTS `SP_BuscarProductos`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_BuscarProductos` (IN `NOMBRE` VARCHAR(255))   BEGIN
    SELECT *
FROM Productos p
WHERE p.NombreProducto LIKE CONCAT('%', NOMBRE, '%');
END$$

DROP PROCEDURE IF EXISTS `SP_DefinirZonaEntrega`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_DefinirZonaEntrega` (IN `id_pedido` INT, IN `id_zona_entrega` INT)   BEGIN
  UPDATE Pedidos
  SET ID_ZonaEntrega = id_zona_entrega
  WHERE ID_Pedido = id_pedido;
END$$

DROP PROCEDURE IF EXISTS `SP_DesgloseCompra`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_DesgloseCompra` (IN `Cantidad` INT(10), IN `PrecioVenta` DECIMAL(10.3))   BEGIN
SELECT
    p.ID_Pedido,
    p.FechaPedido,
    SUM(dp.Cantidad * dp.PrecioVenta) AS 'Total de la Compra',
    SUM(dp.Cantidad * dp.PrecioVenta) * 0.16 AS 'Impuesto (16%)',
    SUM(dp.Cantidad * dp.PrecioVenta) * 1.16 AS 'Total a Pagar'
FROM Pedidos p
INNER JOIN DetallePedido dp ON p.ID_Pedido = dp.ID_Pedido
WHERE p.ID_Pedido = 1 -- Reemplaza 1 por el ID del pedido que deseas
GROUP BY p.ID_Pedido, p.FechaPedido;
END$$

DROP PROCEDURE IF EXISTS `SP_EliminarProdu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_EliminarProdu` (IN `_id` INT(11))   BEGIN
DELETE FROM Productos WHERE id = _id;
END$$

DROP PROCEDURE IF EXISTS `SP_GestionarContenidoInformativo`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GestionarContenidoInformativo` (IN `accion` VARCHAR(10), IN `id_contenido` INT, IN `titulo` VARCHAR(255), IN `contenido` TEXT)   BEGIN
  IF accion = 'insert' THEN
    INSERT INTO contenido_informativo (Titulo, Contenido) VALUES (titulo, contenido);
  ELSEIF accion = 'update' THEN
    UPDATE contenido_informativo SET Titulo = titulo, Contenido = contenido WHERE ID_Contenido = id_contenido;
  ELSEIF accion = 'delete' THEN
    DELETE FROM contenido_informativo WHERE ID_Contenido = id_contenido;
  END IF;
END$$

DROP PROCEDURE IF EXISTS `SP_GestionarCuentasUsuario`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GestionarCuentasUsuario` (IN `accion` VARCHAR(10), IN `id_usuario` INT(11), IN `nombre` VARCHAR(100), IN `celular` VARCHAR(20), IN `cedula` INT(10), IN `direccion` VARCHAR(200), IN `correo` VARCHAR(100), IN `contrasena` VARCHAR(150), IN `id_rol` INT(11), IN `estado_usuario` VARCHAR(50))   BEGIN
    IF accion = 'crear' THEN
        -- Crear una nueva cuenta de usuario
        INSERT INTO usuarios (Nombre, Celular, Cedula, Direccion, Correo, Contrasena, ID_Rol, EstadoUsuario)
        VALUES (nombre, celular, cedula, direccion, correo, contrasena, id_rol, estado_usuario);
    ELSEIF accion = 'actualizar' THEN
        -- Actualizar los datos de una cuenta de usuario existente
        UPDATE usuarios
        SET Nombre = nombre, Celular = celular, Cedula = cedula, Direccion = direccion,
            Correo = correo, Contrasena = contrasena, ID_Rol = id_rol, EstadoUsuario = estado_usuario
        WHERE ID_Usuario = id_usuario;
    ELSEIF accion = 'eliminar' THEN
        -- Eliminar una cuenta de usuario
        DELETE FROM usuarios WHERE ID_Usuario = id_usuario;
    END IF;
END$$

DROP PROCEDURE IF EXISTS `SP_GestionarPublicidad`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GestionarPublicidad` (IN `accion` VARCHAR(10), IN `id_publicidad` INT, IN `titulo` VARCHAR(255), IN `descripcion` TEXT, IN `imagen` VARCHAR(255))   BEGIN
  IF accion = 'insert' THEN
    INSERT INTO publicidad (Titulo, Descripcion, Imagen) VALUES (titulo, descripcion, imagen);
  ELSEIF accion = 'update' THEN
    UPDATE publicidad SET Titulo = titulo, Descripcion = descripcion, Imagen = imagen WHERE ID_Publicidad = id_publicidad;
  ELSEIF accion = 'delete' THEN
    DELETE FROM publicidad WHERE ID_Publicidad = id_publicidad;
  END IF;
END$$

DROP PROCEDURE IF EXISTS `SP_PrecioProductoImpuesto`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_PrecioProductoImpuesto` (IN `PrecioVenta` DECIMAL(10.3))   BEGIN
SELECT
    Productos.NombreProducto,
    Productos.PrecioVenta,
    Productos.PrecioVenta * 0.19 AS 'Impuesto (19%)',
    (Productos.PrecioVenta * 0.19) + productos.PrecioVenta AS 'Precio con Impuesto (19%)'
FROM Productos;
END$$

DROP PROCEDURE IF EXISTS `SP_RealizarCopiaSeguridad`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_RealizarCopiaSeguridad` (IN `nombre_copia` VARCHAR(100))   BEGIN
    DECLARE fecha_actual VARCHAR(50);
    SET fecha_actual = DATE_FORMAT(NOW(), '%Y%m%d%H%i%s');
    SET @backup_file = CONCAT(nombre_copia, '_', fecha_actual, '.sql');
    SET @query = CONCAT('mysqldump -u usuario -pcontraseña nombre_base_de_datos > ', @backup_file);
    PREPARE statement FROM @query;
    EXECUTE statement;
    DEALLOCATE PREPARE statement;
END$$

DROP PROCEDURE IF EXISTS `SP_RepartidorPedidosAsignados`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_RepartidorPedidosAsignados` ()   BEGIN
SELECT
    p.ID_Pedido,
    u.Nombre AS Cliente,
    p.Direccion,
    p.FechaPedido,
    p.EstadoPedido
FROM Pedidos p
INNER JOIN Usuarios u ON p.Cliente = u.ID_Usuario
WHERE p.ID_Repartidor = (SELECT ID_Usuario FROM Usuarios WHERE Nombre = 'Juan Pérez' AND ID_Rol = (SELECT ID_Rol FROM Cargo WHERE Nombre = 'Repartidor'));
END$$

DROP PROCEDURE IF EXISTS `SP_ReporteConversiones`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_ReporteConversiones` ()   BEGIN
  SELECT * FROM registro_conversiones;
END$$

DROP PROCEDURE IF EXISTS `SP_ReporteDisponibilidad`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_ReporteDisponibilidad` ()   BEGIN
SELECT ID_Producto, Disponibilidad FROM productos;
END$$

DROP PROCEDURE IF EXISTS `SP_ReporteEntregaPorRepartidor`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_ReporteEntregaPorRepartidor` (IN `FechaPedido` DATETIME, IN `Nombre` VARCHAR(100), IN `ID_Pedido` INT)   BEGIN
SELECT
    u.Nombre AS Repartidor,
    p.FechaPedido AS 'Fecha de Entrega',
    COUNT(p.ID_Pedido) AS 'Entregas Realizadas'
FROM Pedidos p
INNER JOIN Usuarios u ON p.ID_Repartidor = u.ID_Usuario
WHERE p.EstadoPedido = 'Entregado'
GROUP BY u.Nombre, p.FechaPedido;
END$$

DROP PROCEDURE IF EXISTS `SP_ReporteGastosProducto`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_ReporteGastosProducto` (IN `PrecioVenta` DECIMAL(10.3), IN `Cantidad` INT(10), IN `NombreProducto` INT)   BEGIN
SELECT
    p.NombreProducto,
    c.Nombre AS Categoria,
    p.PrecioVenta AS 'Precio de Venta',
    SUM(df.Cantidad * p.PrecioVenta) AS 'Gastos Totales'
FROM DetalleFactura df
INNER JOIN Productos p ON df.ID_Producto = p.ID_Producto
INNER JOIN Categorias c ON p.ID_Categoria = c.ID_Categoria
GROUP BY p.NombreProducto, c.Nombre, p.PrecioVenta;
END$$

DROP PROCEDURE IF EXISTS `SP_ReporteIngresos`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_ReporteIngresos` (IN `Precio` INT, IN `Cantidad` INT)   BEGIN
SELECT
  p.Nombre AS Producto,
  SUM(d.Cantidad * d.Precio) AS Ingresos
FROM Pedidos p
INNER JOIN DetallePedido d ON p.ID_Pedido = d.ID_Pedido
WHERE p.EstadoPedido = 'Entregado'
GROUP BY p.Nombre
ORDER BY Ingresos DESC;
END$$

DROP PROCEDURE IF EXISTS `SP_ReporteTrafico`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_ReporteTrafico` ()   BEGIN
  SELECT * FROM registro_trafico;
END$$

DROP PROCEDURE IF EXISTS `SP_ReporteVentas`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_ReporteVentas` ()   SELECT Productos.ID_Producto, Productos.NombreProducto, COUNT(DetallePedido.ID_Producto) AS Ventas FROM Productos LEFT JOIN DetallePedido On Productos.ID_Producto = DetallePedido.ID_Producto GROUP BY Productos.ID_Producto$$

DROP PROCEDURE IF EXISTS `SP_RestaurarCopiaSeguridad`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_RestaurarCopiaSeguridad` (IN `ruta_copia` VARCHAR(255))   BEGIN
    SET @query = CONCAT('mysql -u usuario -pcontraseña nombre_base_de_datos < ', ruta_copia);
    PREPARE statement FROM @query;
    EXECUTE statement;
    DEALLOCATE PREPARE statement;
END$$

DROP PROCEDURE IF EXISTS `SP_RestringirAcceso`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_RestringirAcceso` (IN `p_UsuarioID` INT, IN `p_FuncionalidadID` INT)   BEGIN
    DECLARE isAdmin INT;

    -- Verificar si el usuario es administrador
    SELECT COUNT(*) INTO isAdmin FROM usuarios WHERE ID_Usuario = p_UsuarioID AND ID_Rol = 1;

    -- Si el usuario es administrador, restringir acceso
    IF isAdmin > 0 THEN
        INSERT INTO accesos_restringidos (UsuarioID, FuncionalidadID) VALUES (p_UsuarioID, p_FuncionalidadID);
    END IF;
END$$

DROP PROCEDURE IF EXISTS `SP_VerPedidosAsignadosRepartidor`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_VerPedidosAsignadosRepartidor` ()   BEGIN
  DECLARE id_repartidor INT;

  -- Obtener el ID del repartidor de la sesión o interfaz
  SET id_repartidor = 123; -- Ejemplo, reemplazar por el valor real

  SELECT
    p.ID_Pedido,
    p.FechaPedido,
    p.Cliente,
    p.DireccionEntrega,
    p.FechaEntregaEstimada,
    p.EstadoPedido
  FROM Pedidos p
  INNER JOIN RepartidoresPedidos rp ON p.ID_Pedido = rp.ID_Pedido
  WHERE rp.ID_Repartidor = id_repartidor;
END$$

DROP PROCEDURE IF EXISTS `SP_VerRegistroAcciones`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_VerRegistroAcciones` ()   BEGIN
    SELECT * FROM registro_acciones;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargo`
--

DROP TABLE IF EXISTS `cargo`;
CREATE TABLE `cargo` (
  `ID_Rol` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Descripcion` varchar(150) NOT NULL,
  `EstadoRol` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cargo`
--

INSERT INTO `cargo` (`ID_Rol`, `Nombre`, `Descripcion`, `EstadoRol`) VALUES
(1, 'Usuario', 'q', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

DROP TABLE IF EXISTS `categorias`;
CREATE TABLE `categorias` (
  `ID_Categoria` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Descripcion` varchar(150) NOT NULL,
  `EstadoCategoria` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`ID_Categoria`, `Nombre`, `Descripcion`, `EstadoCategoria`) VALUES
(1, 'Electrónicos', 'Productos electrónicos', 'Activo'),
(2, 'Ropa', 'Ropa de moda', 'Activo'),
(3, 'Hogar', 'Artículos para el hogar', 'Activo'),
(4, 'Alimentos', 'Productos alimenticios', 'Activo'),
(5, 'Deportes', 'Artículos deportivos', 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contenido_informativo`
--

DROP TABLE IF EXISTS `contenido_informativo`;
CREATE TABLE `contenido_informativo` (
  `ID_Contenido` int(11) NOT NULL,
  `Titulo` varchar(255) NOT NULL,
  `Contenido` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `copiasseguridad`
--

DROP TABLE IF EXISTS `copiasseguridad`;
CREATE TABLE `copiasseguridad` (
  `ID` int(11) NOT NULL,
  `FechaHora` timestamp NOT NULL DEFAULT current_timestamp(),
  `NombreBD` varchar(100) DEFAULT NULL,
  `VersionBD` varchar(20) DEFAULT NULL,
  `Tipo` varchar(20) DEFAULT NULL,
  `Ubicacion` varchar(255) DEFAULT NULL,
  `Informacion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `copiasseguridad`
--

INSERT INTO `copiasseguridad` (`ID`, `FechaHora`, `NombreBD`, `VersionBD`, `Tipo`, `Ubicacion`, `Informacion`) VALUES
(1, '2024-03-06 19:28:18', 'Base de datos 1', 'v1.0', 'Automática', '/var/backups', 'Backup diario'),
(2, '2024-03-06 19:28:18', 'Base de datos 2', 'v1.1', 'Manual', '/backup', 'Backup semanal'),
(3, '2024-03-06 19:28:18', 'Base de datos 3', 'v1.2', 'Automática', '/home/backups', 'Backup mensual'),
(4, '2024-03-06 19:28:18', 'Base de datos 4', 'v1.3', 'Manual', '/mnt/backups', 'Backup trimestral'),
(5, '2024-03-06 19:28:18', 'Base de datos 5', 'v1.4', 'Automática', '/backups', 'Backup anual');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallefactura`
--

DROP TABLE IF EXISTS `detallefactura`;
CREATE TABLE `detallefactura` (
  `ID_DetalleFactura` int(11) NOT NULL,
  `ID_Factura` int(11) NOT NULL,
  `ID_Producto` int(11) NOT NULL,
  `Cantidad` int(10) NOT NULL,
  `PrecioVenta` decimal(10,2) NOT NULL,
  `Descuento` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detallefactura`
--

INSERT INTO `detallefactura` (`ID_DetalleFactura`, `ID_Factura`, `ID_Producto`, `Cantidad`, `PrecioVenta`, `Descuento`) VALUES
(1, 1, 1, 1, 50.00, 0),
(2, 2, 2, 2, 75.00, 0),
(3, 3, 3, 3, 100.00, 0),
(4, 4, 4, 4, 125.00, 0),
(5, 5, 5, 5, 150.00, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallepedido`
--

DROP TABLE IF EXISTS `detallepedido`;
CREATE TABLE `detallepedido` (
  `ID_DetallePedido` int(11) NOT NULL,
  `ID_Pedido` int(11) NOT NULL,
  `ID_Producto` int(11) NOT NULL,
  `Cantidad` int(10) NOT NULL,
  `PrecioVenta` decimal(10,2) NOT NULL,
  `Descuento` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detallepedido`
--

INSERT INTO `detallepedido` (`ID_DetallePedido`, `ID_Pedido`, `ID_Producto`, `Cantidad`, `PrecioVenta`, `Descuento`) VALUES
(1, 1, 1, 1, 50.00, 0),
(2, 2, 2, 2, 75.00, 0),
(3, 3, 3, 3, 100.00, 0),
(4, 4, 4, 4, 125.00, 0),
(5, 5, 5, 5, 150.00, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas`
--

DROP TABLE IF EXISTS `facturas`;
CREATE TABLE `facturas` (
  `ID_Factura` int(11) NOT NULL,
  `ID_Cliente` int(11) NOT NULL,
  `ID_Metodo_Pago` int(11) NOT NULL,
  `ID_Pedido` int(11) NOT NULL,
  `Fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `EstadoFactura` varchar(50) NOT NULL,
  `Impuesto` decimal(10,2) NOT NULL,
  `Total` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `facturas`
--

INSERT INTO `facturas` (`ID_Factura`, `ID_Cliente`, `ID_Metodo_Pago`, `ID_Pedido`, `Fecha`, `EstadoFactura`, `Impuesto`, `Total`) VALUES
(1, 1, 1, 1, '2024-03-06 19:28:03', '', 5.00, 55.00),
(2, 2, 2, 2, '2024-03-06 19:28:03', '', 10.00, 85.00),
(3, 3, 3, 3, '2024-03-06 19:28:03', '', 15.00, 115.00),
(4, 4, 4, 4, '2024-03-06 19:28:03', '', 20.00, 145.00),
(5, 5, 5, 5, '2024-03-06 19:28:03', '', 25.00, 175.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodopagos`
--

DROP TABLE IF EXISTS `metodopagos`;
CREATE TABLE `metodopagos` (
  `ID_Metodo_Pago` int(11) NOT NULL,
  `Monto` decimal(10,2) NOT NULL,
  `CodigoSeguridad` int(4) NOT NULL,
  `TipoTarjeta` varchar(100) NOT NULL,
  `NumeroTarjeta` varchar(20) NOT NULL,
  `Transacion` int(20) DEFAULT NULL,
  `FechaHora` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `metodopagos`
--

INSERT INTO `metodopagos` (`ID_Metodo_Pago`, `Monto`, `CodigoSeguridad`, `TipoTarjeta`, `NumeroTarjeta`, `Transacion`, `FechaHora`) VALUES
(1, 100.00, 1234, 'Crédito', '1234567890123456', 1, '2024-03-06 19:26:20'),
(2, 50.00, 5678, 'Débito', '2345678901234567', 2, '2024-03-06 19:26:20'),
(3, 200.00, 9012, 'Crédito', '3456789012345678', 3, '2024-03-06 19:26:20'),
(4, 75.00, 3456, 'Débito', '4567890123456789', 4, '2024-03-06 19:26:20'),
(5, 150.00, 7890, 'Crédito', '5678901234567890', 5, '2024-03-06 19:26:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
CREATE TABLE `pedidos` (
  `ID_Pedido` int(11) NOT NULL,
  `EstadoPedido` varchar(50) DEFAULT NULL,
  `Direccion` varchar(150) DEFAULT NULL,
  `Cliente` int(11) NOT NULL,
  `PrecioVenta` decimal(10,2) NOT NULL,
  `ID_Rol` int(11) NOT NULL,
  `FechaPedido` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`ID_Pedido`, `EstadoPedido`, `Direccion`, `Cliente`, `PrecioVenta`, `ID_Rol`, `FechaPedido`) VALUES
(1, 'En proceso', 'Calle Principal 123', 1, 50.00, 1, '2024-03-06 19:26:54'),
(2, 'En proceso', 'Avenida Secundaria 456', 2, 75.00, 1, '2024-03-06 19:26:54'),
(3, 'En proceso', 'Plaza Central 789', 3, 100.00, 1, '2024-03-06 19:26:54'),
(4, 'En proceso', 'Calle Lateral 234', 4, 125.00, 1, '2024-03-06 19:26:54'),
(5, 'En proceso', 'Avenida Principal 567', 5, 150.00, 1, '2024-03-06 19:26:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

DROP TABLE IF EXISTS `productos`;
CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `NombreProducto` varchar(100) NOT NULL,
  `ID_Categoria` int(11) DEFAULT NULL,
  `Marca` varchar(150) NOT NULL,
  `ID_Proveedor` int(11) NOT NULL,
  `Descripcion` varchar(200) NOT NULL,
  `PrecioVenta` decimal(10,3) NOT NULL,
  `Calificacion` double NOT NULL,
  `Disponibilidad` tinyint(1) NOT NULL DEFAULT 1,
  `imagen` blob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `NombreProducto`, `ID_Categoria`, `Marca`, `ID_Proveedor`, `Descripcion`, `PrecioVenta`, `Calificacion`, `Disponibilidad`, `imagen`) VALUES
(6, 'klimber loaliza', 1, 'Pornhub', 3, 'Skibidi Toilet', 300.000, 1, 1, NULL),
(7, 'aksdñakñdla', 3, 'Éxasdad', 3, 'Jeans anasdadchos', 300.000, 3, 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
CREATE TABLE `proveedores` (
  `ID_Proveedor` int(11) NOT NULL,
  `Nombre` varchar(150) NOT NULL,
  `Direccion` varchar(150) NOT NULL,
  `Telefono` int(14) NOT NULL,
  `Correo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`ID_Proveedor`, `Nombre`, `Direccion`, `Telefono`, `Correo`) VALUES
(1, 'Proveedor A', 'Calle 123', 123456789, 'proveedora@example.com'),
(2, 'Proveedor B', 'Avenida 456', 987654321, 'proveedorb@example.com'),
(3, 'Proveedor C', 'Plaza 789', 654123789, 'proveedorc@example.com'),
(4, 'Proveedor D', 'Calle Principal', 321987654, 'proveedord@example.com'),
(5, 'Proveedor E', 'Avenida Secundaria', 789456123, 'proveedore@example.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `ID_Usuario` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Celular` varchar(20) NOT NULL,
  `Cedula` int(20) NOT NULL,
  `Direccion` varchar(200) NOT NULL,
  `Correo` varchar(100) NOT NULL,
  `Contrasena` varchar(150) NOT NULL,
  `ID_Rol` int(11) DEFAULT NULL,
  `EstadoUsuario` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`ID_Usuario`, `Nombre`, `Celular`, `Cedula`, `Direccion`, `Correo`, `Contrasena`, `ID_Rol`, `EstadoUsuario`) VALUES
(1, 'Usuario 1', '1234567890', 1234567890, 'Calle Principal 123', 'usuario1@example.com', 'contraseña1', 1, 'Activo'),
(2, 'Usuario 2', '9876543210', 2147483647, 'Avenida Secundaria 456', 'usuario2@example.com', 'contraseña2', 1, 'Activo'),
(3, 'Usuario 3', '6541237890', 2147483647, 'Plaza Central 789', 'usuario3@example.com', 'contraseña3', 1, 'Activo'),
(4, 'Usuario 4', '3219876540', 2147483647, 'Calle Lateral 234', 'usuario4@example.com', 'contraseña4', 1, 'Activo'),
(5, 'Usuario 5', '7894561230', 2147483647, 'Avenida Principal 567', 'usuario5@example.com', 'contraseña5', 1, 'Activo');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cargo`
--
ALTER TABLE `cargo`
  ADD PRIMARY KEY (`ID_Rol`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`ID_Categoria`);

--
-- Indices de la tabla `copiasseguridad`
--
ALTER TABLE `copiasseguridad`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `detallefactura`
--
ALTER TABLE `detallefactura`
  ADD PRIMARY KEY (`ID_DetalleFactura`),
  ADD KEY `ID_Factura` (`ID_Factura`),
  ADD KEY `ID_Producto` (`ID_Producto`);

--
-- Indices de la tabla `detallepedido`
--
ALTER TABLE `detallepedido`
  ADD PRIMARY KEY (`ID_DetallePedido`),
  ADD KEY `ID_Pedido` (`ID_Pedido`),
  ADD KEY `ID_Producto` (`ID_Producto`);

--
-- Indices de la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD PRIMARY KEY (`ID_Factura`),
  ADD KEY `ID_Metodo_Pago` (`ID_Metodo_Pago`),
  ADD KEY `ID_Pedido` (`ID_Pedido`),
  ADD KEY `ID_Cliente` (`ID_Cliente`);

--
-- Indices de la tabla `metodopagos`
--
ALTER TABLE `metodopagos`
  ADD PRIMARY KEY (`ID_Metodo_Pago`),
  ADD UNIQUE KEY `Transacion` (`Transacion`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`ID_Pedido`),
  ADD KEY `ID_Rol` (`ID_Rol`),
  ADD KEY `Cliente` (`Cliente`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ID_Proveedor` (`ID_Proveedor`),
  ADD KEY `ID_Categoria` (`ID_Categoria`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`ID_Proveedor`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`ID_Usuario`),
  ADD UNIQUE KEY `Celular` (`Celular`),
  ADD UNIQUE KEY `Correo` (`Correo`),
  ADD UNIQUE KEY `Contrasena` (`Contrasena`),
  ADD KEY `ID_Rol` (`ID_Rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cargo`
--
ALTER TABLE `cargo`
  MODIFY `ID_Rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `ID_Categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `copiasseguridad`
--
ALTER TABLE `copiasseguridad`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `detallefactura`
--
ALTER TABLE `detallefactura`
  MODIFY `ID_DetalleFactura` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `detallepedido`
--
ALTER TABLE `detallepedido`
  MODIFY `ID_DetallePedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `facturas`
--
ALTER TABLE `facturas`
  MODIFY `ID_Factura` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `metodopagos`
--
ALTER TABLE `metodopagos`
  MODIFY `ID_Metodo_Pago` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `ID_Pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `ID_Proveedor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `ID_Usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD CONSTRAINT `facturas_ibfk_1` FOREIGN KEY (`ID_Metodo_Pago`) REFERENCES `metodopagos` (`ID_Metodo_Pago`),
  ADD CONSTRAINT `facturas_ibfk_2` FOREIGN KEY (`ID_Pedido`) REFERENCES `pedidos` (`ID_Pedido`),
  ADD CONSTRAINT `facturas_ibfk_3` FOREIGN KEY (`ID_Cliente`) REFERENCES `usuarios` (`ID_Usuario`);

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`ID_Rol`) REFERENCES `usuarios` (`ID_Rol`),
  ADD CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`Cliente`) REFERENCES `usuarios` (`ID_Usuario`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`ID_Proveedor`) REFERENCES `proveedores` (`ID_Proveedor`),
  ADD CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`ID_Categoria`) REFERENCES `categorias` (`ID_Categoria`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
