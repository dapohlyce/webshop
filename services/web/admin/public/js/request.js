function getOrders() {
  setDetailsFalse();
  var url = '';
  var urlParamStatus = 0;
  urlParamStatus = getCurrentOrderFromParam(currentAdminPage);
  $('#jsonTableObjekt').children('table').eq(0).remove();
  setNewStatus = false;

  // $('#jsonTableObjekt').nextAll('div').remove();
  console.log("currentStatus: ");
  console.log(urlParamStatus);
  if(urlParamStatus == 0) {
    url = 'http://localhost:3001/order';
  } else if (urlParamStatus == 99) {
    url = 'http://localhost:3001/order/status/' + 1;
  } else if (statusString != '' && (urlParamStatus == 4 || urlParamStatus == 6)) {
    url = 'http://localhost:3001/order/status/' + statusString;
  } else {
    url = 'http://localhost:3001/order/status/' + urlParamStatus;
  }
  getOrderReq = true;
  var res = new XHR('GET', url);

  console.log("GetXHR Klasse wurde aufgerufen mit folgenden Objekt:");
  console.log(currentUrl);
}
function getCategories() {
  setDetailsFalse();
  var url = '';
  var urlParam = currentAdminPage;

  $('#jsonTableObjekt').children('table').eq(0).remove();

  if(urlParam == 'categories') {
    url = 'http://localhost:3002/category';
    var res = new XHR('GET', url);
    getCategoryReq = true;
    console.log("GetXHR Klasse wurde aufgerufen mit folgenden Objekt:");
    console.log(url);
  }
}
function getUsers() {
  setDetailsFalse();
  var url = '';
  var urlParam = currentAdminPage;
  console.log(urlParam);
  $('#jsonTableObjekt').children('table').eq(0).remove();

  if(urlParam == 'users') {
    url = 'http://localhost:3003/user';
    var res = new XHR('GET', url);
    getUsersReq = true;
    console.log("GetXHR Klasse wurde aufgerufen mit folgenden Objekt:");
    console.log(url);
  }
}
function postUser() {
  setDetailsFalse();
  var url = '';
  var urlParam = currentAdminPage;
  console.log(urlParam);

  // Get some values from elements on the page:
  var term = $('#firstname').val();
  var term2 = $('#lastname').val();
  var term3 = $('#email').val();

  console.log(term);
  console.log(term2);
  console.log(term3);
  $('#jsonTableObjekt').children('table').eq(0).remove();

  // Create an empty JSON object to return.
  var retJson = {};
  retJson.firstname = term;
  retJson.lastname = term2;
  retJson.mail = term3;
  var json = JSON.stringify(retJson);
  console.log(json);

  if((term != '') && (term2 != '') && (term3 != '')) {
    url = 'http://localhost:3003/user';
    var res = new XHR('POST', url, json, 'application/json');
    postUsersReq = true;
    console.log("PostXHR Klasse wurde aufgerufen mit folgenden Objekt:");
    console.log(json);
  }
}
function postGroup() {
  setDetailsFalse();
  var url = '';
  var urlParam = currentAdminPage;
  console.log(urlParam);

  // Get some values from elements on the page:
  var term = $('#groupname').val();
  console.log(term);
  $('#jsonTableObjekt').children('table').eq(0).remove();

  // Create an empty object to return.
  var retJson = {};
  retJson.groupname = term;
  // Create an string json to return
  var json = JSON.stringify(retJson);
  console.log(json);

  if(term != '') {
    url = 'http://localhost:3003/group';
    var res = new XHR('POST', url, json, 'application/json');
    postGroupsReq = true;
    console.log("PostXHR Klasse wurde aufgerufen mit folgenden Objekt:");
    console.log(json);
  }
}
function getGroups() {
  setDetailsFalse();
  var url = '';
  var urlParam = currentAdminPage;
  console.log(urlParam);
  $('#jsonTableObjekt').children('table').eq(0).remove();

  if(urlParam == 'groups') {
    url = 'http://localhost:3003/group';
    var res = new XHR('GET', url);
    getGroupsReq = true;
    console.log("GetXHR Klasse wurde aufgerufen mit folgenden Objekt:");
    console.log(url);
  }
}

function postCategory() {
  setDetailsFalse();
  var url = '';
  // Get some values from elements on the page:
  var term = $('#categoryname').val();
  var term2 = $('#categorypicture').val();

  $('#jsonTableObjekt').children('table').eq(0).remove();

  // Create an empty JSON object to return.
  var retJson = {};
  retJson.categoryname = term;
  retJson.picturepath = term2;

  // Create an string json to return
  var json = JSON.stringify(retJson);

  if( (term != '') && (term2 != '') ) {
    url = 'http://localhost:3002/category';
    var res = new XHR('POST', url, json, 'application/json');

    postCategoryReq = true;
    console.log("PostXHR Klasse wurde aufgerufen mit folgenden Objekt:");
    console.log(json);
  }

}
function putUser() {
  var url = '';
  var id = lastID;
  // Get some values from elements on the page:
  var term = $('#firstnameEdit').val();
  var term2 = $('#lastnameEdit').val();
  var term3 = $('#mailEdit').val();
  // var term4 = $('#loginnameEdit').val();

  // Create an empty JSON object to return.
  var retJson = {};
  retJson.firstname = term;
  retJson.lastname = term2;
  retJson.mail = term3;
  // retJson.loginname = term4;
  // if (true) {
  //   retJson.status = true;
  // }

  // Create an string json to return
  var json = JSON.stringify(retJson);

  if( (term != '') && (term2 != '') && (term3 != '')) {
    url = 'http://localhost:3003/user/' + id;
    var res = new XHR('PUT', url, json, 'application/json');

    putUserReq = true;
    console.log("PutXHR Klasse wurde aufgerufen mit folgenden Objekt:");
    console.log(json);
  }

}
function setNextStatus() {
  var url = '';
  var urlParamID = 0;
  var status = 0;
  urlParamID = lastID;
  status = lastStatus;

  if((urlParamID != null) && (status < 4) && (status != 0)) {
    setNewStatus = true;
    setOrderDetails = false;
    console.log("SetNextStatus() setzt die folgende ID: ");
    console.log(urlParamID);
    console.log("auf den nächsten Status: ");
    console.log(status);

    url = 'http://localhost:3001/order/' + urlParamID;
    var res = new XHR('PATCH', url);
    //setze lastID = 0 & lastStatus (Standartwert), sonst werden die OrderDetails nicht neu geladen!
    lastID = 0;
    lastStatus = 0;
    return true;
  } else {
    console.log("Statusänderung nicht erlaubt!")

    //show info status
    showStatusInfo("Changes for status with id = " + urlParamID + " not allowed!");
    //end of show info status
    return false;
  }


  console.log("PatchXHR Klasse wurde aufgerufen mit folgenden Objekt:");
  console.log(res);
}
function getOrderDetails(id) {
  setDetailsFalse();
  var url = '';
  console.log("getOrder ID for details: ");
  console.log(id);

  if(id != null) {
    setOrderDetails = true;
    setNewStatus = false;
    url = 'http://localhost:3001/order/' + id;
  }
  var res = new XHR('GET', url);


  console.log("UrlParams: ");
  console.log(currentUrl);

}
function getCategoryDetails(id) {
  setDetailsFalse();
  var url = '';
  console.log("getCategory ID for details: ");
  console.log(id);

  if(id != null) {
    setCategoryDetails = true;
    url = 'http://localhost:3002/category/' + id;
    var res = new XHR('GET', url);
  }
}
function getUserDetails(id) {
  setDetailsFalse();
  var url = '';
  console.log("getUser ID for details: ");
  console.log(id);

  if(id != null) {
    setUserDetails = true;
    url = 'http://localhost:3003/user/' + id;
    var res = new XHR('GET', url);
  }
}
function getGroupDetails(id) {
  setDetailsFalse();
  var url = '';
  console.log("getGroup ID for details: ");
  console.log(id);

  if(id != null) {
    setGroupDetails = true;
    url = 'http://localhost:3003/group/' + id;
    var res = new XHR('GET', url);
  }
}
function getArticleDetails(id) {
  setDetailsFalse();
  var url = '';
  console.log("getArticle ID for details: ");
  console.log(id);

  if(id != null) {
    setArticleDetails = true;
    url = 'http://localhost:3002/article/' + id;
    var res = new XHR('GET', url);
  }
}
