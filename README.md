# Mini Herramienta BI - SPA con HTML, CSS y JS

## 📌 Descripción

Este proyecto es una **aplicación web de una sola página (SPA)** que funciona como una mini herramienta básica de **Inteligencia de Negocios (BI)** similar a funciones básicas de Excel.  
Permite al usuario cargar datos en formato CSV (copiar/pegar o importar archivo) y visualizar esos datos de manera estructurada y visual a través de tablas interactivas, gráficos configurables y un panel de estadísticas clave en tiempo real.

---

## ✨ Funcionalidades principales

- **Ingreso de datos CSV**:
  - Pegar texto CSV directamente en un área de texto.
  - Importar archivos CSV desde el sistema local.
  - Validación y advertencias si el CSV está mal formateado.

- **Tabla interactiva**:
  - Muestra los datos estructurados en una tabla con estilo moderno y accesible.
  - Filtrado básico por columnas (opcional para futuras mejoras).

- **Gráfica configurable**:
  - Selección dinámica de las columnas para eje X (categorías) y eje Y (valores numéricos).
  - Elección del tipo de gráfico: barras, líneas, radar, torta, dona.
  - Opción para elegir orientación del gráfico (horizontal o vertical) en gráficos de barras.
  - Visualización responsive y con contraste adecuado para modo claro y oscuro.
  - Exportación de la gráfica generada como imagen PNG.

- **📊 Panel de estadísticas en tiempo real (KPI)**:
  - Métricas automáticas calculadas sobre la columna seleccionada como eje Y:
    - Total de registros  
    - Suma  
    - Promedio  
    - Mínimo  
    - Máximo  
  - Se actualiza automáticamente al **pegar, editar o importar un CSV**, sin necesidad de presionar botones.
  - Diseño responsive y adaptado al **modo claro/oscuro**.
  - Compatible con accesibilidad gracias a `aria-live="polite"` (los lectores de pantalla anuncian los cambios de métricas).

- **Modo oscuro**:
  - Interfaz que cambia entre modo claro y oscuro con estilos personalizados y colores adaptativos para legibilidad.
  - El gráfico cambia colores para ser visible en ambos modos.

- **Accesibilidad (WCAG)**:
  - Uso de roles, etiquetas y atributos ARIA para asegurar que la aplicación es accesible para usuarios con diferentes discapacidades visuales y cognitivas.
  - Navegación con teclado, controles claros y feedback visual.

---

## 🛠️ Tecnologías usadas

- HTML5, CSS3 (variables CSS para temas y responsive design)
- JavaScript (ES6+)
- [Chart.js](https://www.chartjs.org/) para visualización gráfica
- **Sin backend** ni frameworks externos — todo funciona en el navegador.

---

## 🚀 Cómo usar la aplicación

1. **Pegar o importar CSV**: Copia datos CSV y pégalos en el área de texto o usa el botón para importar archivo.  
2. **Ver tabla**: Los datos se muestran organizados en una tabla debajo del área de entrada.  
3. **Consultar estadísticas en tiempo real**: Justo debajo de los controles se muestran métricas clave que se recalculan automáticamente a medida que los datos cambian.  
4. **Configurar gráfica**:
   - Selecciona la columna para el eje X (categorías).  
   - Selecciona la columna para el eje Y (valores numéricos).  
   - Elige el tipo de gráfico (barras, líneas, radar, torta, dona).  
   - Selecciona orientación (solo para barras).  
   - El gráfico se actualiza automáticamente en tiempo real.  
5. **Modo oscuro**: Usa el botón en la esquina para alternar entre modo claro y oscuro.  
6. **Exportar imagen**: Haz clic en el botón para exportar el gráfico generado como archivo PNG.  

---

## 📂 Ejemplo de CSV para prueba

```csv
Vendedor,Ventas
Ana,1200
Luis,950
Carlos,1800
María,1500
José,700
Laura,1100
