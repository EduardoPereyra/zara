# ZARA

Las parrillas de producto de ZARA.COM están organizadas en filas de productos. Cada una de estas filas puede tener entre 1 y 3 productos y se puede escoger mediante la selección de una plantilla su alineación en la pantalla: alineado a la izquierda, a la derecha y al centro.
La prueba consiste en tener una pantalla en donde se carguen X productos cargados desde una url y en donde puedan separar esos productos en varias filas haciendo drag & drop de los elementos y asociarles una plantilla de alineado a la izquierda, alineado al centro, y alineado a la derecha. Finalmente el usuario podrá guardar la parrilla.

Requisitos
- La pantalla cargará los productos a partir de identificadores recibidos en la url y se distribuirán en filas.
- En todo momento, se debe ver la fotografía, el nombre y el precio de cada uno de los productos.
- Se pueden crear tantas filas como se quiera mientras haya elementos en la fila.
- Las filas deben tener entre 1 y 3 elementos.
- Los usuarios deben poder añadir elementos a las filas e intercambiarlos entre las diferentes filas creadas o entre los elementos de una misma fila usando drag and drop.
- Los usuarios deben poder mover las filas de posición.
- Se puede hacer zoom-out y zoom-in sobre el editor de la parrilla. Si se añaden
muchas filas, se pierde el contexto de cómo quedaría la parrilla. El zoom facilita poder ver el máximo de filas posibles. Este zoom debe hacerse solamente sobre la zona del editor y no sobre la página entera, por lo que no se puede hacer uso del zoom nativo del navegador.
- Se puede asociar y desasociar una plantilla a una fila.
- Los usuarios deben ver el nombre de la plantilla que tiene una determinada fila.
- A parte de ver el nombre, los usuarios deben ver desde la aplicación como quedaría la alineación según la plantilla que han seleccionado. Es decir, si se selecciona la plantilla de alineación a la derecha, los productos se deben alinear a la derecha en el editor.
- Los usuarios pueden guardar la parrilla, pero todos las filas tienen que tener productos y todas las filas deben tener plantilla asignada.
