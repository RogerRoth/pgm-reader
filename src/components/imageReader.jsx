export function ImageReader() {

    function startRead() {
        var file = document.getElementById('pgm-file').files[0];
        if(file){
          getAsText(file);
        }
    }

    function getAsText(readFile) {
        var reader = new FileReader();

        reader.onload = (e) => {
            const file = e.target.result;
            const data = file.split(/\r\n|\n/);
            const [ col, lin ] = data[2].split(' ');
            data.splice(0, 3);

            let fileName = readFile.name;
            createMatrix(data, col, lin, fileName);
        };

        reader.onerror = (e) => alert(e.target.error.name);
        reader.readAsText(readFile, "UTF-8");
    }

    function createMatrix(data, col, lin, fileName) {
        let dataIndex = 0;
        let coordList = [];
        let xTRs;
        var xTable = document.getElementById('matrix-table');
        xTable.innerHTML = '';

        for (var i = 0; i < lin; i++) {
            xTable.appendChild(xTRs = document.createElement("tr"));
            for (var j = 0; j < col; j++) {
                var xTD = document.createElement("td");
                xTD.appendChild(document.createTextNode(data[dataIndex]));
                if (data[dataIndex] == '0'){
                    coordList.push({name: 'ponto '+coordList.length , x: j + 1, y: i + 1})
                }
                xTRs.appendChild(xTD);
                dataIndex++;
            }
        }

        let caption = xTable.createCaption();
        caption.textContent = fileName;

        var coordTable = document.getElementById('coord-table');
        coordTable.innerHTML = '';
        
        var cTRs;
        if(coordList.length > 0) {
            coordTable.appendChild(cTRs = document.createElement("tr"));
            var cTH = document.createElement("th");
            cTH.appendChild(document.createTextNode("Coordenadas"));
            cTRs.appendChild(cTH);

            cTH = document.createElement("th");
            cTH.appendChild(document.createTextNode("  X  "));
            cTRs.appendChild(cTH);

            cTH = document.createElement("th");
            cTH.appendChild(document.createTextNode("  Y  "));
            cTRs.appendChild(cTH);

        }

        for (var c = 0; c < coordList.length; c++){
            coordTable.appendChild(cTRs = document.createElement("tr"));
            var cTD = document.createElement("td");
            cTD.appendChild(document.createTextNode(coordList[c].name));
            cTRs.appendChild(cTD);

            cTD = document.createElement("td");
            cTD.appendChild(document.createTextNode(coordList[c].x));
            cTRs.appendChild(cTD);

            cTD = document.createElement("td");
            cTD.appendChild(document.createTextNode(coordList[c].y));
            cTRs.appendChild(cTD);
        }
    }


    return (
        <div className="image-reader">
            <h1>Image Reader</h1>
            <strong>Representador de imagens .pgm</strong><br/>
            <input type="file" id="pgm-file"></input><br/>
            <button type="button" onClick={startRead} >Representar</button>
            <table id="matrix-table"></table>
            <table id="coord-table" border="1px" ></table>
        </div>
    )
}