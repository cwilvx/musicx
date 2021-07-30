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
            console.log(folder);

            appendNode(container, folderNode);
        });
    })
}

printFolders()

function getFiles(folder){
    return fetch('http://localhost:8080/' + folder)
    .then(response => response.json())
    .then(json => {
        console.log(json);
        return json.all_files;
    });
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

            files.textContent = '';
            printFiles(folder);
        }
    })

}

updateFiles();

function loadAudio(file){
    
    let folders = getContainer('folders');
    let files = getContainer('files');

    function getFolderName(){
        folders.addEventListener('click', function(event){
            if (event.target.id === 'folder') {
                return event.target.innerHTML;
            };
        });
    };

    function getFileName(){
        files.addEventListener('click', function(event){
            if (event.target.id === 'file') {
                return event.target.innerHTML;
            };
        });
    };
    
    function getHomeFolder(){
        return fetch('http://localhost:8080/')
        .then(response => response.json())
        .then(json => {
            return json.home_folder;
        });
    };
    
    let home_folder = getHomeFolder();
    let folder_name = getFolderName();
    let file_name = getFileName();

    return home_folder + '/' + folder_name + '/' + file_name;
};

let audio = loadAudio();
console.log(audio);