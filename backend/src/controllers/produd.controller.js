const prodCtrl = {};

const Prod = require('../models/Product');
const subirImagen = require('./img.controllers');


// CREAR UN PRODUCTO NUEVO
prodCtrl.renderProdForm = (req, res) => {
    const ListColores = [{"codHexadecimal": "#000000","nombreColor": "negro"},{"codHexadecimal": "#FFFFFF","nombreColor": "blanco"},{"codHexadecimal": "#FF0000","nombreColor": "rojo"},{"codHexadecimal": "#FFC0CB","nombreColor": "rosa"},{"codHexadecimal": "#0000ff","nombreColor": "azul"},{"codHexadecimal": "#FFFF00","nombreColor": "amarillo"},{"codHexadecimal": "#800080","nombreColor": "purpura"},{"codHexadecimal": "#87CEEB","nombreColor": "celeste"},{"codHexadecimal": "#F28773","nombreColor": "salmon"},{"codHexadecimal": "#9b9b9b","nombreColor": "gris"},{"codHexadecimal": "#C0C0C0","nombreColor": "plata"},{"codHexadecimal": "#FFD700","nombreColor": "oro"},{"codHexadecimal": "#A52A2A","nombreColor": "marron"},{"codHexadecimal": "#819225","nombreColor": "mate"},{"codHexadecimal": "#008000","nombreColor": "verde"},{"codHexadecimal": "#7d8471","nombreColor": "cemento"},{"codHexadecimal": "#FFA500","nombreColor": "naranja"}];

    const ListaMarcas = [{"nombre": "falabela"},{"nombre": "taverniti"},{"nombre": "batistella"},{"nombre": "mambo"},{"nombre": "mini-granada"},{"nombre": "copmlot"},{"nombre": "eyelit"},{"nombre": "casa-chic"},{"nombre": "falabela"},{"nombre": "jarvec"},{"nombre": "Cinzento"},{"nombre": "topper"},{"nombre": "Salpa"},{"nombre": "Snauwaert"},{"nombre": "Vitnik"},{"nombre": "adidas"},{"nombre": "nike"},{"nombre": "newBalance"}];

    const ListaSubCategorias = [{"nombre": "Camisetas y Polos"},{"nombre": "Camisas"},{"nombre": "Sudaderas y Hoodies"},{"nombre": "Chaquetas y Abrigos"},{"nombre": "Chalecos"},{"nombre": "Blusas y Tops"},{"nombre": "Cardigans y Suéteres"},{"nombre": "Camisetas de Deporte"},{"nombre": "Ropa Interior"},{"nombre": "Camisas de Manga Larga"},{"nombre": "Pantalones"},{"nombre": "Jeans"},{"nombre": "Shorts"},{"nombre": "Faldas"},{"nombre": "Leggings y Pantalones Deportivos"},{"nombre": "Pantalones Cortos de Ciclismo"},{"nombre": "Pantalones Formales"},{"nombre": "Pantalones de Pijama"},{"nombre": "Zapatillas Deportivas"},{"nombre": "Zapatillas Casuales"},{"nombre": "Zapatos Formales"},{"nombre": "Botas"},{"nombre": "Sandalias"},{"nombre": "Zapatillas de Casa"},{"nombre": "Botin"},{"nombre": "Botas Cortas"}];

    const ListaDeTallas = [{"nombre": "S"},{"nombre": "M"},{"nombre": "L"},{"nombre": "XL"},{"nombre": "XXL"},{"nombre": "30"},{"nombre": "34"},{"nombre": "36"},{"nombre": "38"},{"nombre": "40"},{"nombre": "39"},{"nombre": "41"},{"nombre": "43"},{"nombre": "45"},{"nombre": "004"},{"nombre": "010"},{"nombre": "014"},{"nombre": "020"},{"nombre": "37-38"},{"nombre": "39-40"},{"nombre": "41-42"},{"nombre": "43-44"},{"nombre": "4"},{"nombre": "6"},{"nombre": "8"},{"nombre": "10"},{"nombre": "18"},{"nombre": "19"},{"nombre": "21"}];

    data = {ListColores, ListaMarcas, ListaSubCategorias, ListaDeTallas};
    res.render('products/new-prod', data);
    //res.send('nuevo producto')
};

prodCtrl.createNewProd = async (req, res) => {
    try {
        let { nombre, marca, descripcion, genero, subcategoria, opciones, offActiva, activo, productoNuevo, categoria, opcionesData, descuento, precio} = req.body;
        console.log(req.body)
        const errors = [];
        if (!nombre || !marca || !descripcion || !precio || !descuento || !categoria){
            errors.push({text: 'Los campos con "*" son obligatorios'});
        }
        if (/[^a-zA-Z0-9\s]/.test(nombre)) {
            errors.push({ text: 'El nombre no puede contener símbolos.' });
        }
        if (opcionesData.length === 0) {
            errors.push({text: 'Tiene que tener al menos una opcion!'});
        }
        if (typeof precio !== 'undefined') {
            const precioNum = parseFloat(precio);
            if (isNaN(precioNum) || precioNum < 0 || precioNum > 200) {
                errors.push({ text: 'El precio debe estar en el rango de 0 a 200.' });
            }
        }
        if (errors.length > 0) {
            const ListColores = [{"codHexadecimal": "#000000","nombreColor": "negro"},{"codHexadecimal": "#FFFFFF","nombreColor": "blanco"},{"codHexadecimal": "#FF0000","nombreColor": "rojo"},{"codHexadecimal": "#FFC0CB","nombreColor": "rosa"},{"codHexadecimal": "#0000ff","nombreColor": "azul"},{"codHexadecimal": "#FFFF00","nombreColor": "amarillo"},{"codHexadecimal": "#800080","nombreColor": "purpura"},{"codHexadecimal": "#87CEEB","nombreColor": "celeste"},{"codHexadecimal": "#F28773","nombreColor": "salmon"},{"codHexadecimal": "#9b9b9b","nombreColor": "gris"},{"codHexadecimal": "#C0C0C0","nombreColor": "plata"},{"codHexadecimal": "#FFD700","nombreColor": "oro"},{"codHexadecimal": "#A52A2A","nombreColor": "marron"},{"codHexadecimal": "#819225","nombreColor": "mate"},{"codHexadecimal": "#008000","nombreColor": "verde"},{"codHexadecimal": "#7d8471","nombreColor": "cemento"},{"codHexadecimal": "#FFA500","nombreColor": "naranja"}];

            const ListaMarcas = [{"nombre": "falabela"},{"nombre": "taverniti"},{"nombre": "batistella"},{"nombre": "mambo"},{"nombre": "mini-granada"},{"nombre": "copmlot"},{"nombre": "eyelit"},{"nombre": "casa-chic"},{"nombre": "falabela"},{"nombre": "jarvec"},{"nombre": "Cinzento"},{"nombre": "topper"},{"nombre": "Salpa"},{"nombre": "Snauwaert"},{"nombre": "Vitnik"},{"nombre": "adidas"},{"nombre": "nike"},{"nombre": "newBalance"}];

            const ListaSubCategorias = [{"nombre": "Camisetas y Polos"},{"nombre": "Camisas"},{"nombre": "Sudaderas y Hoodies"},{"nombre": "Chaquetas y Abrigos"},{"nombre": "Chalecos"},{"nombre": "Blusas y Tops"},{"nombre": "Cardigans y Suéteres"},{"nombre": "Camisetas de Deporte"},{"nombre": "Ropa Interior"},{"nombre": "Camisas de Manga Larga"},{"nombre": "Pantalones"},{"nombre": "Jeans"},{"nombre": "Shorts"},{"nombre": "Faldas"},{"nombre": "Leggings y Pantalones Deportivos"},{"nombre": "Pantalones Cortos de Ciclismo"},{"nombre": "Pantalones Formales"},{"nombre": "Pantalones de Pijama"},{"nombre": "Zapatillas Deportivas"},{"nombre": "Zapatillas Casuales"},{"nombre": "Zapatos Formales"},{"nombre": "Botas"},{"nombre": "Sandalias"},{"nombre": "Zapatillas de Casa"},{"nombre": "Botin"},{"nombre": "Botas Cortas"}];

            const ListaDeTallas = [{"nombre": "S"},{"nombre": "M"},{"nombre": "L"},{"nombre": "XL"},{"nombre": "XXL"},{"nombre": "30"},{"nombre": "34"},{"nombre": "36"},{"nombre": "38"},{"nombre": "40"},{"nombre": "39"},{"nombre": "41"},{"nombre": "43"},{"nombre": "45"},{"nombre": "004"},{"nombre": "010"},{"nombre": "014"},{"nombre": "020"},{"nombre": "37-38"},{"nombre": "39-40"},{"nombre": "41-42"},{"nombre": "43-44"},{"nombre": "4"},{"nombre": "6"},{"nombre": "8"},{"nombre": "10"},{"nombre": "18"},{"nombre": "19"},{"nombre": "21"}];

            data = {ListColores, ListaMarcas, ListaSubCategorias, ListaDeTallas};
            res.render('products/new-prod', {
                ListColores: ListColores,
                ListaMarcas: ListaMarcas,
                ListaSubCategorias: ListaSubCategorias,
                ListaDeTallas: ListaDeTallas,
                errors,
                nombre,
                marca,
                descripcion,
                precio,

            })
        }else {



            offActiva = (offActiva === undefined || offActiva === "off" || offActiva === "") ? false : true;
            activo = (activo === undefined || activo === "off" || activo === "") ? false : true;
            productoNuevo = (productoNuevo === undefined || productoNuevo === "off" || productoNuevo === "") ? false : true;
            precio = (precio === undefined || precio === "") ? 0 : parseFloat(precio.replace(/,/g, ''));
            let tallasUnicas = [];
            let coloresUnicos = [];
            let tallas = [];
            let colores = [];
            let opcion = [];
            let desAux = 0;
            desAux = (descuento === undefined || productoNuevo === NaN || productoNuevo === "") ? 0 : descuento;
            if (opcionesData) {
                opciones = JSON.parse(opcionesData);
                opciones.forEach(function(opcion) {
                    opcion.talles.forEach(function(talle) {
                        talle.stock = parseInt(talle.stock);
                    });
                });

                opciones.forEach(opcion => {
                    const color = opcion.color.nombreColor;
                    const talles = opcion.talles.map(talle => talle.talla);
                    
                    // Añadir colores únicos al array de coloresUnicos
                    if (!coloresUnicos.includes(color)) {
                        coloresUnicos.push(color);
                    }
                    
                    // Añadir tallas únicas al array de tallasUnicas
                    talles.forEach(talla => {
                        if (!tallasUnicas.includes(talla)) {
                            tallasUnicas.push(talla);
                        }
                    });
                });
            }
            

            const nuevasFotos = [];

            if (req.files) {
                for (const file of req.files) {
                    const url = await subirImagen(file); // Subir imagen a Cloudinary
                    nuevasFotos.push(url);
                    console.log(url);
                }
            }


            let oferta = {
                offActiva,
                descuento: parseInt(desAux)
            };

            // Crea el nuevo producto con las URLs de las imágenes subidas
            const newProd = new Prod({ nombre, marca, descripcion, precio, oferta, activo, productoNuevo, categoria, genero, subcategoria, imagen: nuevasFotos, tallas: tallasUnicas, colores: coloresUnicos, opcion: opciones });
            await newProd.save();
            

            // Imprime solo las propiedades que están definidas en el objeto newProd
            //console.log(newProd);







            //Mensaje por Flash
            req.flash('success_msg', 'Producto creado correctamente!')
                    
            res.redirect('/products');
        }



        
        

        
    }catch (error){
        console.error('Error al crear un nuevo producto:', error);
        res.status(500).send('Error al crear un nuevo producto');
    };
};


// MODIFICAR UN PRODUCTO
prodCtrl.renderEditForm = async (req, res) => {
    try {
        const ListColores = [{"codHexadecimal": "#000000","nombreColor": "negro"},{"codHexadecimal": "#FFFFFF","nombreColor": "blanco"},{"codHexadecimal": "#FF0000","nombreColor": "rojo"},{"codHexadecimal": "#FFC0CB","nombreColor": "rosa"},{"codHexadecimal": "#0000ff","nombreColor": "azul"},{"codHexadecimal": "#FFFF00","nombreColor": "amarillo"},{"codHexadecimal": "#800080","nombreColor": "purpura"},{"codHexadecimal": "#87CEEB","nombreColor": "celeste"},{"codHexadecimal": "#F28773","nombreColor": "salmon"},{"codHexadecimal": "#9b9b9b","nombreColor": "gris"},{"codHexadecimal": "#C0C0C0","nombreColor": "plata"},{"codHexadecimal": "#FFD700","nombreColor": "oro"},{"codHexadecimal": "#A52A2A","nombreColor": "marron"},{"codHexadecimal": "#819225","nombreColor": "mate"},{"codHexadecimal": "#008000","nombreColor": "verde"},{"codHexadecimal": "#7d8471","nombreColor": "cemento"},{"codHexadecimal": "#FFA500","nombreColor": "naranja"}];

        const ListaMarcas = [{"nombre": "falabela"},{"nombre": "taverniti"},{"nombre": "batistella"},{"nombre": "mambo"},{"nombre": "mini-granada"},{"nombre": "copmlot"},{"nombre": "eyelit"},{"nombre": "casa-chic"},{"nombre": "falabela"},{"nombre": "jarvec"},{"nombre": "Cinzento"},{"nombre": "topper"},{"nombre": "Salpa"},{"nombre": "Snauwaert"},{"nombre": "Vitnik"},{"nombre": "adidas"},{"nombre": "nike"},{"nombre": "newBalance"}];

        const ListaSubCategorias = [{"nombre": "Camisetas y Polos"},{"nombre": "Camisas"},{"nombre": "Sudaderas y Hoodies"},{"nombre": "Chaquetas y Abrigos"},{"nombre": "Chalecos"},{"nombre": "Blusas y Tops"},{"nombre": "Cardigans y Suéteres"},{"nombre": "Camisetas de Deporte"},{"nombre": "Ropa Interior"},{"nombre": "Camisas de Manga Larga"},{"nombre": "Pantalones"},{"nombre": "Jeans"},{"nombre": "Shorts"},{"nombre": "Faldas"},{"nombre": "Leggings y Pantalones Deportivos"},{"nombre": "Pantalones Cortos de Ciclismo"},{"nombre": "Pantalones Formales"},{"nombre": "Pantalones de Pijama"},{"nombre": "Zapatillas Deportivas"},{"nombre": "Zapatillas Casuales"},{"nombre": "Zapatos Formales"},{"nombre": "Botas"},{"nombre": "Sandalias"},{"nombre": "Zapatillas de Casa"},{"nombre": "Botin"},{"nombre": "Botas Cortas"}];
        
        data = {ListColores, ListaMarcas, ListaSubCategorias};
        const producto = await Prod.findById(req.params.id).lean();
        //console.log(producto);
        res.render('products/edit-prod', { producto, ListaMarcas, ListaSubCategorias });
    } catch (error) {
        console.error('Error al renderizar el formulario', error);
        res.status(500).send('Error al renderizar el form');
    }
};
prodCtrl.updateProd = async (req, res) => { 
    try {
        //console.log(req.body);
        let { nombre, marca, descripcion, precio, offActiva, descuento, activo, productoNuevo, categoria, genero, subcategoria, } = req.body;
        precio = (precio === undefined || precio === "") ? 0 : parseFloat(precio.replace(/,/g, ''));
        offActiva = (offActiva === 'Desactivada' || offActiva === 'false') ? false : true;
        let desAux = 0;
        desAux = (descuento === undefined || productoNuevo === NaN || productoNuevo === "") ? 0 : descuento;
        let oferta = {
            offActiva,
            descuento: parseInt(desAux)
        };
        activo = (activo === 'No-Visible' || activo === 'false') ? false : true;
        productoNuevo = (productoNuevo === 'Viejo' || productoNuevo === 'false') ? false : true;

        //console.log(req.params.id);
        await Prod.findByIdAndUpdate(req.params.id, {nombre, marca, descripcion, precio, oferta, activo, productoNuevo, categoria, genero, subcategoria});     
        //console.log(req.params.id)

        req.flash('success_msg', 'Producto actualizado correctamente!')
        res.redirect('/products');
    } catch (error) {
        console.error('Error al editar el producto', error);
        res.status(500).send('Error en el edit');
    }
};

// MODIFICAR STOCK
prodCtrl.renderEditStockForm = async (req, res) => {
    try {
        const ListColores = [{"codHexadecimal": "#000000","nombreColor": "negro"},{"codHexadecimal": "#FFFFFF","nombreColor": "blanco"},{"codHexadecimal": "#FF0000","nombreColor": "rojo"},{"codHexadecimal": "#FFC0CB","nombreColor": "rosa"},{"codHexadecimal": "#0000ff","nombreColor": "azul"},{"codHexadecimal": "#FFFF00","nombreColor": "amarillo"},{"codHexadecimal": "#800080","nombreColor": "purpura"},{"codHexadecimal": "#87CEEB","nombreColor": "celeste"},{"codHexadecimal": "#F28773","nombreColor": "salmon"},{"codHexadecimal": "#9b9b9b","nombreColor": "gris"},{"codHexadecimal": "#C0C0C0","nombreColor": "plata"},{"codHexadecimal": "#FFD700","nombreColor": "oro"},{"codHexadecimal": "#A52A2A","nombreColor": "marron"},{"codHexadecimal": "#819225","nombreColor": "mate"},{"codHexadecimal": "#008000","nombreColor": "verde"},{"codHexadecimal": "#7d8471","nombreColor": "cemento"},{"codHexadecimal": "#FFA500","nombreColor": "naranja"}];

        const ListaDeTallas = ["S","M","L","XL","XXL","30","34","36","38","40","39","41","43","45","004","010","014","020","37-38","39-40","41-42","43-44","4","6","8","10","18","19","21"];

        data = {ListColores, ListaDeTallas};
        const producto = await Prod.findById(req.params.id).lean();
        let opcionesArray = []; // Define opcionesArray aquí para que esté disponible fuera del bloque if
        let datosString = "";
        if (producto) {
            // Asegurémonos de que la propiedad "opcion" existe en el objeto "producto"
            if (producto.opcion) {
                producto.opcion.forEach(item => {
                    const { color, talles } = item;
                    talles.forEach(talla => {
                        opcionesArray.push({
                            Hexa: color.codHexadecimal,
                            nombreColor: color.nombreColor,
                            talla: talla.talla,
                            stock: talla.stock
                        });
                    });
                });
        
                datosString = JSON.stringify(opcionesArray);

                //console.log(datosString)
                //console.log(opcionesArray);
            } else {
                console.log('La propiedad "opcion" no está definida en el objeto producto.');
            }
        } else {
            console.log('No se encontró ningún producto con el ID proporcionado.');
        }

        
        //console.log(producto);
        res.render('products/edit-stock-prod', { producto, ListColores, ListaDeTallas, opcionesArray, datosString });
    } catch (error) {
        console.error('Error al renderizar el formulario', error);
        res.status(500).send('Error al renderizar el form');
    }
};
prodCtrl.updateStockProd = async (req, res) => { 
    try {
        const aux = req.body;
        //console.log(aux.opcion)
        //console.log(req.body);
        let todasLasTallas = [];
        let todosLosColores = [];

        const opciones = JSON.parse(aux.opcion);

        // Paso 2: Crear objeto para almacenar opciones agrupadas
        const opcionesAgrupadas = {};

        // Paso 3: Agrupar opciones por color
        opciones.forEach(opcion => {
            const { color, talla, stock } = opcion;
            const { codHexadecimal, nombreColor } = color;

            // Verificar si el color ya está en el objeto de opciones agrupadas
            if (!opcionesAgrupadas[nombreColor]) {
                opcionesAgrupadas[nombreColor] = {
                    color: {
                        codHexadecimal: codHexadecimal,
                        nombreColor: nombreColor
                    },
                    talles: []
                };
            }

            if (!todosLosColores.includes(nombreColor)) {
                todosLosColores.push(nombreColor);
            }
            // Agregar la talla y el stock a la opción agrupada
            opcionesAgrupadas[nombreColor].talles.push({ talla: talla, stock: stock });

            if (!todasLasTallas.includes(talla)) {
                todasLasTallas.push(talla);
            }
        });
        //console.log(todasLasTallas)
        //console.log(todosLosColores)
        // Paso 4: Crear un array con las opciones agrupadas
        const opcionesFormateadas = Object.values(opcionesAgrupadas);

        // Imprimir las opciones formateadas
        //console.log(opcionesFormateadas);
        

        //console.log(req.params.opcion)
        await Prod.findByIdAndUpdate(req.params.id, {opcion: opcionesFormateadas, tallas: todasLasTallas, colores: todosLosColores});
        
        req.flash('success_msg', 'Producto actualizado correctamente!')
        res.redirect('/products');
    } catch (error) {
        console.error('Error al editar el producto', error);
        res.status(500).send('Error en el edit');
    }
};

//MODIFICAR IMAGENES
prodCtrl.renderEditImgForm = async (req, res) => {
    try {
        const producto = await Prod.findById(req.params.id).lean();
        //console.log(producto);
        res.render('products/edit-img-prod', { producto });
    } catch (error) {
        console.error('Error al renderizar el formulario', error);
        res.status(500).send('Error al renderizar el form');
    }
};
prodCtrl.updateImgProd = async (req, res) => { 
    try {
        let { imagenAct } = req.body;
        //console.log(imagenAct);
        //const productoimgs = req.body;
        //const imgsURLActuales = req.body;

        //let { } = req.body;
        //console.log(req.body);
        //console.log(productoimgs.photos);
        const imagenDefault = ["https://img.freepik.com/vector-premium/error-404-pagina-no-encontrada-fondo-ilustracion-concepto-natural-pagina-inicio-faltante-web_607751-180.jpg?w=1380"];

        const photosAct = [];
        const nuevasFotos = [];
        let subirImagenes = [];
        const files = req.files;

        if (imagenAct) {
            for (const item of imagenAct) {
                photosAct.push(item);
                //console.log(item);
            }
        }
        //console.log(photosAct);

        if (files) {
            for (const file of files) {
                const url = await subirImagen(file); // Subir imagen a Cloudinary
                nuevasFotos.push(url);
                console.log(url);
            }
        }

        if (photosAct.length === 0 && nuevasFotos.length === 0) {
            subirImagenes = imagenDefault;
        } else if(photosAct.length === 0 && nuevasFotos.length !== 0 ) {
            subirImagenes = nuevasFotos; 
        } else if (photosAct.length !== 0 && nuevasFotos.length === 0) {
            subirImagenes = photosAct;
        } else {
            subirImagenes = photosAct.concat(nuevasFotos);
        }

        //console.log(subirImagenes.length);

        // Crea el nuevo producto con las URLs de las imágenes subidas
        
        await Prod.findByIdAndUpdate(req.params.id, {imagen: subirImagenes});
        
        req.flash('success_msg', 'Producto actualizado correctamente!')
        res.redirect('/products');
    } catch (error) {
        console.error('Error al editar el producto', error);
        res.status(500).send('Error en el edit');
    }
};

prodCtrl.getAcDes = async (req, res) => {
    try {
        const producto = await Prod.findById(req.params.id).lean();
        if (!producto) {
            throw new Error('Producto no encontrado');
        }
        //console.log(producto.activo);  
        // Devolver el estado de activo del producto
        res.status(200).json({ activo: producto.activo });

    } catch (error) {
        console.error('Error get activar / desactivar', error);
        res.status(500).send('Error get act/Des');
    }
}
// CAMBIAR ACT - NOACT
prodCtrl.actDesProd = async (req, res) => {
    try {
        const { id, activo } = req.body;
        auxActi = (activo === false) ? true : false;
        //const { id } = req.params;
        //const producto = await Prod.findById(id);
        //console.log(id)
        //console.log(activo)
        //console.log(auxActi)
        
        await Prod.findByIdAndUpdate(id, {activo: auxActi});

        
        res.status(200).send('Estado de activo actualizado correctamente');
    } catch (error) {
        console.error('Error activar / desactivar', error);
        res.status(500).send('Error act/Des');
    }

};

// BORRAR PRODUCTO
prodCtrl.borrarProd = async (req, res) => {
    try {
        await Prod.findByIdAndDelete(req.params.id);


        req.flash('success_msg', 'Producto borrado!')
        res.redirect('/products');
    } catch (error) {
        console.error('Error al borrar el producto:', error);
        res.status(500).send('Error al borrar el producto');
    }
};


// REND TODOS LOS PRODUCTOS
prodCtrl.renderProducts = async (req, res) => {
    const prod = await Prod.find().lean();
    res.render('products/all-prod', {prod})
};

// REND PREVIEW DEL PRODUCTO ID
prodCtrl.renderPreviewProd = async (req, res) => {
    try {
        //data = {ListColores, ListaMarcas, ListaSubCategorias};
        const prod = req.params.id;
        //console.log(prod);
        const producto = await Prod.findById(prod).lean();
        const datos = {nombre: producto.nombre, marca: producto.marca}
        //console.log(datos);
        //console.log(producto.precio);
        
        //res.render('products/detail-prod', producto);


        //const productId = req.params.id; // Renombrar la variable a `productId`
        //console.log(productId); // Verificar que se esté obteniendo el ID correctamente

        //const producto = await Prod.findById(req.params.id).lean();
        //console.log(producto);

        // Si todo está bien, renderizar la vista
        res.render('products/detail-prod', { producto });
    } catch (error) {
        console.error('Error al renderizar el producto', error);
        res.status(500).send('Error al renderizar el prodcuto');
    }
};


module.exports = prodCtrl;