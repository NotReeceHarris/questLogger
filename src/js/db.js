db.collection('Quest-storage').onSnapshot((snapshot) => {
    var htmlElements="";
    snapshot.docChanges().forEach(change => {
        console.log(change.doc.data(), change.doc.id)
        htmlElements += '<div class="card-panel quest white row"> <img src="/src/img/icon128.png" alt="quest thumb"> <div class="quest-details"> <div class="quest-title">'+change.doc.data()['title']+'</div><div class="quest-tasks">'+change.doc.data()['task']+'</div></div><div class="quest-delete"> <button onclick="deletetask(\''+change.doc.id+'\')" style="background-color: transparent;border: none;"><i class="material-icons">delete_outline</i></button></div></div>'
    });
    $('#tasks').html(htmlElements)
})

function deletetask(id) {
    db.collection("Quest-storage").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");

        db.collection('Quest-storage').onSnapshot((snapshot) => {
            var htmlElements="";
            snapshot.docChanges().forEach(change => {
                console.log(change.doc.data(), change.doc.id)
                htmlElements += '<div class="card-panel quest white row"> <img src="/src/img/icon128.png" alt="quest thumb"> <div class="quest-details"> <div class="quest-title">'+change.doc.data()['title']+'</div><div class="quest-tasks">'+change.doc.data()['task']+'</div></div><div class="quest-delete"> <button onclick="deletetask(\''+change.doc.id+'\')" style="background-color: transparent;border: none;"><i class="material-icons">delete_outline</i></button></div></div>'
            });
            $('#tasks').html(htmlElements)
        })


    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}

$( "#AddTask" ).click(function() {
    db.collection("Quest-storage").add({
        title: $("#titleInput").val(),
        task: $("#tasksInput").val()
    })
  });

  $(["#deleteTask"]).on('click', function(){
    console.log(this.val())
});