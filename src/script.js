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

document.addEventListener('DOMContentLoaded', () => {

//  Cajas y barras de entrada start 
    const radiacion_caja = document.getElementById('radiacion_caja');
    const radiacion_barra = document.getElementById('radiacion_barra');
    const eficiencia_solar_caja = document.getElementById('eficiencia_solar_caja');
    const eficiencia_solar_barra = document.getElementById('eficiencia_solar_barra');
//  Cajas y barras de entrada end
    
    
    class Simulador {
        
        constructor(){
            this.radiacion = 0; // 0 - 2000 max
            this.eficiencia_solar = 0; // 0 - 100 max
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
        }

        eficiencia_solar_update_caja(){
            plantilla_texto(eficiencia_solar_caja, eficiencia_solar_barra, 100);
        }

        // eficiencia solar end
        
    }
    
    const instancia = new Simulador();
    radiacion_barra.addEventListener('input', instancia.radiacion_update_barra.bind(instancia));
    radiacion_caja.addEventListener('input', instancia.radiacion_update_caja.bind(instancia));

    eficiencia_solar_barra.addEventListener('input', instancia.eficiencia_solar_update_barra.bind(instancia));
    eficiencia_solar_caja.addEventListener('input', instancia.eficiencia_solar_update_caja.bind(instancia));

});