function convertTableToXML(tableId) {
    var table = document.querySelector(tableId);
    if (!table) {
        console.error('Table with id ' + tableId + ' not found.');
        return;
    }
    var xmlDocument = document.implementation.createDocument(null, 'data');
    xmlDocument =  xmlDocument.appendChild("tableData");
    var tbody = table.getElementsByTagName('tbody')[0];
    var rows = tbody.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var rowId = row.getAttribute('id');
        var xmlRow = xmlDocument.createElement('row');
        xmlRow.setAttribute('id', rowId);
        var cells = row.getElementsByTagName('td');
        for (var j = 0; j < cells.length; j++) {
            var cell = cells[j];
            var header = table.rows[0].cells[j].textContent.toLowerCase();
            var xmlElement = xmlDocument.createElement(header);
            xmlElement.textContent = cell.textContent;
            xmlRow.appendChild(xmlElement);
        }
        xmlDocument.documentElement.appendChild(xmlRow);
       
    }
     return xmlDocument;
}




function downloadXML(xmlName,tableId) {
    var xmlDocument = convertTableToXML(tableId);
    var xmlString = new XMLSerializer().serializeToString(xmlDocument);
    var blob = new Blob([xmlString], { type: 'text/xml' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = xmlName+'.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

var changeBtn = document.querySelector("#change-xml");
changeBtn.addEventListener("click",function(){
    downloadXML('table_data','#myTable');
})