# Noir online shop - Back End
Este es el repositorio del apartado back end de "noir online shop web app".

<a href="https://github.com/BrainerVirus/online-shop-front-end.git">Presiona aqui para ir al repositorio del Front-End</a>

## Instalación
Usuando el siguiente comando puedes realizar la instalación del cliente front end.

```git clone https://github.com/BrainerVirus/online-shop-back-end.git ```

O bien descaga el contenido completo como un archivo zip haciendo click aquí.

![alt text](https://i.ibb.co/SVV2RdM/descargar-el-proyecto-back-end.png)

## Uso

```
//Instalación de node_modules
npm i
//Ejecución de la servidor
npm run dev
//Test
npm run test
```
*Nota: Para correr los test se recomienda cambiar los valores de prueba existentes debido a los datos impredecibles de la base de datos al ser de acceso de muchos*

## Estuctura de las respuestas
Primero que nada se debe saber que las respuestas están en formato json, y sus parámetros cambian en función de la request del cliente (más detalles al respecto
en más adelante) puesto que los endpoints trabajan bajo una estructura de queries dinámicas.

```
//Respuesta json con todos los campos de un producto
{
id: "1",
name: "Pisco",
price: "1000",
discount: "200",
url_image: "www.img.com/img.png",
category: 1
}
```

<ul>
<li><b>id</b> = Valor único identificador del producto</li>
<li><b>name</b> = Nombre del producto</li>
<li><b>price</b> = Precio del producto></li>
<li><b>discount</b> = Descuento del precio del producto</li>
<li><b>url_image</b> = Dirección url del sitio de la imágen del producto</li>
<li><b>category</b> = Valor único identificador de la categoria</li>
</ul>

```
//Respuesta json con todos los campos de una categoria
{
id: "1"
name: "Pisco",
}
```
<ul>
<li><b>id</b> = Valor único identificador de la categoria</li>
<li><b>name<b/>Nombre de la categoria</li>
</ul>

## GET categorias
`/categories/` retornará  un objeto con una key `categories` y como valor un array con todas las categorias, con todos sus respectivos atributos
```
//ejemplo
{"categories":
[{"id":1,"name":"bebida energetica"},
{"id":2,"name":"pisco"},{"id":3,"name":"ron"},
{"id":4,"name":"bebida"},{"id":5,"name":"snack"},
{"id":6,"name":"cerveza"},{"id":7,"name":"vodka"}]}
```
Como bien ya adelanté podemos hacer consultas dinámicas por medio de queries, como puede ser `/categories/?id=1&name`
```
//retorno
{"categories":[{"id":1,"name":"bebida energetica"}]}
````
Cabe tener en cuenta al usar la query debemos informar todos los campos que queremos traer dando o no el valor del mismo, la diferencia como pueden ver en el
punto anterior, es que al informar el valor este actua de filtro, de no dar ninguno se traen todas las coicidencias según la composición de la query
```
//para `/categories/?id&name` el retorno es
{"categories":
[{"id":1,"name":"bebida energetica"},
{"id":2,"name":"pisco"},{"id":3,"name":"ron"},
{"id":4,"name":"bebida"},{"id":5,"name":"snack"},
{"id":6,"name":"cerveza"},{"id":7,"name":"vodka"}]}
```

#POST categories
Al enviar una request post `/categories/create` retornará `{ message: "Category created successfully" }` al momento de crear de forma satisfacotia
una categoria al entregarle un json con los parametrós necesarios

```
//ejemplo
{name: "hogar"}
```

#PUT categories
Al enviar un request put `/categories/update/:id` se tiene que tener encuenta la construcción de query para la actualización
dinámica, es decir, por medio de las query podemos decirle a la api que parametros actualizar, respecto a que registro.

```
//ejemplo
/categories/update/4?name=bebestibles
```
*Nota: El ejemplo anterior define la actualización del campo nombre de la categoria con el id 4*

#DELETE categories
al enviar un request delete `/categories/delete/:id` de existir el registro este se eliminará y dará como respueta
`{ message: "Category deleted successfully" }`

## GET products
`/products/` retornará  un objeto con una key `produtcs` y como valor un array con todos los productos, con todos sus respectivos atributos
```
//ejemplo
{"products":
[{"id":5,"name":"ENERGETICA MR BIG","url_image":"https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg","price":1490,"discount":20,"category":1},
{"id":6,"name":"ENERGETICA RED BULL","url_image":"https://dojiw2m9tvv09.cloudfront.net/11132/product/redbull8381.jpg","price":1490,"discount":0,"category":1},
{"id":7,"name":"ENERGETICA SCORE","url_image":"https://dojiw2m9tvv09.cloudfront.net/11132/product/logo7698.png","price":1290,"discount":0,"category":1}]
```
Así como con categories, con products también podemos hacer consultas dinámicas por medio de queries, como puede ser `/products/?id=5&name`
```
//retorno
{"products":[{"id":5,"name":"ENERGETICA MR BIG"}]}
````
Cabe tener en cuenta al usar la query debemos informar todos los campos que queremos traer dando o no el valor del mismo, la diferencia como pueden ver en el
punto anterior, es que al informar el valor este actua de filtro, de no dar ninguno se traen todas las coicidencias según la composición de la query.
```
//para `/products/?id&name` el retorno es
{"products":
[{"id":104,"name":"ABSOLUT"},
{"id":68,"name":"Bebida Sprite 1 Lt"},
{"id":98,"name":"Cerveza Escudo Normal LATA 350CC"},
{"id":99,"name":"Cerveza Escudo Sin Filtrar LATA 350CC"},
{"id":58,"name":"COCA COLA LIGHT DESECHABLE"}]
```
Para products como caso especial exisite un enpoint para filtrado de estos por medio de su atributo name, es decir, al realizar una solitud a
`/search/:searchInput`, en donde searchInput tal atributo, la api responderá con un array de productos los cuales contegan a searchInput en su nombre
por ejemplo al consultar `/products/search/pisco alto del carmen` se retornará el siguiente json.

```
//ejemplo
{"products":[{"id":8,"name":"PISCO ALTO DEL CARMEN 35º","url_image":"https://dojiw2m9tvv09.cloudfront.net/11132/product/alto8532.jpg","price":7990,"discount":10,"category":2},{"id":9,"name":"PISCO ALTO DEL CARMEN 40º ","url_image":"https://dojiw2m9tvv09.cloudfront.net/11132/product/alto408581.jpg","price":5990,"discount":0,"category":2}]}
```


#POST products
Al enviar una request post `/products/create` retornará `{ message: "Product created successfully" }` al momento de crear de forma satisfacotia
un producto al entregarle un json con los parametrós necesarios

```
//ejemplo
{"name": "pera",
"url_image": "https://picsum.photos/200/300",
"price": 590,
"discount": 2,
"category": 2}
```

#PUT products
Al enviar un request put `/products/update/:id` se tiene que tener encuenta la construcción de query para la actualización
dinámica, es decir, por medio de las query podemos decirle a la api que parametros actualizar, respecto a que registro.

```
//ejemplo
/products/update/5?name=pisco&category=2
```
*Nota: El ejemplo anterior define la actualización del campo nombre , y categoria del producto con el id 5*

#DELETE products
al enviar un request delete `/products/delete/:id` de existir el registro este se eliminará y dará como respueta
`{ message: "Product deleted successfully" }`

# License
<a href="https://github.com/BrainerVirus/online-shop-back-end/blob/main/LICENSE.MD">MIT</a>
