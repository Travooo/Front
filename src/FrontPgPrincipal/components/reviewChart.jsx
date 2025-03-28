import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const ReviewChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: "Média de Avaliações",
        data: data.map((item) => item.rating),
        backgroundColor: "#facc15",
      },
    ],
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Médias de Avaliações</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default ReviewChart;
