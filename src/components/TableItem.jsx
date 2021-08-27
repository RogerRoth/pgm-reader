import { useState, useEffect } from "react";

import { CoordenateHeader } from "./CoordenateHeader";
import { CoordenateItem } from "./CoordenateItem";
import "../styles/table.scss";


export function TableItem(props) {
    const [coordenates, setCoordenates] = useState([]);
    
    useEffect(() => {
        console.log(props.data)

        const {id, data, column, line} = props.data;

        let dataIndex = 0;
        let coordCount = 0;
        let xTRs;
        let xTable = document.getElementById(id);
        xTable.innerHTML = '';

        for (let i = 0; i < line; i++) {
            xTable.appendChild(xTRs = document.createElement("tr"));
            for (let j = 0; j < column; j++) {
                let xTD = document.createElement("td");
                xTD.setAttribute('class', 'c'+data[dataIndex]);

                xTD.appendChild(document.createTextNode(data[dataIndex]));
                if (data[dataIndex] == '0'){
                    let coordenate = { 
                        name: 'Ponto '+coordCount, 
                        x: j + 1, 
                        y: i + 1,
                    }
                    coordCount++;
                    setCoordenates((coordenates) => [...coordenates, coordenate]);
                }
                xTRs.appendChild(xTD);
                dataIndex++;
            }
        }
    }, []);

    return(
        <>
            <table className="table-item" id={props.data.id}></table>

            <section className="coordenate-list">
                <CoordenateHeader />
                <ul>
                    {coordenates.map(coordenate => {
                        return <CoordenateItem key={coordenate.name} nameCoordenate={coordenate.name} posX={coordenate.x} posY={coordenate.y}/>
                    })}
                    
                </ul>
            </section>
        </>
    )
}