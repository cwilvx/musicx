let selected_folder;
let selected_file;
let server_port;
let audio_uri;
let audio;
let playlist = [];
let current_song = 0;

let previous_button = document.getElementById('previous_button')
let next_button = document.getElementById('next_button');

function getFolders() {
    return fetch('http://localhost:8080/')
        .then(response => response.json())
        .then(json => {
            return json.all_folders;
        });
}

function getContainer(container) {
    return document.getElementById(container);
};

function createNode(element) {
    return document.createElement(element);
}

function appendNode(parent, element) {
    parent.appendChild(element);
};

function getHomeFolder() {
    return fetch('http://localhost:8080/')
        .then(response => response.json())
        .then(json => {
            return json.server_port
        });
}

getHomeFolder().then(
    port => {
        server_port = port;
        console.log(server_port);
    }
);


function printFolders() {
    getFolders()
        .then(json => {

            json.map(function (folder) {
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

async function getFiles(folder) {
    const response = await fetch('http://localhost:8080/' + folder);
    const json = await response.json();
    return json.all_files

}

function generateFileNodes(file, index) {
    let fileNode = createNode('div');
    fileNode.setAttribute('id', 'file');
    fileNode.setAttribute('index', index);

    fileNode.innerHTML = file.title;
    console.log(file.album)

    return fileNode;
}

function printFiles(folder) {
    console.log('heloooo')
    getFiles(folder)
        .then(data => {
            playlist = data;
            playlist.map(function (file, index) {
                let container = getContainer('files');
                fileNode = generateFileNodes(file, index);

                appendNode(container, fileNode);
            });
        })
}

function updateFiles() {
    let container = getContainer('folders');
    let files = getContainer('files');

    container.addEventListener('click', function (event) {
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

function playSong(index) {
    let song = playlist[index];

    current_song = index;

    let filepath = song.filepath;
    let audio_src = server_port + "/" + filepath;

    if (audio !== undefined) {

        audio.pause();
        audio = new Audio(audio_src);
    } else {
        audio = new Audio(audio_src);
        audio.play();
    }

    audio.play();

    updateTags(filepath);
    audio.addEventListener('ended', function () {
        playNextSong();
    });
}

function listenToFile() {
    let container = getContainer('files');

    container.addEventListener('click', function (event) {
        if (event.target.id === "file") {
            selected_file = Number(event.target.getAttribute('index'));
            console.log(selected_file)

            playSong(selected_file);
        }
    })
}


listenToFile()


function updateTags(filepath) {
    let this_song = playlist.filter(file => file.filepath === filepath)[0];
    console.log(this_song)

    let DOMArtist = document.getElementById('now_playing_artist');
    let DOMTitle = document.getElementById('now_playing_title');

    let artist = this_song.artist;
    let title = this_song.title;

    DOMArtist.innerHTML = artist;
    DOMTitle.innerHTML = title;
}

function playNextSong() {
    if (current_song < playlist.length - 1) {
        playSong(Number(current_song) + 1)
    } else {
        playSong(Number(0));
    }
}

function playPreviousSong() {
    if (current_song > 0) {
        playSong(Number(current_song) - 1)
    } else {
        playSong(Number(playlist.length - 1));
    }
}

previous_button.addEventListener('click', function () {
    playPreviousSong();
});

next_button.addEventListener('click', function () {
    playNextSong();
});

