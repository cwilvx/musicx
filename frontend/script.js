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
    let home_folder;
    let folder_name;
    let file_name;

    let folders = getContainer('folders');
    let files = getContainer('files');

    const getFolderName = async() => {
        folders.addEventListener('click', function(event){
            if (event.target.id === 'folder') {
                folder_name = event.target.innerHTML;

                const file_name = await getFileName();
                getHomeFolder();

                console.log(home_folder + '/' + folder_name + '/' + file_name);
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
                home_folder = json.home_folder;
                console.log(home_folder);
            }
            // _callback();
            );

        
    };

    return getFolderName();
};

let audio = loadAudio();
console.log(audio);