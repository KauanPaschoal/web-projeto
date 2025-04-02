import React from 'react'
import { Chart } from "react-google-charts";

const GraficoComponent = () => {
    const data = [
        ["Agendamentos", "Reagendados", "Concluídos"],
        ["Março", 15, 15],
        ["Abril", 11, 4],
        ["Maio", 6, 11],
        ["Junho", 10, 5],
        ["Julho", 8, 3],
        ["Agosto", 5, 1],
        ["Setembro", 12, 2],
        ["Outubro", 8, 4],
        ["Novembro", 8, 7],
    ];

    
    const options = {
        stacked: true,
        
    };
    return (
        <Chart
            width={"100%"}
            chartType="Bar"
            data={data}
            options={options}
        />
    );
}

export default GraficoComponent