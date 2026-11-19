| Métrica | Resultado obtenido | Interpretación |
| :--- | :--- | :--- |
| **Usuarios virtuales (VUs)** | Hasta 20 VUs (20s de prueba) | Simulación escalonada de carga concurrente |
| **Solicitudes ejecutadas (`http_reqs`)** | 215 solicitudes (~10.36 req/s) | Todas completadas sin interrupciones (215 iteraciones) |
| **Tiempo de respuesta promedio (`avg`)** | 80.01 ms | Respuesta muy rápida (mín: 40.63 ms, mediana: 57.8 ms, máx: 1.05 s) |
| **Percentil 95 (`p(95)`)** | 208.87 ms | Muy por debajo del límite establecido de 1500 ms (✓) |
| **Porcentaje de errores (`http_req_failed`)** | 0.00% (0 de 215) | Estabilidad total bajo la carga simulada (✓) |
| **Verificaciones (`checks`)** | 100.00% (430 de 430) | Todas las validaciones de estado 200 y cuerpo no vacío pasaron |
| **Tráfico de red (`data_received` / `sent`)** | 6.1 MB recibidos / 69 kB enviados | Consumo de ancho de banda ligero y estable |