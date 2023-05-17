function getAllUsers() {
    // Find a <table> element with id="users":
    const table = document.getElementById('users');
  
    const url = 'http://localhost:4000/fetch-all-users';
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((users) => {
  
        users.map(function (user) {
          // Create an empty <tr> element and add it to the 1st position of the table:
          let newRow = table.insertRow();
          let cell1 = newRow.insertCell(0);
          let cell2 = newRow.insertCell(1);
          let cell3 = newRow.insertCell(2);
          cell1.innerHTML = user.name;
          cell2.innerHTML = user.email;
          cell3.innerHTML = "<span class='edit' onclick='fetchUser(" + user.id + ")'>Redigera</span><span class='delete' onclick='deleteUser(" + user.id + ")'>Radera</span>";
          cell3.dataset.userid = user.id;
  
        });
      }).catch(function (error) {
        console.log(error);
      });
  }

  getAllUsers();
  createUser();

  function createUser() {
    let userForm = document.getElementById("user-form");
  
    userForm.onsubmit = function (event) {
      event.preventDefault();
      let formData = new FormData(userForm);
      let data = {};
      formData.forEach(function (value, key) {
        data[key] = value;
      });

      const url = 'http://localhost:4000/create';
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((response) => {
        if (response.status === 200) {
          alert("Skapat!")
          location.reload();
        } else {
          alert("Error!")
        }
      });
    }
  }

  function deleteUser(userId) {
    const url = 'http://localhost:4000/delete';
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: userId })
    }).then((response) => {
      if (response.status === 200) {
        alert("Raderat!")
        location.reload();
      } else {
        alert("Error!")
      }
    });
  }

  function fetchUser(userId) {
    const url = 'http://localhost:4000/users/' + userId;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((user) => {
        let nameInput = document.getElementById("name");
        let emailInput = document.getElementById("email");
        let submitButton = document.getElementById("submit");
        nameInput.value = user[0].name;
        emailInput.value = user[0].email;
      
        submitButton.textContent = "Uppdatera";
        updateUser(userId);
      }).catch(function (error) {
        console.log(error);
      });
  }

  function updateUser(userId) {
    let userForm = document.getElementById("user-form");
    userForm.onsubmit = function (event) {
      event.preventDefault();
    
      let formData = new FormData(userForm);
      let data = {id: userId};
      formData.forEach(function (value, key) {
        data[key] = value;
      });
  
      const url = 'http://localhost:4000/update';
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((response) => {
        if (response.status === 200) {
          alert("Updaterat!")
          location.reload();
        } else {
          alert("Error!")
        }
      });
    }
  
  }
  