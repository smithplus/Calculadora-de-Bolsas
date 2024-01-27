function ajustarPorcentajes(campoModificado) {
    var porcentajeHogar = parseFloat(document.getElementById('porcentajeHogar').value);
    var porcentajePersonal = parseFloat(document.getElementById('porcentajePersonal').value);
    var porcentajeAhorro = parseFloat(document.getElementById('porcentajeAhorro').value);

    // Ajustar los otros dos campos para que la suma sea siempre 100%
    if (campoModificado === 'hogar') {
        porcentajeAhorro = 100 - porcentajeHogar - porcentajePersonal;
    } else if (campoModificado === 'personal') {
        porcentajeAhorro = 100 - porcentajeHogar - porcentajePersonal;
    } else if (campoModificado === 'ahorro') {
        porcentajePersonal = 100 - porcentajeHogar - porcentajeAhorro;
    }

    document.getElementById('porcentajeHogar').value = porcentajeHogar;
    document.getElementById('porcentajePersonal').value = porcentajePersonal;
    document.getElementById('porcentajeAhorro').value = porcentajeAhorro;
}

function calcularAportes() {
    var ingresoJuan = parseFloat(document.getElementById('ingresoJuan').value);
    var ingresoMarcos = parseFloat(document.getElementById('ingresoMarcos').value);
    var presupuestoHogar = parseFloat(document.getElementById('presupuestoHogar').value);

    // Obteniendo los porcentajes de los campos de entrada
    var porcentajeHogar = parseFloat(document.getElementById('porcentajeHogar').value) / 100;
    var porcentajePersonal = parseFloat(document.getElementById('porcentajePersonal').value) / 100;
    var porcentajeAhorro = parseFloat(document.getElementById('porcentajeAhorro').value) / 100;

    var porcentajeJuan = ingresoJuan / (ingresoJuan + ingresoMarcos);
    var porcentajeMarcos = ingresoMarcos / (ingresoJuan + ingresoMarcos);

    var aporteHogarJuan = presupuestoHogar * porcentajeJuan;
    var aporteHogarMarcos = presupuestoHogar * porcentajeMarcos;

    var personalJuan = porcentajePersonal * ingresoJuan;
    var ahorroJuan = porcentajeAhorro * ingresoJuan;

    var personalMarcos = porcentajePersonal * ingresoMarcos;
    var ahorroMarcos = porcentajeAhorro * ingresoMarcos;

    var totalHogar = aporteHogarJuan + aporteHogarMarcos;
    var totalPersonal = personalJuan + personalMarcos;
    var totalAhorro = ahorroJuan + ahorroMarcos;

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
                <span>Juan debe aportar para el hogar:</span>
                <span class="monto">$${aporteHogarJuan.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span class="icono">👤</span>
                <span>Marcos debe aportar para el hogar:</span>
                <span class="monto">$${aporteHogarMarcos.toFixed(2)}</span>
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
                <span>Gasto personal de Juan:</span>
                <span class="monto">$${personalJuan.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span class="icono">👤</span>
                <span>Gasto personal de Marcos:</span>
                <span class="monto">$${personalMarcos.toFixed(2)}</span>
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
                <span>Ahorro de Juan:</span>
                <span class="monto">$${ahorroJuan.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span class="icono">👤</span>
                <span>Ahorro de Marcos:</span>
                <span class="monto">$${ahorroMarcos.toFixed(2)}</span>
            </div>
        </div>
    `;

    document.getElementById('resultados').innerHTML = resultadosHTML;
}