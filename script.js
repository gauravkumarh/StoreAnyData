//start form contol coding
var resister_form = document.querySelector('#resisterForm');
var allInput = resister_form.querySelectorAll("input");
var addBtn = document.querySelector('#add-btn');
var Model = document.querySelector('.model');
var closebtn = document.querySelector('.close-icon');
addBtn.onclick = function(){
    Model.classList.add("active");
}

closebtn.addEventListener("click",() => {
    Model.classList.remove("active");
    var i;
    for(i=0;i<allInput.length;i++){
        allInput[i].value = " ";
    }
})


//start globle variable
var userData = [];
var profile_pic = document.querySelector("#profile-pic");
var uploadPic = document.querySelector("#upload-field");
var idEl = document.querySelector('#id');
var nameEl = document.querySelector('#name');
var last_name = document.querySelector('#lastname');
var jobtitle = document.querySelector('#job_title');
var officecode = document.querySelector('#o_code');
var email = document.querySelector('#e_mail');
var resister$btn = document.querySelector('#resisterbtn');
var updateBtn = document.querySelector('#update-btn');
var resister_form = document.querySelector('#resisterForm');
var imgUrl;


//end all globle variable

resister$btn.onclick = function(e){
    // alert("Add Empoloye Successfull..✔")
    e.preventDefault();
    resistrationData(); 
    getDataFromLocal();
    resister_form.reset('');
    closebtn.click();

}
//store userData from localStorage..
if(localStorage.getItem("userData") != null){
  userData = JSON.parse(localStorage.getItem("userData"));

}
function resistrationData(){

 userData.push({
    
  id:idEl.value,
  name:nameEl.value,
  lastname:last_name.value,
  job_title:jobtitle.value,
  o_code:officecode.value,
  e_mail:email.value,
  profilePic : imgUrl == undefined ? "blank.png" : imgUrl
  
 });
 var userString = JSON.stringify(userData);
 localStorage.setItem("userData",userString);
 swal("Good job!", "Add Employee Succesfully", "success");
}

//start returning data on page
var tableData = document.querySelector("#table-data");
const getDataFromLocal = () =>{
    tableData.innerHTML = " ";
    userData.forEach((data,index) =>{
       tableData.innerHTML += `
       
       <tr index = '${index}'>
          <td>${index+1}</td>
          <td><img src="${data.profilePic}" width="40px" height="45"></td>
          <td>${data.id}</td>
          <td>${data.name}</td>
          <td>${data.lastname}</td>
          <td>${data.e_mail}</td>
          <td>${data.o_code}</td>
          <td>${data.job_title}</td>

          <td>
            <button class="edit-btn" style="background-color: #4286f5">
            <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="del-btn" style="background-color:white;color:#ee534f"><i class="ri-delete-bin-5-fill"></i></button>
          </td>
        </tr>
       `
    })
//start delete coding
var i;
var allDelBtn = document.querySelectorAll(".del-btn");
for(i=0;i<allDelBtn.length;i++){
    allDelBtn[i].onclick = function(){
       var tr = this.parentElement.parentElement;
       var id = tr.getAttribute("index");
       swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
       userData.splice(id,1);
       localStorage.setItem("userData",JSON.stringify(userData));
       tr.remove();
          swal("Your Employee data  has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your Employee Data is Safe..!");
        }
      });
       
    }
}

//start apdate codinng

var allEdit = document.querySelectorAll(".edit-btn") ;
for(i=0;i<allEdit.length;i++){
    allEdit[i].onclick = function(){
      var tr = this.parentElement.parentElement;
      var td = tr.getElementsByTagName("td");
      var index = tr.getAttribute("index");
      var imgTag = td[1].getElementsByTagName("img");
      var profilePic = imgTag[0].src;
      var id = td[2].innerHTML;
      var name = td[3].innerHTML;
      var lastname = td[4].innerHTML;
      var e_mail = td[5].innerHTML;  
      var o_code = td[6].innerHTML;
      var job_title = td[7].innerHTML;
      addBtn.click();
      resister$btn.disabled = true;
      updateBtn.disabled = false; 

      idEl.value = id;
      nameEl.value = name;
      last_name.value = lastname;
      jobtitle.value = job_title;
      officecode.value = o_code;
      email.value = e_mail;
      profile_pic.src =  profilePic;
      updateBtn.onclick = function(e){
       userData[index] = {

        id:idEl.value,
        name:nameEl.value,
        lastname:last_name.value,
        job_title:jobtitle.value,
        o_code:officecode.value,
        e_mail:email.value,
        profilePic : uploadPic.value == " "  ? profile_pic.src : imgUrl
       }
       localStorage.setItem("userData",JSON.stringify(userData));
      }

      
    }
}

}
getDataFromLocal();

//image processing


uploadPic.onchange = function(){
    if(uploadPic.files[0].size <1000000){

        var fReader = new FileReader();
        fReader.onload = function(e){
            imgUrl = e.target.result;
            profile_pic.src = imgUrl;
           
        }
        fReader.readAsDataURL(uploadPic.files[0]);

    }else("file size is to long..");
}

//start search coding

var searchEl = document.querySelector('#empId');
searchEl.oninput = function(){
  searachFuc();
}
function searachFuc(){

  var tr = tableData.querySelectorAll("tr");
  var filter = searchEl.value.toLowerCase();
  var i;
  for(i=0;i<tr.length;i++){
    var idEl = tr[i].getElementsByTagName("td")[2].innerHTML;
    var nameEl = tr[i].getElementsByTagName("td")[3].innerHTML;
    var lastname = tr[i].getElementsByTagName("td")[4].innerHTML;
    var e_mail = tr[i].getElementsByTagName("td")[5].innerHTML;
    var officecode = tr[i].getElementsByTagName("td")[6].innerHTML;
    var jobtitle = tr[i].getElementsByTagName("td")[7].innerHTML;


    // var id = td.innerHTML;
    if(idEl.toLowerCase().indexOf(filter) > -1){
      tr[i].style.display = "";
    }
    else if(nameEl.toLowerCase().indexOf(filter) > -1){
      tr[i].style.display = "";
    }
    else if (lastname.toLowerCase().indexOf(filter) > -1){
      tr[i].style.display = "";
    }
    else if (e_mail.toLowerCase().indexOf(filter) > -1){
      tr[i].style.display = "";
    }
    else if (officecode.toLowerCase().indexOf(filter) > -1){
      tr[i].style.display = "";
    }else if (jobtitle.toLowerCase().indexOf(filter) > -1){
      tr[i].style.display = "";
    }

    else{
      tr[i].style.display = "none";

    }
  }
}

// delete all data
var delAllBtn = document.querySelector('#del-all-data');
var allDelBox = document.querySelector('#del-all-box')
 delAllBtn.addEventListener('click',() => {
  if(allDelBox.checked == true){
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        localStorage.removeItem("userData");
        window.location = location.href;
        tr.remove();
        swal("Your Employee data  has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your Employee Data is Safe..!");
      }
    });
   
  }else{
    swal("checked the box","please checked the box to delete all data","warning");
  }
 })