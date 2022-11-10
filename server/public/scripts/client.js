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

function getKoalas() {
  console.log('in getKoalas');
  // ajax call to server to get koalas
} // end getKoalas

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
