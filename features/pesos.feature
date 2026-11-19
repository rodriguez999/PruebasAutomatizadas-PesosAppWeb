# language: es
Funcionalidad: Gestión de Finanzas Personales en Pesos
  Como usuario de la aplicación "Pesos"
  Quiero registrar, consultar y administrar mis movimientos financieros y cuentas
  Para mantener un control preciso de mis finanzas y evitar gastos innecesarios

  Antecedentes:
    Dado que el usuario se encuentra autenticado en la plataforma "Pesos"

  # --- CASOS EXITOSOS ---

  Escenario: 1. Registro exitoso de un ingreso financiero
    * Explica que valida: Comprueba que el usuario puede registrar correctamente un ingreso especificando una descripción válida y un monto positivo, reflejándose inmediatamente en su balance.
    Dado que el usuario está en la pantalla principal de registro
    Cuando ingresa la descripción "Salario quincenal" y el monto "25000"
    Y hace clic en el botón "Agregar Movimiento"
    Entonces el sistema debe guardar el registro exitosamente
    Y el movimiento "Salario quincenal" por un monto de "$25000.00" debe aparecer en la lista de transacciones

  Escenario: 2. Consulta exitosa de información cambiaria vía API
    * Explica que valida: Valida que el sistema se conecta correctamente a la API externa de divisas y muestra de forma clara los datos oficiales de la moneda dominicana (DOP).
    Dado que el usuario navega hacia la sección de "Tasas y API"
    Cuando hace clic en el botón "Consultar Tasa USD/DOP"
    Y la API responde con un código de estado 200 OK
    Entonces la interfaz debe mostrar el estado de éxito con la información de la divisa "Dominican Republic"

  # --- CASOS DE ERROR Y VALIDACIÓN ---

  Escenario: 3. Intento de registro con campos de entrada vacíos
    * Explica que valida: Verifica que la aplicación protege la integridad de los datos evitando que el usuario envíe el formulario de transacciones si faltan campos obligatorios (como el monto o la descripción).
    Dado que el usuario está en la pantalla principal de registro
    Cuando deja los campos de descripción y monto en blanco
    Y hace clic en el botón "Agregar Movimiento"
    Entonces el sistema no debe permitir el registro
    Y debe mostrar un mensaje de error indicando "Por favor completa todos los campos correctamente"

  Escenario: 4. Intento de registro con montos negativos o inválidos
    * Explica que valida: Comprueba el comportamiento del sistema ante la introducción errónea de montos negativos, asegurando que se apliquen las reglas de negocio contables.
    Dado que el usuario está en la pantalla principal de registro
    Cuando ingresa la descripción "Compra errónea" y un monto negativo "-500"
    Y hace clic en el botón "Agregar Movimiento"
    Entonces el sistema debe detectar el valor no válido
    Y debe rechazar la transacción mostrando una alerta de validación en pantalla

  Escenario: 5. Manejo de error ante fallo de comunicación con la API externa
    * Explica que valida: Valida la resiliencia de la interfaz de usuario cuando ocurre un fallo de red o la API externa no está disponible (simulación de error 404), evitando que la app colapse.
    Dado que el usuario se encuentra en la sección de "Tasas y API"
    Cuando hace clic en el botón "Consultar Tasa USD/DOP"
    Y el servidor externo responde con un error de estado 404 Not Found
    Entonces la interfaz de la aplicación debe capturar el error
    Y debe mostrar un estado de "Fallido" junto con el mensaje descriptivo del error de red