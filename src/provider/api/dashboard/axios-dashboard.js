import axios from 'axios';

export const getSessoesSemana = async (anoSemanas) => {
  const params = new URLSearchParams();
  anoSemanas.forEach(semana => params.append('anoSemana', semana));
  const url = `/sessoes/kpi/sessoes-semana?${params.toString()}`;
  const response = await axios.get(url);
  return response.data;
};

// GET para sessões do dia atual
export const getSessoesDia = async () => {
  const response = await axios.get('/sessoes/dia');
  return response.data;
};

