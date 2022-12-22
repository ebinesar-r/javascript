var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["first_name"] = document.getElementById("first_name").value;
    formData["last_name"] = document.getElementById("last_name").value;
    formData["email_address"] = document.getElementById("email_address").value;
    formData["dob"] = document.getElementById("dob").value;
    formData["state"] = document.getElementById("state").value;
    formData["city"] = document.getElementById("city").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.first_name;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.last_name;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.email_address;
    cell3 = newRow.insertCell(3);
    cell3.innerHTML = data.dob;
    cell3 = newRow.insertCell(4);
    cell3.innerHTML = data.state;
    cell4 = newRow.insertCell(5);
    cell4.innerHTML = data.city;
    cell4 = newRow.insertCell(6);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function handler(e) {
    const selectedDate = new Date(e.target.value);
    let selectedYear = selectedDate.getFullYear();
    let currentYear = new Date().getFullYear();
    console.log(currentYear - selectedYear)
    if (currentYear - selectedYear > 25) {
        document.getElementById("dob").value = e.target.value
        document.getElementById("dataValidationError").classList.add("hide");
    } else {
        alert("You are not eligable")
        document.getElementById("dob").value = null
    }


}

function resetForm() {
    document.getElementById("first_name").value = "";
    document.getElementById("last_name").value = "";
    document.getElementById("email_address").value = "";
    document.getElementById("dob").value = "";
    document.getElementById("state").value = "";
    document.getElementById("city").value = "";
    selectedRow = null;
}

function onEdit(td) {    
    selectedRow = td.parentElement.parentElement;   
    console.log(selectedRow)
    document.getElementById("first_name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("last_name").value = selectedRow.cells[1].innerHTML;
    document.getElementById("email_address").value = selectedRow.cells[2].innerHTML;
    document.getElementById("dob").value = selectedRow.cells[3].innerHTML;
    document.getElementById("state").value = selectedRow.cells[4].innerHTML;
    document.getElementById("city").value = selectedRow.cells[5].innerHTML;
    validate();
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.first_name;
    selectedRow.cells[1].innerHTML = formData.last_name;
    selectedRow.cells[2].innerHTML = formData.email_address;
    selectedRow.cells[3].innerHTML = formData.dob;
    selectedRow.cells[4].innerHTML = formData.state;
    selectedRow.cells[5].innerHTML = formData.city;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    let validateObj = { fname: true, lname: true, dob: true, email: true, state: true, city: true }

    if (document.getElementById("first_name").value == "") {
        validateObj.fname = false;
        document.getElementById("firstNameValidationError").classList.remove("hide");
    } else {
        validateObj.fname = true;
        if (!document.getElementById("firstNameValidationError").classList.contains("hide"))
            document.getElementById("firstNameValidationError").classList.add("hide");
    }

    if (document.getElementById("last_name").value == "") {
        validateObj.fname = false;
        document.getElementById("lastNameValidationError").classList.remove("hide");
    } else {
        validateObj.fname = true;
        if (!document.getElementById("lastNameValidationError").classList.contains("hide"))
            document.getElementById("lastNameValidationError").classList.add("hide");
    }


    if (document.getElementById("email_address").value != "") {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(document.getElementById("email_address").value) == false) {
            validateObj.email = false;
            document.getElementById("emailValidationError").innerText = "Invalid mail id"
            document.getElementById("emailValidationError").classList.remove("hide");
        } else {
            validateObj.email = true;
            if (!document.getElementById("emailValidationError").classList.contains("hide"))
                document.getElementById("emailValidationError").classList.add("hide");
        }
    } else {
        validateObj.email = false;
        document.getElementById("emailValidationError").innerText = "* Mail Id is required"
        document.getElementById("emailValidationError").classList.remove("hide");
    }
    if (document.getElementById("dob").value == "") {
        validateObj.dob = false;
        document.getElementById("dataValidationError").classList.remove("hide")
    } else {
        validateObj.dob = true;
        if (!document.getElementById("dataValidationError").classList.contains("hide"))
            document.getElementById("dataValidationError").classList.add("hide");
    }

    if (document.getElementById("state").value == "") {
        validateObj.state = false;
        document.getElementById("stateValidationError").classList.remove("hide");
    } else {
        validateObj.state = true;
        if (!document.getElementById("stateValidationError").classList.contains("hide"))
            document.getElementById("stateValidationError").classList.add("hide");
    }

    if (document.getElementById("city").value == "") {
        validateObj.city = false;
        document.getElementById("cityValidationError").classList.remove("hide");
    } else {
        validateObj.city = true;
        if (!document.getElementById("cityValidationError").classList.contains("hide"))
            document.getElementById("cityValidationError").classList.add("hide");
    }

    if (validateObj.fname == true && validateObj.lname == true && validateObj.email == true && validateObj.dob == true && validateObj.state == true && validateObj.city == true) {
        return true
    } else {
        return false;
    }
}
