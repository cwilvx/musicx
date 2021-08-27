// constants
// let home_uri =

function getFolders() {
  return fetch('http://localhost:8080/')
    .then(response => response.json())
    .then(json => {
      return json.all_folders;
    });
}

function getContainer(container){
    return document.getElementById(container);
};

function createNode(element){
    return document.createElement(element);
}

function appendNode(parent, element){
    parent.appendChild(element);
};

function printFolders(){
    getFolders()
    .then(json => {
        json.map(function(folder){
            let container = getContainer('folders');
            let folderNode = createNode('div');
            folderNode.setAttribute('id', 'folder');

            folderNode.innerHTML = folder;
            // console.log(folder);

            appendNode(container, folderNode);
        });
    })
}

printFolders()

async function getFiles(folder){
    const response = await fetch('http://localhost:8080/' + folder);
    const json = await response.json();
    return json.all_files;
}


function printFiles(folder){
    getFiles(folder)
    .then(data => {
        data.map(function(file){
            let container = getContainer('files');
            let fileNode = createNode('div');
            fileNode.setAttribute('id', 'file');

            fileNode.innerHTML = file;

            appendNode(container, fileNode);
        });
    })
}

function updateFiles(){
    let container = getContainer('folders');
    let files = getContainer('files');

    container.addEventListener('click', function(event){
        if (event.target.id === 'folder') {
            let folder = event.target.innerHTML;
            selected_folder = folder;
            // console.log(folder);
            files.textContent = '';
            printFiles(folder);
        }
    })

}

updateFiles()

function listenToFile(){
    let container = getContainer('files');

    container.addEventListener('click', function(event){
        if (event.target.id === "file"){
            selected_file = event.target.innerHTML;

            // console.log(selected_folder);
            // console.log(selected_file);
            console.log(server_port)
            audio_uri = '';
            // audio.pause();
            if (audio === undefined){
                audio_uri = server_port + "/" + selected_folder + "/" + selected_file;
                audio = new Audio(audio_uri);
                audio.volume = 1.0;
                audio.
                audio.play();
            } else {
                audio.pause();
                audio.src = server_port + "/" + selected_folder + "/" + selected_file;
                audio.play();
            }
            
            // audio = new Audio(audio_uri)

            // audio.play()
            // console.log(audio_uri)
        }
    })
}

listenToFile()

let selected_folder;
let selected_file;
let server_port;
let audio_uri;
let audio;

function getHomeFolder(){
    return fetch('http://localhost:8080/')
    .then(response => response.json())
    .then(json => {
        return json.server_port
    });
}

getHomeFolder().then(
    port => {
        server_port = port;
        // console.log(home_folder);
    }
);