let studentName=document.querySelector('#studentName');
let studentDepartment=document.querySelector('#studentDepartment');
let studentGrade=document.querySelector('#studentGrade');
let studentNotes=document.querySelector('#studentNotes');
let search=document.querySelector('#search');
let add=document.querySelector('#add');
let clr=document.querySelector('#clr');
let tbody=document.querySelector('#tbody');
let formTitle=document.querySelector('#formTitle');
let count=document.querySelector('#count');

let students;
if(localStorage.getItem('studentSystem')!=null){
    students=JSON.parse(localStorage.getItem('studentSystem'));
}else{
    students=[];
}

let updateIndex=-1; // -1 means we are adding, any other number means we are updating

function addStudent(){
    if(namevalidation()==true&&studentDepartment.value!=''&&studentGrade.value!=''){
        let student={
            sname:studentName.value,
            sdept:studentDepartment.value,
            sGrade:Number(studentGrade.value),
            sNotes:studentNotes.value
        }

        if(updateIndex==-1){
            students.push(student);
        }else{
            students[updateIndex]=student;
        }

        localStorage.setItem('studentSystem',JSON.stringify(students));
        displayStudent()
        clearStudent()
        document.getElementById('allFields').classList.add('d-none');
    }else{
        document.getElementById('allFields').classList.remove('d-none');
    }
}
displayStudent()


function clearStudent(){
    studentName.value='';
    studentDepartment.value='';
    studentNotes.value='';
    studentGrade.value='';
    studentName.classList.remove('is-valid','is-invalid');
    document.getElementById('alert').classList.add('d-none');

    // go back to "add" mode
    updateIndex=-1;
    add.innerHTML='Add student';
    formTitle.innerHTML='New student';
}

function displayStudent(){
    let box='';
    for(let i=0; i<students.length; i++){
        box +=`<tr>
                <td>${i+1}</td>
                <td>${students[i].sname}</td>
                <td>${students[i].sdept}</td>
                <td><span class="badge ${students[i].sGrade>=50?'text-bg-success':'text-bg-danger'}">${students[i].sGrade}</span></td>
                <td>${students[i].sNotes}</td>
                <td><button class="btn btn-sm btn-warning" onclick="updateitem(${i})">Update</button></td>
                <td><button class="btn btn-sm btn-danger" onclick="deleteitem(${i})">Delete</button></td>
            </tr>
            `
    }
    tbody.innerHTML=box;
    count.innerHTML=students.length;
}

function deleteitem(id){
    students.splice(id,1);
    localStorage.setItem('studentSystem',JSON.stringify(students));
    clearStudent()
    displayStudent()
}

function updateitem(id){
    updateIndex=id;
    studentName.value=students[id].sname;
    studentDepartment.value=students[id].sdept;
    studentGrade.value=students[id].sGrade;
    studentNotes.value=students[id].sNotes;
    add.innerHTML='Save changes';
    formTitle.innerHTML='Edit student';
    namevalidation()
    window.scrollTo(0,0);
}

function searchitem(word){
    let searchbox='';
    for(let i=0; i<students.length; i++){
        if(students[i].sname.toLowerCase().includes(word.toLowerCase())){
            searchbox +=`<tr>
                <td>${i+1}</td>
                <td>${students[i].sname}</td>
                <td>${students[i].sdept}</td>
                <td><span class="badge ${students[i].sGrade>=50?'text-bg-success':'text-bg-danger'}">${students[i].sGrade}</span></td>
                <td>${students[i].sNotes}</td>
                <td><button class="btn btn-sm btn-warning" onclick="updateitem(${i})">Update</button></td>
                <td><button class="btn btn-sm btn-danger" onclick="deleteitem(${i})">Delete</button></td>
            </tr>`
        }
    }
    tbody.innerHTML=searchbox;
}

search.addEventListener('keyup',()=>{
    searchitem(search.value);
})


function namevalidation(){
    let regex=/^[A-Z][a-zA-Z ]{2,29}$/;
    let isMatch=regex.test(studentName.value);
    if(isMatch){
        studentName.classList.add('is-valid')
        studentName.classList.remove('is-invalid')
        document.getElementById('alert').classList.add('d-none')
        return true;
    }else{
        studentName.classList.add('is-invalid')
        studentName.classList.remove('is-valid');
        document.getElementById('alert').classList.remove('d-none')
        return false;
    }
}

studentName.addEventListener('blur',()=>{
    namevalidation()
})
