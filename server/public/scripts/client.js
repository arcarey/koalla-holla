console.log('js');

$(document).ready(function () {
  console.log('JQ');
  // Establish Click Listeners
  setupClickListeners();
  // load existing koalas on page load
  getKoalas();
}); // end doc ready

function setupClickListeners() {
  $('#addButton').on('click', addKoala);
}


function addKoala() {
  console.log('in addButton on click');
  // get user input and put in an object
  // NOT WORKING YET :(
  // using a test object
  let koalaToSend = {
    name: $('#nameIn').val(),
    age: $('#ageIn').val(),
    gender: $('#genderIn').val(),
    readyForTransfer: $('#readyForTransferIn').val(),
    notes: $('#notesIn').val(),
  };
  console.log(koalaToSend);
  // call saveKoala with the new obejct
  saveKoala(koalaToSend);
}

function saveKoala(newKoala) {
  console.log('in saveKoala', newKoala);
  // ajax call to server to get koalas
  $.ajax({
    method: 'POST',
    url: '/koalas',
    data: newKoala,
  })
    .then(function () {
      console.log('Post complted');
      getKoalas();
    })
    .catch(function (error) {
      alert('Error occured with data:', error);
    });
}


function getKoalas() {
  console.log('in getKoalas');
  // ajax call to server to get koalas
  $.ajax({
    type: 'GET',
    url: '/koalas'
  }).then(function (response) {
    console.log('GET', response);
    renderToDom(response);
  })
  .catch(function(error) {
    alert('things are bad', error);
});
}

function renderToDom(koalas) {
  console.log(koalas);
  //please check naming convention on ${koala.transfer}
  $('#viewKoalas').empty();

  for (let koala of koalas)//koalas? should this be something else?
  $('#viewKoalas').append(`
    <tr class="koalaTable">
      <td>${koala.name}</td>
      <td>${koala.age}</td>
      <td>${koala.gender}</td>
      <td>${koala.ready_to_transfer}</td>
      <td>${koala.notes}</td>
    </tr>
  `)

}



































function updateKoala(id, transfer) {
  $.ajax({
    url: `/koalas/transfer/${id}`,
    type: 'PUT',
    data: { ready_to_transfer: transfer },
  })
    .then(() => {
      getKoalas();
    })
    .catch((err) => {
      alert('Issue updating');
    });
}
