import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  // Simulación escalonada de usuarios virtuales (VUs)
  stages: [
    { duration: '5s', target: 10 }, // Sube a 10 usuarios en 5 segundos
    { duration: '10s', target: 20 }, // Mantiene 20 usuarios concurrentes por 10 segundos
    { duration: '5s', target: 0 },  // Baja a 0 usuarios en 5 segundos
  ],
  thresholds: {
    // Criterios de aceptación (SLA)
    http_req_failed: ['rate<0.01'], // Menos del 1% de peticiones fallidas
    http_req_duration: ['p(95)<1500'], // El 95% de las peticiones debe responder en menos de 1500ms
  },
};

export default function () {
  // Endpoint simulando consulta de registros/movimientos para la app Pesos
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const res = http.get(url);

  check(res, {
    'status es 200': (r) => r.status === 200,
    'respuesta no está vacía': (r) => r.body && r.body.length > 0,
  });

  // Pausa breve entre iteraciones para simular comportamiento real de usuario
  sleep(1);
}