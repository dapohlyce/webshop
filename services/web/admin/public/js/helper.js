// Alle Aufrufe
function helper() {
  $(".editOrderButton").click(function() {
    console.log("click editOrderButton");       // Prints out test text
    var id = $(this).closest("tr").find(".id").text();
    console.log(id);
    if (lastID == id) {
      console.log("Keine Neuzuweisung, da lastID = id")

    } else {
      console.log("Neuzuweisung auf: lastId = id")
      $('#jsonDetailTableObjekt').children('table').eq(0).remove();
      $('#jsonAddressTableObjekt').children('table').eq(0).remove();
      $('#curStatusButton').children('button').eq(0).remove();
      $('#modalDetailTitel').children('span').eq(0).remove();
      $('#modalDetailLogTitel').children('span').eq(0).remove();
      $('#orderLogContent').children('table').eq(0).remove();
      getOrderDetails(id);
    }
    // callOrderDetails = false;
  });
}
  // Set Name of Dropdown-Button's
  // ToDo! :Funktionert nach dem laden der Orderseite noch nicht.
  // Name von DropDown Button value eventuell im Cache zwischenspeichern
  $(".dropdown-menu li a").click(function(){
    var currentButton = $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    sessionStorage.setItem("loadStore", "currentButton");

      //
      // var selected = localStorage.getItem($(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>'));
      // if (selected) {
      //   $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
      // }
      //
      //
      // $(this).parents(".dropdown").find('.btn').val($(this).data('value').change(function() {
      //   localStorage.setItem('selected', $(this).val());
      //   location.reload();
      // });

  });

// When the user clicks the button...
localStorage.setItem('no_display', 'true');

// When a user visits the page...
var no_display = localStorage.getItem('no_display');
if (no_display !== 'true') {
  display_the_modal();
}

function setStatusOnButton() {
  var currentPage = getUrlVars()["order"];
  console.log("setStatusOnButton FKT loaded:")
  switch(currentPage) {
    case 'ordered':
      $(this).parents(".dropdown").find('#statusbtn').html($(this).text() + ' <span class="caret"></span>');
      $(this).parents(".dropdown").find('#statusbtn').val($(this).text('Test1'));
      // $(this).parents(".dropdown").find('btn').val($(this).data('Test1'));
      $("#statusbtn").val("United State");
      console.log("case load 1")
      break;
    case 'payed':
      $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
      $(this).parents(".dropdown").find('.btn').val($(this).text('Test1'));
      break;
    case 3:
      $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
      $(this).parents(".dropdown").find('.btn').val($(this).text('Test1'));
      break;
    case 4:
      $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
      $(this).parents(".dropdown").find('.btn').val($(this).text('Test1'));
      break;
    default:
      $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
      $(this).parents(".dropdown").find('.btn').val($(this).text('Test1'));
  }
}
