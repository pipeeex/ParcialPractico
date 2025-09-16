let chart;
let parsedData = [];

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}

document.getElementById('csvFile').addEventListener('change', function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
        document.getElementById('csvInput').value = event.target.result;
    };
    if (file) reader.readAsText(file);
});

function parseCSV() {
    const input = document.getElementById('csvInput').value.trim();
    const rows = input.split('\n').map(row => row.split(','));

    if (rows.length < 2) {
        alert('CSV inválido o vacío.');
        return;
    }

    const headers = rows[0];
    parsedData = rows.slice(1).map(row => {
        const obj = {};
        headers.forEach((h, i) => obj[h.trim()] = row[i]?.trim() || "");
        return obj;
    });

    populateTable(headers, parsedData);
    populateSelectors(headers);
}

function populateTable(headers, data) {
    let html = '<table><thead><tr>';
    headers.forEach(h => html += `<th>${h}</th>`);
    html += '</tr></thead><tbody>';

    data.forEach(row => {
        html += '<tr>';
        headers.forEach(h => html += `<td>${row[h]}</td>`);
        html += '</tr>';
    });

    html += '</tbody></table>';
    document.getElementById('tableContainer').innerHTML = html;
}

function populateSelectors(headers) {
    const xSel = document.getElementById('xSelect');
    const ySel = document.getElementById('ySelect');

    // Guardar selecciones actuales
    const prevX = xSel.value;
    const prevY = ySel.value;

    // Limpiar y volver a poblar
    xSel.innerHTML = '';
    ySel.innerHTML = '';
    headers.forEach(h => {
        xSel.innerHTML += `<option value="${h}">${h}</option>`;
        ySel.innerHTML += `<option value="${h}">${h}</option>`;
    });

    // Restaurar selección si sigue existiendo en los headers
    if (headers.includes(prevX)) xSel.value = prevX;
    if (headers.includes(prevY)) ySel.value = prevY;
}

function generateChart() {
    const xKey = document.getElementById('xSelect').value;
    const yKey = document.getElementById('ySelect').value;
    const chartType = document.getElementById('chartType').value;
    const orientation = document.getElementById('orientation').value;

    const labels = parsedData.map(d => d[xKey]);
    const values = parsedData.map(d => parseFloat(d[yKey]) || 0);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#ffffff' : '#000000';
    const gridColor = isDark ? '#666666' : '#cccccc';
    const barColor = isDark ? '#00bcd4' : '#3f51b5';

    if (chart) chart.destroy();

    const ctx = document.getElementById('chartCanvas').getContext('2d');

    const chartOptions = {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: yKey,
                data: values,
                backgroundColor: chartType === 'bar' || chartType === 'line' ? barColor : [
                    '#3f51b5', '#00bcd4', '#4caf50', '#ff9800', '#f44336', '#9c27b0'
                ],
                borderColor: barColor,
                fill: chartType !== 'line'
            }]
        },
        options: {
            indexAxis: (chartType === 'bar' && orientation === 'horizontal') ? 'y' : 'x',
            responsive: true,
            plugins: {
                legend: { display: true, labels: { color: textColor } },
                tooltip: { enabled: true }
            },
            scales: (chartType === 'pie' || chartType === 'radar') ? {} : {
                x: {
                    ticks: { color: textColor },
                    grid: { color: gridColor }
                },
                y: {
                    ticks: { color: textColor },
                    grid: { color: gridColor }
                }
            }
        }
    };

    chart = new Chart(ctx, chartOptions);
    updateStats(yKey);
}

document.querySelector('.dark-mode-toggle').addEventListener('click', () => {
    setTimeout(() => {
        if (chart) generateChart(); // Regenerar con nuevos colores
    }, 200);
});


function exportChart() {
    const link = document.createElement('a');
    link.download = 'grafico.png';
    link.href = document.getElementById('chartCanvas').toDataURL();
    link.click();
}
 function updateStats(yKey) {
    if (!parsedData.length || !yKey) return;

    const values = parsedData.map(d => parseFloat(d[yKey]) || 0);
    if (!values.length) return;

    const count = values.length;
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = (sum / count).toFixed(2);
    const min = Math.min(...values);
    const max = Math.max(...values);

    document.getElementById('stat-count').textContent = count;
    document.getElementById('stat-sum').textContent = sum;
    document.getElementById('stat-avg').textContent = avg;
    document.getElementById('stat-min').textContent = min;
    document.getElementById('stat-max').textContent = max;
}

// Escuchar cambios en tiempo real en el textarea
document.getElementById('csvInput').addEventListener('input', () => {
    parseCSV();
    const yKey = document.getElementById('ySelect').value;
    if (yKey) {
        updateStats(yKey);
        generateChart(); // ✅ se regenera respetando X/Y
    }
});
document.getElementById('csvFile').addEventListener('change', function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
        document.getElementById('csvInput').value = event.target.result;
        parseCSV();
        const yKey = document.getElementById('ySelect').value;
        if (yKey) {
            updateStats(yKey);
            generateChart();
        }
    };
    if (file) reader.readAsText(file);
});



