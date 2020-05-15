$(document).ready(function(){
  // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyAsGQ_ms_jHpWQhq1VgNuJ4ZWwVKPTrYRM",
      authDomain: "jessicaarango-41752.firebaseapp.com",
      databaseURL: "https://jessicaarango-41752.firebaseio.com",
      projectId: "jessicaarango-41752",
      storageBucket: "jessicaarango-41752.appspot.com",
      messagingSenderId: "765025096507",
      appId: "1:765025096507:web:0f44d23ba0b437ab365d1e",
      measurementId: "G-73L3HEF2FC"
    };
    // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      var database = firebase.firestore();
      var tablaTareas = database.collection("tareas");
      tablaTareas.get()
       .then(function(snapshot){
           snapshot.docs.map(doc => {
               $(".tasks ul").append(`
               <li class="active" id="${doc.id}">
                   <p>${doc.data().tarea}</p>
                   <a href="#" data-id="${doc.id}">Complete</a>
               </li>
           `)
           })
       })
       .catch(function(error){
           alert("Error al traer las tareas")
       })

      $("#add-todo").submit(function(event){
          event.preventDefault();
          alert("¡Tenemos tu Dato!");
          var tarea = $("#add-todo #task").val();
          if(tarea.trim() === ""){
              alert("Tiene que ingresar alguna descripcion a la tarea.")
              return;
          }
          var tablaTareas = database.collection("tareas");

          tablaTareas.add(
              {
                  tarea: tarea,
                  completado: false
              }
          )
          .then(function(docRef) {
            $(".tasks ul").append(`
                <li class="active" id="${docRef.id}">
                    <p>${tarea}</p>
                    <a href="#" data-id="${docRef.id}">Complete</a>
                </li>
            `)
          })
          .catch(function(error){
              alert("Error Guardando")
          });
      });
  });
