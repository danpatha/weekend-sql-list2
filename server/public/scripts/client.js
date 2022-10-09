console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  //Establish Click Listeners
//clickListeners()
 // load existing tasks on page load
  getList();
  //Click Handlers
  $('#viewTasks').on('click', '.removeBtn', deleteTask);
  $('#viewTasks').on('click', '.completeBtn', completeTask);
  $( '#addButton' ).on( 'click', Listeners)
})

//Part I of adding a new task.
function Listeners() {
      console.log( 'in addButton on click' );
      // get user input and put in an object
      let taskToSend = {
        task: $('#taskIn').val(),
        estimatedTimeInMin:$('#estimatedTimeInMin').val(),
        // dueDate:$('#dueDateIn').val(),
        // Complete:$('#completeIn').val(),
        notes:$('#notesIn').val(),
      };
      
      // call saveTask with the new obejct
      saveTask (taskToSend);
    };


//GET
function getList(){
    console.log( 'in getLIST' );
    // ajax call to server to get tasks
    $.ajax({
      url: '/list',
      method: 'GET'
    })
      .then((res) => {
        $('#viewTasks').empty();
        for(const tasks of res) {
          if(tasks.complete) {
            $('#viewTasks').append(`
              <tr class="colorChange">
                <td>${tasks.task}</td>
                <td>${tasks.estimatedTimeInMin}</td>
                <td>Completed</td>
                <td><b>Done, GREAT JOB!</b></td>
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
            <td>Not Completed</td>
            <td><button class="completeBtn" data-id="${tasks.id}">CHANGE TO COMPLETED</button></td>
            <td>${tasks.notes}</td>
            <td><button class="removeBtn" data-id="${tasks.id}">REMOVE</button></td>
          </tr>
          `);
          }
        }
      })
      .catch((err) => {
        console.log('Something went wrong! in getList() GET ajax call', err);
      })
  } // end getTask

  //PUT
 function completeTask(){
    console.log('in completeBtn click');
    // taskId is the id of the task which was clicked
    const taskId = $(this).data('id');
    console.log('click to transfer id:', taskId);

    $.ajax({
      method:'PUT',
      url:`/list/${taskId}`
    })  
      //then insert the response as an argument to call getList() and update DOM
      .then(function(res) {
        getList();
      })
      .catch((err) => {
        console.log('PUT /list error', err)
      })
  }

  //DELETE
  function deleteTask(){
    console.log('in deleteTask', $(this).data("id"));
    //get the id from the DOM
    let taskId = $(this).data("id");
    //make a delete ajax request
    $.ajax({
        type: "DELETE",
        url: `/list/${taskId}`, // append bookID to the URL
    }).then(function(response){
      getList();
    }).catch(function(error){
    console.log('err on delete', error)
  });
  }

  //Part II of Adding a new task.
  function saveTask(taskToSend){
    console.log( 'in saveTask', taskToSend );
    // ajax call to server to get tasks
        $.ajax({
        method: 'POST',
        url: '/list',
        data: taskToSend
      })
      .then((response) =>{
       console.log(response)
       getList();
      })
      .catch((err) =>{
        console.log('error in POST ',err)
      })
  }