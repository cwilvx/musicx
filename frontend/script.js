// fetch all folders from http://localhost:8080
// use fetch

function getFolderList() {
    return fetch('http://localhost:8080')
        .then(response => response.json())
}

function printList() {
    getFolderList()
        .then(
            function(data) {
                document.getElementById('hah').innerHTML = data;
                console.log(data);
            }
        )
}

printList();
// function printFolders(folders) {

// }

// function insertAudio() {
//     let url = document.getElementById("now_playing");
//     url.scr = url;
// }