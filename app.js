function convertTableToXML(tableId) {
    // Find the table element
    var table = document.querySelector(tableId);
    if (!table) {
        console.error('Table with id ' + tableId + ' not found.');
        return;
    }

    // Create an XML document
    var xmlDocument = document.implementation.createDocument(null, 'tableData');

    // Iterate through rows and cells
    var rows = table.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var xmlRow = xmlDocument.createElement('row');
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

    // var xmlString = new XMLSerializer().serializeToString(xmlDocument);
    // console.log(xmlString);
    return xmlDocument;
}

function downloadXML() {
    var xmlDocument = convertTableToXML('#myTable');
    var xmlString = new XMLSerializer().serializeToString(xmlDocument);
    var blob = new Blob([xmlString], { type: 'text/xml' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'table_data.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

var changeBtn = document.querySelector("#change-xml");
changeBtn.addEventListener("click",function(){
    downloadXML();
})