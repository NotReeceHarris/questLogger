db.collection('Quest-storage').onSnapshot((snapshot) => {
    snapshot.docChanges().forEach(change => {
        console.log(change.doc.data(), change.doc.id)

        $('#tasks').append('<div class="card-panel quest white row"> <img src="/src/img/icon128.png" alt="quest thumb"> <div class="quest-details"> <div class="quest-title">'+change.doc.data()['title']+'</div><div class="quest-tasks">'+change.doc.data()['task']+'</div></div><div class="quest-delete"> <i class="material-icons">delete_outline</i> </div>')

    });
})