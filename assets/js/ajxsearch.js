
// Var globales qui vont nous servir
var results = document.getElementById("results");
var search = document.getElementById("search");

search.value="";


// Fonction de récupération d'un objet XMLHttpRequest
function getXhr() {
	var xhr = null ;
	if(window.XMLHttpRequest) // Firefox et autres
		xhr = new XMLHttpRequest() ;
	else if(window.ActiveXObject){ // Internet Explorer < 7
		try {
			xhr = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	else { // XMLHttpRequest non supportée par le navigateur
		alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest...");
		xhr = false;
	}
	return xhr;
}



function getSearchResults(){
  var searchVal = search.value;
	searchVal=searchVal.trimEnd();
  if(searchVal.length < 1){
    //results.style.display='none';
    return;
  }

  console.log('searchVal : ' + searchVal);
  var xhr = getXhr();
  var url = '/organisme/resAjx.php?search=' + searchVal;
  // open function
  xhr.open('GET', url, true);

  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
      var text = xhr.responseText;

      //alert(text);
			if (text.length>1) {
				results.innerHTML = text;
	      //results.style.display='block';
			} else {
				//results.style.display='none';
			}
      //console.log('response from searchresults.php : ' + xhr.responseText);

    }
  }

  xhr.send();
}

function completebar(suggest) {
	var text = suggest.innerHTML;
	var search = document.getElementById("search");
	//alert(text);
	//alert(search.innerHTML);
	search.value=text;
	results.style.display='none';
}





function getSuggest(input) {
	//alert("input : "+input+" vle:"+input.value+"id : "+input.id);
	//alert("cool : " + input.id+'Results');
	var value = input.value;
	var results = document.getElementById(input.id+'Results');


  console.log(input.id+' : ' + value);

  var xhr = getXhr();
  var url = '../recherche/resAjx.php?'+input.id+'=' + value;
  console.log(url);
  // open function
  xhr.open('GET', url, true);

  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
      var text = xhr.responseText;
			if (text.length>1) {
				results.innerHTML = text;
			} else {
				results.innerHTML ="";
			}
    }
	}
	xhr.send();
}
