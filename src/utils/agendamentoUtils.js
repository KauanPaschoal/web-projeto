export function getProximosDias(selectedDiaSemana) {
    const hoje = new Date();
    const dias = [];
    selectedDiaSemana = selectedDiaSemana || hoje.getDay();
    const inicio = 7;
    const qtdDias = 4;

    for (let i = 0; i < qtdDias; i++) {
        const proximoDia = new Date(hoje);
        const diferenca = ((selectedDiaSemana - hoje.getDay() + 7) % 7) + inicio + i * 7;
        proximoDia.setDate(hoje.getDate() + diferenca);
        dias.push(proximoDia.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }));
    }
    return dias;
}

export function getProximosDiasDoMes(selectedDiaSemana) {
    const hoje = new Date();
    const dias = [];
    const qtdDias = 4;
    for (let i = 0; i < qtdDias; i++) {
        const data = new Date(hoje);
        const diff = (selectedDiaSemana - data.getDay() + 7) % 7 + i * 7;
        data.setDate(data.getDate() + diff);
        dias.push(data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }));
    }
    return dias;
}

export function getNomeDiaSemana(diaSemana) {
    const dias = {
        "SEGUNDA": "Segunda-feira",
        "TERCA": "Terça-feira",
        "QUARTA": "Quarta-feira",
        "QUINTA": "Quinta-feira",
        "SEXTA": "Sexta-feira",
    };
    return dias[diaSemana] || "Indefinido";
}

export function formatDateToBackend(date) {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
}

export function formatHoraToBackend(hora) {
    if (!hora) return "00:00:00";
    if (/^\d{2}:\d{2}:\d{2}$/.test(hora)) return hora;
    if (/^\d{2}:\d{2}$/.test(hora)) return `${hora}:00`;
    return "00:00:00";
}

export function montarPacienteComPadrao(paciente, valoresSelecionados = {}) {
    const diasCalculados = getProximosDias(valoresSelecionados.diaSemana || paciente.diaSemana || 1);
    return {
        ...paciente,
        diaSemana: valoresSelecionados.diaSemana || paciente.diaSemana || 1,
        diaMes: diasCalculados,
        horario: valoresSelecionados.horario || paciente.horario || "08:00",
        selectedDate: valoresSelecionados.selectedDate || paciente.selectedDate || diasCalculados[0] || "",
        planoMensal: paciente.planoMensal || false,
        statusAgendamento: paciente.statusAgendamento || "Pendente",
        tipo: "AVULSO",
    };
}

export function formatDateToFrontend(date) {
  if (!date || typeof date !== 'string') return '';
  if (date.includes('/')) return date;
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
}