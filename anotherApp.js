function convertTableToXML(tableId,xmlName) {
    let xmlString = `<?xml version="1.0" encoding="UTF-8"?>\n<data>\n<${xmlName}>\n`;
    const table = document.querySelector(tableId);
    if (!table) return null;
    const tbody = table.getElementsByTagName('tbody')[0];
    const rows = tbody.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        const rowId = rows[i].getAttribute('id');
        xmlString += `  <row id="${rowId}">\n`;
        const cells = rows[i].getElementsByTagName('td');
        for (let j = 0; j < cells.length; j++) {
            const cellValue = cells[j].textContent;
            const headerText = table.rows[0].cells[j].textContent.toLowerCase().replace(/\s/g, '');
            xmlString += `    <${headerText}>${cellValue}</${headerText}>\n`;
        }
        xmlString += '  </row>\n';
    }
    xmlString += `</${xmlName}>\n</data>`;
    return xmlString;
}


function downloadXML(tableId,xmlName) {
    var xmlString = convertTableToXML(tableId,xmlName);
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
    downloadXML('#myTable','HelloInfo');
})
