document.addEventListener('DOMContentLoaded', () => {
	const radiacionInput = document.getElementById('radiacion');
    const radiacionInfo = document.getElementById('radiacion-value');
	const eficienciaInput = document.getElementById('eficiencia');
	const eficienciaInfo = document.getElementById('eficiencia-value');
    const potenciaOutput = document.getElementById('potencia-producida');
	const voltajeInfo = document.getElementById('voltaje-panel-info');
	const voltajeInput = document.getElementById('voltaje-panel-value');
	const voltajeOutput = document.getElementById('corriente-este-si');
	const panel_img = document.getElementById('panel-img');
	const sol_img = document.getElementById('sun-img');
	const rayos_img = document.getElementById('flechas-img');
	
	// corriente

	const actualizarCorriente = () => {
		voltajeInput.value = voltajeInfo.value;

		// i = p / v
		const potencia = parseFloat(potenciaOutput.textContent);
		// console.log("potencia: " + potencia)
		const voltaje = parseFloat(voltajeInfo.value);
		// console.log("voltaje: " + voltaje)

		if(potencia == 0 || voltaje == 0){
			// console.log("potencia o voltaje es 0")
			voltajeOutput.textContent = "0.00";
			return;
		}

		const corriente = potencia / voltaje;
		console.log("corriente: " + corriente)

		voltajeOutput.textContent = corriente.toFixed(2);
	}

	voltajeInfo.addEventListener('input', actualizarCorriente);

	// voltaje

	voltajeOutput.textContent = "0.00";

	limite_voltaje = 170;

	const actualizarVoltaje = () => {
		const voltaje = parseFloat(voltajeInput.value);
		console.log(voltaje)
		
		if (isNaN(voltaje)){
			console.log("voltaje NaN")
			voltajeInput.value = 0;
		}

		if (voltaje > limite_voltaje) {
			console.log("mayor de 170")
			voltajeInput.value = voltajeInput.value.slice(0, -1);
		}
		voltajeInfo.value = voltajeInput.value;
		actualizarCorriente();
	}

	voltajeInput.addEventListener('input', actualizarVoltaje);
	

	// potencia

	potenciaOutput.textContent = "0.00";

    const rendimiento = 0.86; // Ratio de rendimiento de la instalación

    const actualizarPotencia = () => {
		const radiacion = parseFloat(radiacionInput.value);
		const eficiencia = parseFloat(eficienciaInput.value) / 100;
		const corriente = radiacion * eficiencia * rendimiento;
		potenciaOutput.textContent = corriente.toFixed(2);
		radiacionInfo.value = radiacionInput.value;
		eficienciaInfo.value = eficienciaInput.value;
		actualizarCorriente();
		actualizar_panel();
		actualizar_imagen_sol();
    };

	//EFICIENCIA
	const limite_eficiencia = 100;

	const actualizar_panel = () => {
		const eficiencia = parseFloat(eficienciaInput.value);
		panel_img.style = "filter: grayscale(" + (100 - eficiencia) + "%);"
	}

	const actualizar_imagen_sol = () => {
		const radiacion = parseFloat(radiacionInput.value);
		if(radiacion == 0){
			sol_img.style = "filter: grayscale(100%);"
			rayos_img.style = "transform:rotate(-40deg); filter: grayscale(100%);"
			return;
		}
		// console.log("radiacion: " + radiacion)
		var porcentaje = 1/2000;
		porcentaje = porcentaje * radiacion;
		sol_img.style = "filter: drop-shadow(5px 5px 5px rgba(255, 0, 0," + porcentaje +"));"
		rayos_img.style = "transform:rotate(-40deg); filter: drop-shadow(5px 5px 5px rgba(251, 116, 54," + porcentaje +"));"
		// console.log("porcentaje: " + porcentaje)
	}

	const eficienciaInfoEvent = () => {
		const eficiencia = parseFloat(eficienciaInfo.value);
		if (isNaN(eficiencia)){
			eficienciaInfo.value = 0;
		}
		if (eficiencia > limite_eficiencia) {
			// console.log("mayor de 100")
			eficienciaInfo.value = eficienciaInfo.value.slice(0, -1);
		}
		eficienciaInput.value = eficienciaInfo.value;
		actualizarCorriente();
		actualizar_panel();
	}

	eficienciaInfo.addEventListener('input', eficienciaInfoEvent);

	//RADIACION
	const limite_radiacion = 2000;

	const radiacionInfoEvent = () => {
		const radiacion = parseFloat(radiacionInfo.value);
		if (isNaN(radiacion)){
			radiacionInfo.value = 0;
		}
		if (radiacion > limite_radiacion) {
			// console.log("mayor de 2000")
			radiacionInfo.value = radiacionInfo.value.slice(0, -1);
		}
		radiacionInput.value = radiacionInfo.value;
		actualizarCorriente();
		actualizar_imagen_sol();
	}

	radiacionInfo.addEventListener('input', radiacionInfoEvent);	
    radiacionInput.addEventListener('input', actualizarPotencia);
    eficienciaInput.addEventListener('input', actualizarPotencia);

	actualizar_panel();
	actualizar_imagen_sol();

	});
