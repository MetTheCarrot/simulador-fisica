function plantilla_texto(caja_element = HTMLElement, barra_element = HTMLElement, max_number = Number) {
    const valor = parseFloat(caja_element.value);   
    if (isNaN(valor) | valor == 0) {
        caja_element.value = 0;
        barra_element.value = 0;
        return;
    }   
    if (valor > max_number) {
        caja_element.value = max_number;
        barra_element.value = max_number;
        return;
    }
    if (valor < 0) {
        caja_element.value = 0;
        barra_element.value = 0;
        return;
    }
    barra_element.value = valor;
}

function calculateScale(panelSize) {
        const baseSize = 1; // 1m² base size
        const maxSize = 1.7; // the maximum size in meters
        const minScale = 20; // the minimum scale factor
        const maxScale = 25; // the maximum scale factor
        if (panelSize <= baseSize) {
            return minScale;
        } else if (panelSize >= maxSize) {
            return maxScale;
        } else {
            const scaleFactor = ((panelSize - baseSize) / (maxSize - baseSize)) * (maxScale - minScale) + minScale;
            return scaleFactor;
        }
    }

document.addEventListener('DOMContentLoaded', () => {

//  Cajas y barras de entrada start 
    const radiacion_caja = document.getElementById('radiacion_caja');
    const radiacion_barra = document.getElementById('radiacion_barra');
    const eficiencia_solar_caja = document.getElementById('eficiencia_solar_caja');
    const eficiencia_solar_barra = document.getElementById('eficiencia_solar_barra');
    const voltaje_barra = document.getElementById('selector_de_voltaje_barra');
    const voltaje_caja = document.getElementById('selector_de_voltaje_caja');
    const area_panel_solar_caja = document.getElementById('area_panel_solar_caja');
    const area_panel_solar_barra = document.getElementById('area_panel_solar_barra');
    const capacidad_de_bateria_caja = document.getElementById('capacidad_de_bateria_caja');
    const capacidad_de_bateria_barra = document.getElementById('capacidad_de_bateria_barra');
    const tiempo_de_exposicion_al_sol_caja = document.getElementById('tiempo_de_exposicion_al_sol_caja');
    const tiempo_de_exposicion_al_sol_barra = document.getElementById('tiempo_de_exposicion_al_sol_barra');
//  Cajas y barras de entrada end

// imagenes start
    const regulador_de_voltaje = document.getElementById('regulador-img');
    const panel_solar = document.getElementById('panel_solar_img');
    const sol_img = document.getElementById('img-sun');
    const rayos_sol = document.getElementById('rayos-img');
    const rayos2_sol = document.getElementById('rayos2-img');
// imagenes end

// Información start
    const bloque_de_información_información_producida = document.getElementById('info_corriente_producida_panel_solar');
    const bloque_de_información_potencia_electrica_generada = document.getElementById('info_potencia_electrica_generada_panel_solar');
    const bloque_de_informacion_tiempo_de_carga_bateria = document.getElementById('info_tiempo_de_carga_bateria');
    const bloque_de_informacion_capacidad_de_carga_bateria = document.getElementById('info_capacidad_de_carga_bateria');
// Información end

// celu start
    const select_celu = document.getElementById('select-celu');
    const img_celu = document.getElementById('phone-img');

    const bateria_celu = document.getElementById('bateria-celu');
    const energia_necesaria = document.getElementById('voltaje-celu');
    const tiempo_de_carga = document.getElementById('tiempo-carga-celu');
// celu end

    class Simulador {

        // celu

        actualizar_informacion(){
            bateria_celu.value = this.bateria_dispositivo + " mAh";
            energia_necesaria.value = this.carga_dispositivo + " V";

            let capacidadBateriaCelular = (this.bateria_dispositivo * this.carga_dispositivo) / 1000; // mAh
            let energia_utilizada = Math.min(this.potencia_electrica_generada, this.capacidad_carga_bateria * this.voltaje); // Wh
            let tiempoCarga = capacidadBateriaCelular / (energia_utilizada / this.capacidad_bateria)

            console.log("capacidadBateriaCelular: " + capacidadBateriaCelular)
            console.log("energia_utilizada: " + energia_utilizada)
            console.log("tiempoCarga: " + tiempoCarga)
            if(isNaN(tiempoCarga) || tiempoCarga == Infinity){
                tiempo_de_carga.value = "No cargable";
            } else {
                tiempo_de_carga.value = tiempoCarga.toFixed(2) + " h";
            }
        }

        actualizar_dispositivo(){
            const text = select_celu.options[select_celu.selectedIndex].text;
            console.log("Celular: " + text + " seleccionado");
            switch(text){
                case "SAMSUNG A30":
                    this.dispotivo = "SAMSUNG_A30";
                    this.bateria_dispositivo = 4000; // mAh
                    this.carga_dispositivo = 15; // v
                    img_celu.src = "./imgs/samsung130.webp";
                    break;
                case "IPHONE X":
                    this.dispotivo = "iPhone_X";
                    this.bateria_dispositivo = 2716; // mAh
                    this.carga_dispositivo = 5; // v
                    img_celu.src = "./imgs/iphonex.webp";
                    break;
                case "GALAXY NOTE 10":
                    this.dispotivo = "Galaxy_Note10";
                    this.bateria_dispositivo = 3500; // mAh
                    this.carga_dispositivo = 9; // v
                    img_celu.src = "./imgs/note.webp";
            }
            console.log("bateria: " + this.bateria_dispositivo + " mAh");
            console.log("carga: " + this.carga_dispositivo + " v");
            this.actualizar_informacion();
        }

        //imgs

        update_all_imgs(){
            this.actualizar_imagen_sol();
            this.eficiencia_solar_actualizar_imagen();
            this.area_panel_solar_actualizar_imagen();
            this.voltaje_actualizar_imagen();
        }

        actualizar_imagen_sol(){
            if(this.radiacion == 0){
                sol_img.style = "filter: grayscale(100%);"
                return;
            }
            // console.log("radiacion: " + radiacion)
            var porcentaje = 1/2000;
            porcentaje = porcentaje * this.radiacion;
            sol_img.style = "filter: drop-shadow(5px 5px 5px rgba(255, 0, 0," + porcentaje +"));"
            rayos_sol.style.opacity = porcentaje;
            rayos2_sol.style.opacity = porcentaje;
            // console.log("porcentaje: " + porcentaje)
        }

        eficiencia_solar_actualizar_imagen(){
            // panel_solar.style = "filter: grayscale(" + (100 - this.eficiencia_solar) + "%);"
            panel_solar.style.filter = "grayscale(" + (100 - this.eficiencia_solar * 100) + "%)";
        }

        area_panel_solar_actualizar_imagen(){
            //cambia el tamñao de la imagen de 20 a 25%
            // panel_solar.style = "width: " + calculateScale(this.area_panel_solar) + "%";
            panel_solar.style.width = calculateScale(this.area_panel_solar) + "%";
        }

        voltaje_actualizar_imagen(){
            var porcentaje = 1/29;
            porcentaje *= this.voltaje;
            regulador_de_voltaje.style.filter = "drop-shadow(5px 5px 5px rgba(255, 255, 0," + porcentaje +"))";
        }
        
        constructor(){
            this.radiacion = 0; // 0 - 2000 max
            this.eficiencia_solar = 0.00; // 0 - 100 max
            this.voltaje = 0; // 0 - 29 max
            this.area_panel_solar = 1; // 1 - 1.7 max
            this.capacidad_bateria = 50; // 50 - 200 max
            this.tiempo_exposicion_sol = 0; // 0 - 24 max

            // info
            this.potencia_electrica_generada = 0;
            this.energia_generada = 0;
            this.tiempo_de_carga_bateria = 0; 
            this.capacidad_carga_bateria = 0;

            //celu default
            this.dispotivo = "SAMSUNG_A30";
            this.bateria_dispositivo = 4000; // mAh
            this.carga_dispositivo = 15; // mAh
        }

        // Información start

        update_all(){
            this.update_all_imgs();
            this.potencia_electrica_generada_update();
            this.tiempo_de_carga_bateria_update();
            this.energia_generada_update();
            this.tiempo_de_capacidad_bateria_update();
            this.actualizar_dispositivo();
        }

        potencia_electrica_generada_update(){
            const potencia_electrica_generada = (this.radiacion * this.eficiencia_solar * this.area_panel_solar).toFixed(2);
            this.potencia_electrica_generada = potencia_electrica_generada;
            bloque_de_información_información_producida.value = potencia_electrica_generada + " V";
        }

        energia_generada_update(){
            const energia_generada = (this.potencia_electrica_generada * this.tiempo_exposicion_sol).toFixed(2);
            this.energia_generada = energia_generada;
            bloque_de_información_potencia_electrica_generada.value = energia_generada + " Vh";
        }

        tiempo_de_carga_bateria_update(){
            const tiempo_de_carga_bateria = (this.capacidad_carga_bateria / this.potencia_electrica_generada).toFixed(2);
            this.tiempo_de_carga_bateria = tiempo_de_carga_bateria;
            bloque_de_informacion_tiempo_de_carga_bateria.value = tiempo_de_carga_bateria + " h";
        }

        tiempo_de_capacidad_bateria_update(){
            const capacidad_carga_bateria = (this.capacidad_bateria * this.voltaje).toFixed(2);
            this.capacidad_carga_bateria = capacidad_carga_bateria;
            bloque_de_informacion_capacidad_de_carga_bateria.value = capacidad_carga_bateria + " Vh";
        }

        // tiempo exposición sol

        tiempo_de_exposicion_al_sol_update_barra(){
            tiempo_de_exposicion_al_sol_caja.value = tiempo_de_exposicion_al_sol_barra.value;
            this.tiempo_exposicion_sol = tiempo_de_exposicion_al_sol_barra.value;
            this.update_all();
        }

        tiempo_de_exposicion_al_sol_update_caja(){
            plantilla_texto(tiempo_de_exposicion_al_sol_caja, tiempo_de_exposicion_al_sol_barra, 12);
            this.tiempo_exposicion_sol = tiempo_de_exposicion_al_sol_caja.value;
            this.update_all();
        }

        // capacidad 

        capacidad_de_bateria_update_barra(){
            capacidad_de_bateria_caja.value = capacidad_de_bateria_barra.value;
            this.capacidad_bateria = capacidad_de_bateria_barra.value;
            this.update_all();
        }

        capacidad_de_bateria_update_caja(){
            plantilla_texto(capacidad_de_bateria_caja, capacidad_de_bateria_barra, 200);
            this.capacidad_bateria = capacidad_de_bateria_caja.value;
            this.update_all();
        }

        // radiacion start

        radiacion_update_barra(){
            radiacion_caja.value = radiacion_barra.value;
            this.radiacion = radiacion_barra.value;
            this.update_all();
        }
        
        radiacion_update_caja(){
            plantilla_texto(radiacion_caja, radiacion_barra, 2000);
            this.radiacion = radiacion_caja.value;
            this.update_all();
        }

        // radiacion end

        // eficiencia solar start

        eficiencia_solar_update_barra(){
            eficiencia_solar_caja.value = eficiencia_solar_barra.value;
            this.eficiencia_solar = eficiencia_solar_barra.value / 100;
            this.eficiencia_solar_actualizar_imagen();
            this.update_all();
        }

        eficiencia_solar_update_caja(){
            plantilla_texto(eficiencia_solar_caja, eficiencia_solar_barra, 100);
            this.eficiencia_solar = eficiencia_solar_caja.value / 100;
            this.eficiencia_solar_actualizar_imagen();
            this.update_all();
        }

        // eficiencia solar end

        // area panel solar start

        area_panel_solar_update_barra(){
            area_panel_solar_caja.value = area_panel_solar_barra.value;
            this.area_panel_solar = area_panel_solar_barra.value;
            this.area_panel_solar_actualizar_imagen();
            this.update_all();
        }

        area_panel_solar_update_caja(){
            plantilla_texto(area_panel_solar_caja, area_panel_solar_barra, 1.7);
            this.area_panel_solar = area_panel_solar_caja.value;
            this.area_panel_solar_actualizar_imagen();
            this.update_all();
        }

        // voltaje start

        voltaje_update_barra(){
            voltaje_caja.value = voltaje_barra.value;
            this.voltaje = voltaje_barra.value;
            this.voltaje_actualizar_imagen();
            this.update_all();
        }

        voltaje_update_caja(){
            plantilla_texto(voltaje_caja, voltaje_barra, 29);
            this.voltaje = voltaje_caja.value;
            this.voltaje_actualizar_imagen();
            this.update_all();
        }

        // voltaje end
        
    }
    
    const instancia = new Simulador();
    radiacion_barra.addEventListener('input', instancia.radiacion_update_barra.bind(instancia));
    radiacion_caja.addEventListener('input', instancia.radiacion_update_caja.bind(instancia));

    eficiencia_solar_barra.addEventListener('input', instancia.eficiencia_solar_update_barra.bind(instancia));
    eficiencia_solar_caja.addEventListener('input', instancia.eficiencia_solar_update_caja.bind(instancia));

    voltaje_barra.addEventListener('input', instancia.voltaje_update_barra.bind(instancia));
    voltaje_caja.addEventListener('input', instancia.voltaje_update_caja.bind(instancia));

    area_panel_solar_barra.addEventListener('input', instancia.area_panel_solar_update_barra.bind(instancia));
    area_panel_solar_caja.addEventListener('input', instancia.area_panel_solar_update_caja.bind(instancia));

    capacidad_de_bateria_barra.addEventListener('input', instancia.capacidad_de_bateria_update_barra.bind(instancia));
    capacidad_de_bateria_caja.addEventListener('input', instancia.capacidad_de_bateria_update_caja.bind(instancia));

    tiempo_de_exposicion_al_sol_barra.addEventListener('input', instancia.tiempo_de_exposicion_al_sol_update_barra.bind(instancia));
    tiempo_de_exposicion_al_sol_caja.addEventListener('input', instancia.tiempo_de_exposicion_al_sol_update_caja.bind(instancia));

    select_celu.addEventListener('change', instancia.actualizar_dispositivo.bind(instancia));

});