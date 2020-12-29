var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var addBtn = document.getElementById("addBtn");
var inputs = document.getElementsByClassName("form-control");
var websites = [];
var editInput;

addBtn.onclick = function () {
  if (addBtn.innerHTML == "Submit") {
    addSiteName();
  } else {
    editSiteName();
  }
  displayData();
  resetForm();
  localStorage.setItem("websitesList", JSON.stringify(websites));
};
function editSiteName() {
  var website = {
    name: siteName.value,
    url: siteUrl.value,
  };
  websites[editInput] = website;
  localStorage.setItem("websitesList", JSON.stringify(websites));
}

if (localStorage.getItem("websitesList") == null) {
  websites = [];
} else {
  websites = JSON.parse(localStorage.getItem("websitesList"));
  displayData();
}

function addSiteName() {
  var website = {
    name: siteName.value,
    url: siteUrl.value,
  };
  websites.push(website);
  localStorage.setItem("websitesList", JSON.stringify(websites));
}

function displayData() {
  var trs = "";
  for (var i = 0; i < websites.length; i++) {
    trs += `
      <tr class="container">
       <td><p>${websites[i].name}</p></td>
       <td><a class="btn btn-primary" target="_blank" href="${websites[i].url}">Visit</a>'</td>
       <td><button onclick="deleteWebsite(${i})" class="btn btn-danger ">Delete</button></td>
       <td><button onclick="getWebData(${i})" class="btn btn-warning ">Update</button></td>
      <tr>
       `;
  }
  document.getElementById("tableBody").innerHTML = trs;
}

function resetForm() {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}

function deleteWebsite(item) {
  websites.splice(item, 1);
  localStorage.setItem("websitesList", JSON.stringify(websites));
  displayData();
}

function searchWebsite(item) {
  var trs = "";
  for (var i = 0; i < websites.length; i++) {
    if (websites[i].name.toLowerCase().includes(item.toLowerCase())) {
      trs += `
        <tr class="container">
         <td><p>${websites[i].name}</p></td>
         <td><button onclick="visitWebsite(${i})" class="btn btn-warning ">visit</button></td>
         <td><button onclick="deleteWebsite(${i})" class="btn btn-danger ">Delete</button></td>
         <td><button onclick="updateWebsite(${i})" class="btn btn-warning ">Update</button></td>
         <tr>
         `;
    }
  }
  document.getElementById("tableBody").innerHTML = trs;
}

function getWebData(index) {
  editInput = index;
  siteName.value = websites[index].name;
  siteUrl.value = websites[index].url;

  addBtn.innerHTML = "Update";
}
