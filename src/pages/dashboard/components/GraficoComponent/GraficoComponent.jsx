import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import "./GraficoComponent.css";
import { getDadosGrafico } from "../../../../provider/api/dashboard/fetchs-dashboard";

const GraficoComponent = () => {

  const [loading, setLoading] = React.useState(true);
  const [dadosGrafico, setDadosGrafico] = React.useState([]);
  const [error, setError] = React.useState(null);

  const data = [
  ["Agendamentos", "Cancelados", "Concluídos"],
  ...dadosGrafico.map(item => [
    capitalizeFirstLetter(item.nomeMes),
    item.qtdCancelada,
    item.qtdConcluida
  ])
];

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
} 

  useEffect(() => {
    const fetchDadosGrafico = async () => {

      try {
        const dadosGraficoData = await getDadosGrafico();

        setDadosGrafico(dadosGraficoData);

        console.log('DADOS GRAFICO:', dadosGraficoData);

      } catch (err) {
        setError(err.message || 'Erro ao buscar dados das KPIs');
      } finally {
        setLoading(false);
      }
    };

    fetchDadosGrafico();
  }, []);

  const options = {
    stacked: true,
  };
  return (
    <Chart
      width={"100%"}
      chartType="Bar"
      data={data}
      options={options}
      height={"230px"}
      className="grafico-component"
    />
  );
};

export default GraficoComponent;
