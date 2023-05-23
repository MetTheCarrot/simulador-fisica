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
//  Cajas y barras de entrada end

// imagenes start
    const regulador_de_voltaje = document.getElementById('regulador-img');
    const panel_solar = document.getElementById('panel_solar_img');
// imagenes end
    
    
    class Simulador {
        
        constructor(){
            this.radiacion = 0; // 0 - 2000 max
            this.eficiencia_solar = 0; // 0 - 100 max
            this.voltaje = 0; // 0 - 29 max
            this.area_panel_solar = 1; // 1 - 1.7 max
        }
        
        // radiacion start

        radiacion_update_barra(){
            radiacion_caja.value = radiacion_barra.value;
            this.radiacion = radiacion_barra.value;
        }
        
        radiacion_update_caja(){
            plantilla_texto(radiacion_caja, radiacion_barra, 2000);
            this.radiacion = radiacion_caja.value;
        }

        // radiacion end

        // eficiencia solar start

        eficiencia_solar_update_barra(){
            eficiencia_solar_caja.value = eficiencia_solar_barra.value;
            this.eficiencia_solar = eficiencia_solar_barra.value;
            this.eficiencia_solar_actualizar_imagen();
        }

        eficiencia_solar_update_caja(){
            plantilla_texto(eficiencia_solar_caja, eficiencia_solar_barra, 100);
            this.eficiencia_solar_actualizar_imagen();
        }

        eficiencia_solar_actualizar_imagen(){
            panel_solar.style = "filter: grayscale(" + (100 - this.eficiencia_solar) + "%);"
        }

        // eficiencia solar end

        // area panel solar start

        area_panel_solar_update_barra(){
            area_panel_solar_caja.value = area_panel_solar_barra.value;
            this.area_panel_solar = area_panel_solar_barra.value;
            this.area_panel_solar_actualizar_imagen();
        }

        area_panel_solar_update_caja(){
            plantilla_texto(area_panel_solar_caja, area_panel_solar_barra, 1.7);
            this.area_panel_solar = area_panel_solar_caja.value;
            this.area_panel_solar_actualizar_imagen();
        }

        area_panel_solar_actualizar_imagen(){
            //cambia el tamñao de la imagen de 20 a 25%
            console.log("escala: " + calculateScale(this.area_panel_solar) + "%");
            panel_solar.style = "width: " + calculateScale(this.area_panel_solar) + "%";
        }

        // voltaje start

        voltaje_update_barra(){
            voltaje_caja.value = voltaje_barra.value;
            this.voltaje = voltaje_barra.value;
            this.voltaje_actualizar_imagen();
        }

        voltaje_update_caja(){
            plantilla_texto(voltaje_caja, voltaje_barra, 29);
            this.voltaje_actualizar_imagen();
        }

        voltaje_actualizar_imagen(){
            var porcentaje = 1/29;
            porcentaje *= this.voltaje;
            regulador_de_voltaje.style.filter = "drop-shadow(5px 5px 5px rgba(255, 255, 0," + porcentaje +"))";
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

});