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

function getFiles(folder){
    return fetch('http://localhost:8080/' + folder)
    .then(response => response.json())
    .then(json => {
        // console.log(json);
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

// updateFiles();

// function loadAudio(file){
//     let home_folder;
//     let folder_name;
//     let file_name;



    // let folders = getContainer('folders');
    // let files = getContainer('files');

    
    // async function getFolderName(){
    //     return hello = await Promise.resolve(sayHi())
    // };

    // getFolderName().then(alert)


    // getFolderName()
    // function getFileName(){
    //     files.addEventListener('click', function(event){

    //         if (event.target.id === 'file') {
    //             return event.target.innerHTML;
    //         };
    //     });

    // };
    
    // function getHomeFolder(){
    //     return fetch('http://localhost:8080/')
    //         .then(response => response.json())
    //         .then(json => {
    //             home_folder = json.home_folder;
    //             console.log(home_folder);
    //         }
    //         );
    //     }
// };

// loadAudio()


// function g(){
//     console.log('ggggggggg')
// }

// function h(){
//     return g
// }

// console.log(h())




























let folder = document.getElementById('folders');
let f = document.getElementById('container')

async function one(){
    return new Promise((resolve, reject) => {
        folder.addEventListener('click', resolve)
        f.addEventListener('click', reject)
    }) 
}

async function waitClick(){
    await one()
    .then((e) => {
        if (e.target.id === 'folder') {
            return (e.target.innerHTML)
        }
    })
    .then((value) => {
        console.log(value)
        printFiles(value)
    })
}

waitClick()
// function a(){
//     console.log('a')
// }

// async function waitClick(){
//     await one()
//     .then((e) => {
//         a()
//         console.log(e)
//     })
//     .catch(() => {a()})
// }

// waitClick()
// async function getFolder(){
//     folders.addEventListener('click', function(event){
//         if (event.target.id === 'folder') {
//             folder_name = event.target.innerHTML;

//             console.log(folder_name)
//             return await folder_name
//         };
//     })
// }

// getFolder().then(console.log)

















