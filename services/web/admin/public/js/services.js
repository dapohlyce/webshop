var currentStatus = 0;
var orderContainer = document.getElementById('jsonobjekt');
var btn = document.getElementById("btn");

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function setStatus() {
  getUrlVars();
  var currentPage = getUrlVars()["order"];

  switch(currentPage) {
    case 'open':
      currentStatus = 0;
      break;
    case 'paid':
      currentStatus = 1;
      break;
    case 'packed':
      currentStatus = 2;
      break;
    case 'returns':
      currentStatus = 3;
      break;
    default:
      currentStatus = 0;
  }
  $('#jsonobjekt').nextAll('div').remove();
  var res = new XHR('GET','http://localhost:3001/order/status/' + currentStatus + '.json');
}

function XHR(type, url) {
  promise = $.ajax({
    type: type,
    dataType: 'json',
    url: url,
    cache: false
    });
  promise.done(function (data) {
    console.log(data);
    console.log('Sucessfull data check');
    renderHTML(data);

  });
  promise.fail(function () {
    console.log('A failure occurred');
  });

}


function renderHTML(data) {
  var htmlString = "<table class=\"table table-striped\">";
  htmlString += "<thead><tr><th>ID</th><th>mail</th><th>timestamp</th></tr></thead>";

    for(let i = 0; i < data.length; i++) {
        htmlString += "<tbody>";
        htmlString += "<tr>";
        htmlString += "<td>" + data[i].id + "</td>";
        htmlString += "<td>" + data[i].mail + "</td>";
        htmlString += "<td>" + data[i].timestamp + "</td>";
        htmlString += "</tr>";
        htmlString += "</tbody>";
    }
    htmlString += "</table>"

  orderContainer.insertAdjacentHTML('beforeend', htmlString);

}

//********* NOCH IN ARBEIT *********

// $.ajax({
//   type: “GET”,
//   dataType: “json”,
//   url: “/server/tasks.json”, cache: false,
//   success: function(data) {
//   console.log(data); }
// });

// $.getJSON(“/server/tasks.json”, function (data) {
//   console.log(data);
// });
// das selbe mit promise:
// promise = $.ajax({
//   type: “GET”,
//   url: “/server/tasks.json”, cache: false
//   });
// promise.done(function (data) {
//   console.log(data); });
// promise.fail(function () {
//   console.log(‘A failure occurred’);
// });


// Das kann sinnvoll sein, wenn Sie mehrere AJAX-Calls ausführen, die Daten aggregieren und das DOM aktualisieren möchten:
// promise1 = $.ajax({
//   url: “/server/tasks.json”
// });
// promise2 = $.ajax({
//   url: “/server/tasks.json” });
//
// $.when(promise1, promise2).done(function (data1, data2) {
//   console.log(data1[0]);
//   console.log(data2[0]);
//   console.log(“Both requests have completed”);
// });


// Das Besondere an den Promises ist, dass Sie sie auch selbst in Ihren eige- nen APIs nutzen können. Nehmen wir eine Funktion, auf die das oben beschriebene Szenario zutrifft:
// cachedTasks = function () {
//   var tasks = null;
//   return {
//     getTasks: function () {
//       var deferred = $.Deferred();
//       if (tasks) {
//         deferred.resolve(tasks);
//         return deferred.promise();
//       } else {
//           var promise1 = $.ajax({
//           url: “/server/tasks.json”
//           });
//         promise1.done(function (data) {
//           tasks = data; setTimeout(function () {
//             deferred.resolve(tasks) }, 5000);
//         });
//
//         return deferred.promise();
//         }
//       }
//     }
// }();


// Wie bei den AJAX-Anfragen fügen wir dem von getTasks zurückgelieferten Promise ein Callback hinzu:
// promise = cachedTasks.getTasks(); promise.done(function (data) {
//   console.log(‘I have finished’); });

// Wenn Sie den Code durchgehen, erkennen Sie, dass das Promise bereits »fulfilled« ist, wenn wir unser Callback mit der Methode done hinzufügen. Deshalb wird dieses sofort ausgeführt. Sogar noch nach der Ausführung des Callback können wir dem Promise ein zweites Callback hinzufügen:
// promise.done(function (data) {
//   console.log(‘I have finished again’);
// });


// Nachfolgend ein Beispiel für eine Funktion, die ein task-Objekt an den Server übermittelt und ein Promise zurückliefert:
// function sendTask(task) {
//   return $.ajax({
//     type: “POST”,
//     url: “/submittask”,
//     contentType: “application/json”,
//     data: JSON.stringify(task)
//   });
  // Dieser Code lässt sich mit einer der jQuery-Kurzmethoden noch deutlich vereinfachen:
  // return $.post(»/submittask«, task);
// }
