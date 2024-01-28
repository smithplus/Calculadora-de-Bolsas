function ajustarPorcentajes(campoModificado) {
    var porcentajeHogar = parseFloat(document.getElementById('porcentajeHogar').value) || 0;
    var porcentajePersonal = parseFloat(document.getElementById('porcentajePersonal').value) || 0;
    var porcentajeAhorro = parseFloat(document.getElementById('porcentajeAhorro').value) || 0;

    if (campoModificado === 'hogar') {
        porcentajePersonal = (100 - porcentajeHogar - porcentajeAhorro).toFixed(0);
        document.getElementById('porcentajePersonal').value = porcentajePersonal;
    } else if (campoModificado === 'personal') {
        porcentajeAhorro = (100 - porcentajeHogar - porcentajePersonal).toFixed(0);
        document.getElementById('porcentajeAhorro').value = porcentajeAhorro;
    } else if (campoModificado === 'ahorro') {
        porcentajeHogar = (100 - porcentajePersonal - porcentajeAhorro).toFixed(0);
        document.getElementById('porcentajeHogar').value = porcentajeHogar;
    }

    calcularAportes(); // Recalcular los aportes después del ajuste
}

function calcularAportes() {
    var ingresoAlpha = parseFloat(document.getElementById('ingresoAlpha').value) || 0;
    var ingresoBeta = parseFloat(document.getElementById('ingresoBeta').value) || 0;
    var presupuestoHogarInput = document.getElementById('presupuestoHogar');
    var presupuestoHogar = parseFloat(presupuestoHogarInput.value);

    var porcentajeHogar = parseFloat(document.getElementById('porcentajeHogar').value) / 100;
    var porcentajePersonal = parseFloat(document.getElementById('porcentajePersonal').value) / 100;
    var porcentajeAhorro = parseFloat(document.getElementById('porcentajeAhorro').value) / 100;

    var porcentajeAlpha = ingresoAlpha / (ingresoAlpha + ingresoBeta) || 0;
    var porcentajeBeta = ingresoBeta / (ingresoAlpha + ingresoBeta) || 0;

    if (presupuestoHogarInput.value.trim() === '') {
        presupuestoHogar = (ingresoAlpha + ingresoBeta) * porcentajeHogar;
    } else {
        presupuestoHogar = presupuestoHogar || 0;
    }

    var aporteHogarAlpha = presupuestoHogar * porcentajeAlpha;
    var aporteHogarBeta = presupuestoHogar * porcentajeBeta;

    var personalAlpha = porcentajePersonal * ingresoAlpha;
    var ahorroAlpha = porcentajeAhorro * ingresoAlpha;

    var personalBeta = porcentajePersonal * ingresoBeta;
    var ahorroBeta = porcentajeAhorro * ingresoBeta;

    var totalHogar = aporteHogarAlpha + aporteHogarBeta;
    var totalPersonal = personalAlpha + personalBeta;
    var totalAhorro = ahorroAlpha + ahorroBeta;

    var resultadosHTML = `
        <div class="result-card">
            <div class="result-header">
                <span class="icono">🏠</span>
                <span>Hogar</span>
                <span class="porcentaje">${(porcentajeHogar * 100).toFixed(0)}%</span>
                <span class="monto">$${totalHogar.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span class="icono">👤</span>
                <span>Alpha debe aportar para el hogar:</span>
                <span class="monto">$${aporteHogarAlpha.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span class="icono">👤</span>
                <span>Beta debe aportar para el hogar:</span>
                <span class="monto">$${aporteHogarBeta.toFixed(2)}</span>
            </div>
        </div>
        <div class="result-card">
            <div class="result-header">
                <span class="icono">🎁</span>
                <span>Personal</span>
                <span class="porcentaje">${(porcentajePersonal * 100).toFixed(0)}%</span>
                <span class="monto">$${totalPersonal.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span class="icono">👤</span>
                <span>Gasto personal de Alpha:</span>
                <<span class="monto">$${personalAlpha.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span class="icono">👤</span>
                <span>Gasto personal de Beta:</span>
                <span class="monto">$${personalBeta.toFixed(2)}</span>
            </div>
        </div>
        <div class="result-card">
            <div class="result-header">
                <span class="icono">🐖</span>
                <span>Ahorro</span>
                <span class="porcentaje">${(porcentajeAhorro * 100).toFixed(0)}%</span>
                <span class="monto">$${totalAhorro.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span class="icono">👤</span>
                <span>Ahorro de Alpha:</span>
                <span class="monto">$${ahorroAlpha.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span class="icono">👤</span>
                <span>Ahorro de Beta:</span>
                <span class="monto">$${ahorroBeta.toFixed(2)}</span>
            </div>
        </div>
    `;

    document.getElementById('resultados').innerHTML = resultadosHTML;
}

// Inicializar la calculadora al cargar la página
document.addEventListener('DOMContentLoaded', calcularAportes);
