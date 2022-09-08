
const userHeads =  ["name", "age", "status"]
const addForm = document.querySelector("#addForm")
const editForm = document.querySelector("#editForm")
const dataWrap = document.querySelector("#dataWrap")
const single = document.querySelector("#single")




const readFromStorage = (key= "users", dataType="array") => {
    let data
    try{
        data = JSON.parse(localStorage.getItem(key)) || []
        if(!Array.isArray(data) && dataType=="array") throw new Error("data is not an array")
    }
    catch(e){
        data = []
    }
    return data
}

const writeToStorage = (data, key="users") => {
    localStorage.setItem(key, JSON.stringify(data))
}

const createTaskObject = (addForm) =>{
    let user = { id:Date.now() }
    userHeads.forEach(head => user[head]= addForm.elements[head].value)
    return user 
}
const createMyOwnEle = (eleTag, parent, txtContent=null, classes=null) =>{
    const myNewElement = document.createElement(eleTag)
    if(classes)  myNewElement.classList = classes
    if(txtContent) myNewElement.innerText= txtContent
    parent.appendChild(myNewElement)
    return myNewElement
}
const delUser = (users, i)=>{
    users.splice(i,1)
    writeToStorage(users)
    draw(users)
}
const showSingle = (user)=>{
    writeToStorage(user , "item")
    window.location.href = "single.html"
}
const editSingle = (user)=>{
    
    window.location.href = "edit.html"
    
}
const saveSingle = (users)=>{
    window.location.href = "edit.html"
    
}
const draw = (users) => {
    dataWrap.innerHTML=""
    if(users.length==0){
        let tr = createMyOwnEle("tr", dataWrap, null, "alert alert-danger")
        let td = createMyOwnEle("td", tr, "no data found", "alert alert-danger")
        td.setAttribute("colspan", "5")
    }
    users.forEach((user, i)=>{
        let tr = createMyOwnEle("tr", dataWrap)
        createMyOwnEle("td", tr, user.id)
        createMyOwnEle("td", tr, user.name)
        createMyOwnEle("td", tr, user.age)
        createMyOwnEle("td", tr, user.status)
        let td = createMyOwnEle("td", tr)
        
        let delBtn = createMyOwnEle("button", td, "delete", "btn btn-danger mx-2")
        delBtn.addEventListener("click", ()=>delUser(users, i) )

        let editBtn = createMyOwnEle("button", td, "edit", "btn btn-warning mx-2")
        editBtn.addEventListener("click", ()=> editSingle(users[i] ) )
        let showBtn = createMyOwnEle("button", td, "show", "btn btn-success mx-2")
        showBtn.addEventListener("click", ()=> showSingle(users[i] ) )
    })
}

if(addForm){
    addForm.addEventListener("submit", function(e){
        e.preventDefault()
        const user =createTaskObject(this)
        const users = readFromStorage()
        users.push(user)
        writeToStorage(users)
        window.location.href="index.html"
    })
}

if(editForm){
    editForm.addEventListener("submit", function(e){
        e.preventDefault()
        const users = readFromStorage()
        
       
       


    })
}

const editUser= (userId, newData) =>{
    const users = readFromStorage()
    const id = users.findIndex(user => user.id==userId)
    users[id]= newData
    writeToStorage(users)
    
}

if(dataWrap) {
    const users = readFromStorage()
    draw(users)
}

if(single){
    
    const user = readFromStorage("item", "object")
    if(Array.isArray(user)) createMyOwnEle("div", single, "no data to show", "alert alert-danger")
    else {
        createMyOwnEle("div", single, `Id : ${user.id}`, "alert alert-primary")
        createMyOwnEle("div", single, `Name : ${user.name}`, "alert alert-primary")
        createMyOwnEle("div", single, `Age : ${user.age}`, "alert alert-primary")
        createMyOwnEle("div", single, `Status : ${user.status}`, "alert alert-primary")}
}


