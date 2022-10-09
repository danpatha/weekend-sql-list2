console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  //Establish Click Listeners
clickListeners()
 // load existing tasks on page load
  getList();
})

//Part I of adding a new task.
function clickListeners() {
    $( '#addButton' ).on( 'click', function(){
      console.log( 'in addButton on click' );
      // get user input and put in an object
      let taskToSend = {
        task: $('#taskIn').val(),
        estimatedTimeInMin:$('#estimatedTimeInMin').val(),
        dueDate:$('#dueDateIn').val(),
        Complete:$('#completeIn').val(),
        notes:$('#notesIn').val(),
      };
      
      // call saveKoala with the new obejct
      saveTask (taskToSend);
    });
}




function getList(){
    console.log( 'in getLIST' );
    // ajax call to server to get koalas
    $.ajax({
      url: '/list',
      method: 'GET'
    })
      .then((res) => {
        $('#viewTasks').empty();
        for(const tasks of res) {
          if(tasks.complete) {
            $('#viewTasks').append(`
              <tr>
                <td>${tasks.task}</td>
                <td>${tasks.estimatedTimeInMin}</td>
                <td>${tasks.dateDue}</td>
                <td>Completed</td>
                <td><button class="readyBtn" data-id="${tasks.id}">CHANGE TO <b>"NOT COMPLETED"</b></button></td>
                <td>${tasks.notes}</td>
                <td><button class="removeBtn" data-id="${tasks.id}">REMOVE</button></td>
              </tr>
            `);
          }
          else {
            $('#viewTasks').append(`
            <tr>
            <td>${tasks.task}</td>
            <td>${tasks.estimatedTimeInMin}</td>
            <td>${tasks.dateDue}</td>
            <td>Not Completed</td>
            <td><button class="readyBtn" data-id="${tasks.id}">CHANGE TO <b>"COMPLETED"</b></button></td>
            <td>${tasks.notes}</td>
            <td><button class="removeBtn" data-id="${tasks.id}">REMOVE</button></td>
          </tr>
          `);
          }
        }
      })
      .catch((err) => {
        console.log('Something went wrong! in getKoalas() GET ajax call', err);
      })
  } // end getKoalas

  //Part II of Adding a new task.
//   function saveTask(taskToSend){
//     console.log( 'in saveTask', taskToSend );
//     // ajax call to server to get tasks
//         $.ajax({
//         method: 'POST',
//         url: '/list',
//         data: taskToSend
//       })
//       .then((response) =>{
//        console.log(response)
//        getKoalas();
//       })
//       .catch((err) =>{
//         console.log('error in POST ',err)
//       })
//   }