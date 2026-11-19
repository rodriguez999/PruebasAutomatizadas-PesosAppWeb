# Pesos - Aplicación de Finanzas Personales y Pruebas Automatizadas

Proyecto de finanzas personales diseñado para la gestión y control de ingresos, egresos y cuentas múltiples, complementado con una suite completa de **pruebas automatizadas** utilizando **Playwright**.

---

## Tecnologías Utilizadas
* **Frontend:** HTML5, CSS3, JavaScript (Vanilla).
* **Pruebas Automatizadas:** Playwright (Node.js).
* **Control de Versiones:** Git y GitHub.

---

## Estructura del Proyecto
```text
pesos-test/
│
├── index.html          # Interfaz principal de registro de transacciones
├── tasas.html          # Vista de monitoreo de divisas y pruebas de API
├── style.css           # Estilos generales de la aplicación
├── app.js              # Lógica de la aplicación y consumo de API
├── tests/
│   └── app.spec.js     # Suite de pruebas automatizadas (Playwright)
└── evidencias/         # Capturas de pantalla de los resultados y reportes

Pruebas Automatizadas (Playwright)
El proyecto incluye 5 casos de prueba automatizados que validan tanto la interfaz de usuario (UI) como las respuestas de red y API:

Navegación entre páginas: Comprueba la transición correcta entre la página de inicio (index.html) y la de tasas (tasas.html).

Registro de Movimiento: Valida el llenado del formulario y la inserción dinámica de los datos en la lista de transacciones.

Validación de Campos Vacíos: Comprueba el manejo de errores ante intentos de envío de formularios incompletos.

Petición API Exitosa (Mock 200): Verifica la correcta integración y visualización de datos simulados provenientes de una API externa.

Manejo de Errores de API (Mock 404): Comprueba que la aplicación maneje adecuadamente los fallos de red o códigos de estado erróneos.

 Instrucciones de Ejecución Local
Si deseas clonar y ejecutar este proyecto en tu computadora, sigue estos pasos:

Clonar el repositorio:

git clone [https://github.com/tu-usuario/pesos-test.git](https://github.com/tu-usuario/pesos-test.git)
cd pesos-test

Instalar las dependencias de Playwright:

npm install
npx playwright install

Ejecutar las pruebas automatizadas:

Modo consola rápido:

- npx playwright test

Modo reporte visual interactivo:

npx playwright test --reporter=html
npx playwright show-report

Modo reporte visual interactivo:

npx playwright test --reporter=html
npx playwright show-report