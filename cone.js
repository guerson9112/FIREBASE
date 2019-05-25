firebase.initializeApp({
    apiKey: "AIzaSyCRwVCodC8pqqy-KCUQrTRLu-4U-_XphP4",
    authDomain: "practica-4a824.firebaseapp.com",
    projectId: "practica-4a824",
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

function guardarDatos() {

    //CAPTURAR DATOS
    var uno = document.getElementById("nom").value
    var dos = document.getElementById("pro").value
    var tres = document.getElementById("fec").value
    var cuatro = document.getElementById("est").value


    db.collection("productos").add({
        nombre: uno,
        proveedor: dos,
        fecha: tres,
        estado: cuatro
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById("nom").value = '';
            document.getElementById("pro").value = '';
            document.getElementById("fec").value = '';
            document.getElementById("est").value = '';
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });

}

var tabla = document.getElementById('tabla');
db.collection("productos").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        tabla.innerHTML +=

            `
    <tr>
         <th scope="row">${doc.id}</th>
         <td> ${doc.data().nombre}</td>
         <td> ${doc.data().proveedor}</td>
         <td> ${doc.data().fecha}</td>
         <td> ${doc.data().estado}</td>
         <td> 
            <button 
                type="button" 
                onclick="eliminarDatos('${doc.id}')" 
                class="btn btn-success"> 
                Eliminar</button>
        </td>
        <td> 
            <button type="button" onclick="actualizarDatos(
                '${doc.id}',
                '${doc.data().nombre}',
                '${doc.data().proveedor}',
                '${doc.data().fecha}',
                '${doc.data().estado}')" class="btn btn-info">
            Editar</button>         
        </td>
    </tr>
    `
    });
});

function eliminarDatos(id) {

    db.collection("productos").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}


function actualizarDatos(id, no, pr, fe, es) {

    document.getElementById('pro').value = pr;
    document.getElementById('nom').value = no;
    document.getElementById('fec').value = fe;
    document.getElementById('est').value = es;

    //CAMBIAR EL NOMBRE DE GUARDAR POR EDITAR
    var boton = document.getElementById('bot');
    boton.innerHTML = 'Editar'
    boton.onclick = function () {

        //CAPTURAR LO DATOS

        var u = document.getElementById('nom').value;
        var d = document.getElementById('pro').value;
        var t = document.getElementById('fec').value;
        var c = document.getElementById('est').value;

        var washingtonRef = db.collection("productos").doc(id);

        // Set the "capital" field of the city 'DC'
        return washingtonRef.update({
            nombre: u,
            proveedor: d,
            fecha: t,
            estado: c
        })
            .then(function () {
                console.log("Document successfully updated!");
                document.getElementById("nom").value = '';
                document.getElementById("pro").value = '';
                document.getElementById("fec").value = '';
                document.getElementById("est").value = '';
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }

}