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
            console.log(home_folder)
            let audio_uri = home_folder + "/" + selected_folder + "/" + selected_file;
            let audio = new Audio(audio_uri)
            audio.play()
            console.log(audio_uri)
          
        }
    })
}

listenToFile()

let selected_folder;
let selected_file;
let home_folder;

// console.log(selected_file);

function getHomeFolder(){
    return fetch('http://localhost:8080/')
    .then(response => response.json())
    .then(json => {
        return json.server_port
    });
}

getHomeFolder().then(
    home => {
        home_folder = home;
        // console.log(home_folder);
    }
);