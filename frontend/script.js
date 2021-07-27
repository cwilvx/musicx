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
            // folderNode.setAttribute('onclick', 'updateFiles()');

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

// getFiles("Nadina");

function printFiles(folder){
    getFiles(folder)
    .then(data => {
        data.map(function(file){
            let container = getContainer('files');
            let fileNode = createNode('div');
            fileNode.setAttribute('id', 'file');

            fileNode.innerHTML = file;
            console.log(file);

            appendNode(container, fileNode);
        });
    })
}

// printFiles();

function sayHi(){
    console.log('hi');
}

function updateFiles(){
    let container = getContainer('folders');
    let files = getContainer('files');
    container.addEventListener('click', function(e){
        if (e.target.id === 'folder') {
            let folder = e.target.innerHTML;
            console.log(folder);
            files.textContent = '';
            printFiles(folder);
        }
    })

}

updateFiles()