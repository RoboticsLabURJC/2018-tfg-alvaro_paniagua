var ajaxreq = new XMLHttpRequest();


function getCode(){
  /*
    This code creates extracts the text from the embedded code editor and
    creates a AJAX request to the server, then the server responses with a HTML
    which references the new file.
  */
  let editor = ace.edit("editor");
  let content = editor.getValue();

  ajaxreq.open('POST', 'http://localhost:8000/myAlgorithm', true);
  ajaxreq.onreadystatechange = function (aEvt) {
    if (ajaxreq.readyState == 4) {
        // Reload the iframe
        //document.getElementById('websimframe').src += '';
        document.getElementById('websimframe').contentWindow.location.reload();
    }
  };
  ajaxreq.send(content);
}
