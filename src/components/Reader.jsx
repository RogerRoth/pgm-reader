import { useState } from "react";
import { TableItem } from "./TableItem";
import "../styles/reader.scss";

export function Reader() {
    const [tableData, setTableData] = useState([]);

    const handleFile = (e) => {
        let content = e.target.result;
        content = content.split(/\r\n|\n/);
        const [ col, lin ] = content[2].split(' ');
        content.splice(0, 3);

        console.log(name)

        const table = {
            id: e.timeStamp,
            data: content,
            column: col,
            line: lin,
        }

        setTableData([ table]);
    }
      
    const handleChangeFile = (file) => {
        let fileData = new FileReader();
        fileData.onloadend = handleFile;
        fileData.readAsText(file);
    }

    return (
        <div className="image-reader">
        
            <h1>PGM Reader</h1>

            <strong>Representador de imagens .pgm</strong>

            <div className="button-container">
                <input type="file" id="pgm-file" onChange={e => handleChangeFile(e.target.files[0])}></input>
                
            </div>

            {tableData.map(dataData => {
                return <TableItem key={dataData.id} data={dataData}/>
            })}
            <footer>
                Made by{" "}
                <a href="https://github.com/RogerRoth">Roger Rothmund</a>
            </footer>
        </div>
    )
}