function storeData(projects) {
    localStorage.myProjects = JSON.stringify(projects);
}

function retrieveData() {
    return JSON.parse(localStorage.myProjects)
}

export {storeData, retrieveData};