# API Testing Guide - Campos Corregidos

## Demoras

### POST /demoras
```json
{
  "id_operacion": 1,
  "fecha_hora_demora": "2023-11-09T10:00:00.000Z",
  "descripcion_demora": "Retraso por congestión portuaria",
  "tipo_demora": "aduana",
  "costo_asociado": 500.00,
  "moneda": "USD"
}
```

### GET /demoras
Obtiene todas las demoras

### GET /demoras/:id
Obtiene una demora por ID usando `id_demora`

---

## Incidencias

### POST /incidencias
```json
{
  "id_operacion": 1,
  "fecha_hora_incidencia": "2023-11-09T10:00:00.000Z",
  "descripcion_incidencia": "Se detectó daño en embalaje",
  "tipo_incidencia": "daño_mercancia",
  "estatus": "reportada",
  "fecha_resolucion": "2023-11-10T15:30:00.000Z",
  "comentarios_resolucion": "Se realizó reembalaje"
}
```

### GET /incidencias
Obtiene todas las incidencias

### GET /incidencias/:id
Obtiene una incidencia por ID usando `id_incidencia`

---

## Tracking

### POST /tracking
```json
{
  "id_operacion": 1,
  "ubicacion_actual": "Puerto de Shanghai",
  "estatus_seguimiento": "en_transito",
  "referencia_transportista": "MSC-2023-001",
  "nombre_transportista": "MSC",
  "notas_tracking": "Carga embarcada en buque"
}
```

### GET /tracking
Obtiene todos los tracking

### GET /tracking/:id
Obtiene un tracking por ID usando `id_tracking`

### GET /tracking/operacion/:operacion_id
Obtiene tracking por operación

---

## Facturas Cliente

### POST /facturas-cliente
```json
{
  "id_cliente": 1,
  "id_operacion": 1,
  "id_cotizacion": 1,
  "numero_factura": "FAC-2023-001",
  "fecha_vencimiento": "2023-12-09",
  "monto_total": 15000.00,
  "monto_pagado": 0,
  "moneda": "USD",
  "estatus": "pendiente",
  "observaciones": "Factura por servicios logísticos"
}
```

### GET /facturas-cliente
Obtiene todas las facturas

### GET /facturas-cliente/:id
Obtiene una factura por ID usando `id_factura_cliente`

---

## Documentos Relacionados

### POST /documentos-relacionados
```json
{
  "id_cotizacion": 1,
  "id_operacion": 1,
  "nombre_documento": "Bill of Lading",
  "tipo_documento": "BL",
  "url_archivo": "https://storage.example.com/docs/bl-2023-001.pdf",
  "id_usuario_carga": 1
}
```

### GET /documentos-relacionados
Obtiene todos los documentos

### GET /documentos-relacionados/:id
Obtiene un documento por ID usando `id_documento`

---

## Notas de Crédito

### POST /notas-credito
```json
{
  "id_factura_cliente": 1,
  "numero_nota_credito": "NC-2023-001",
  "monto": 500.00,
  "moneda": "USD",
  "motivo": "Ajuste por sobrecargo"
}
```

### GET /notas-credito
Obtiene todas las notas de crédito

### GET /notas-credito/:id
Obtiene una nota de crédito por ID usando `id_nota_credito`

---

## Enum Values

### tipo_demora (Demoras)
- 'climatica'
- 'aduana'
- 'mecanica'
- 'documental'
- 'trafico'
- 'otro'

### tipo_incidencia (Incidencias)
- 'daño_mercancia'
- 'extravio_parcial'
- 'extravio_total'
- 'robo'
- 'error_documentacion'
- 'otro'

### estatus (Incidencias)
- 'reportada'
- 'en_revision'
- 'resuelta'
- 'escalada'

### estatus_seguimiento (Tracking)
- 'en_origen'
- 'en_transito'
- 'en_destino'
- 'entregado'
- 'aduana'

### estatus (Facturas)
- 'pendiente'
- 'pagada'
- 'vencida'
- 'cancelada'

### tipo_documento (Documentos)
- 'BL'
- 'AWB'
- 'carta_porte'
- 'packing_list'
- 'factura_comercial'
- 'certificado_origen'
- 'pedimento'
- 'otro'
