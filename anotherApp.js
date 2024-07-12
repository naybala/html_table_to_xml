const convertTableToXML = (tableId, xmlName) => {
  let xmlString = `<?xml version="1.0" encoding="UTF-8"?>\n<data>\n<${xmlName}>\n`;
  const table = document.querySelector(tableId);
  if (!table) return null; //if table not found all stop and will return
  const rows = getVisibleElements(table.getElementsByTagName("tr"));
  for (let i = 0; i < rows.length; i++) {
    const rowId = rows[i].getAttribute("id");
    if (rowId === null) continue; //if true below codes will be skip and for-loops will re-loop again
    xmlString += `  <row id="${rowId}">\n`;
    const cells = rows[i].getElementsByTagName("td");
    for (let j = 0; j < cells.length; j++) {
      const cellValue = cells[j].textContent;
      const headerText = rows[0].cells[j].textContent
        .toLowerCase()
        .replace(/\s/g, "");
      xmlString += `    <${headerText}>${cellValue}</${headerText}>\n`;
    }
    xmlString += "  </row>\n";
  }
  xmlString += `</${xmlName}>\n</data>`;
  return xmlString;
};

const getVisibleElements = (visibleTags) => {
  const visibleElements = Array.from(visibleTags).filter(
    (element) => !element.classList.contains("hidden")
  );
  return visibleElements;
};

const downloadXML = (tableId, xmlName) => {
  const xmlString = convertTableToXML(tableId, xmlName);
  const blob = new Blob([xmlString], { type: "text/xml" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = xmlName + ".xml";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const tableId = document.querySelector("#table-name").value;
const xmlName = document.querySelector("#xml-name").value;
const changeBtn = document.querySelector("#change-xml");
changeBtn.addEventListener("click", function () {
  downloadXML(tableId, xmlName);
});
