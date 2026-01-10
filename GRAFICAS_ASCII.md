# Graficas ASCII - Analisis de Auditoria

## Tokens Utilizados

### Input vs Output Tokens
```
Tokens (miles)
|
200|
180|  [================================================================]  Input: 160K
160|  [================================================================]
140|
120|
100|
 80|
 60|
 40|  [========================]  Output: 35.6K
 20|  [========================]
  0+--------------------------------------------------------------------
     Input Tokens                            Output Tokens
```

**Total: ~195,600 tokens**

---

## Coste Economico (GPT-4)

### Distribucion de Coste
```
Coste (USD)
|
$0.80|
$0.70|
$0.60|
$0.50|
$0.40|  [======================================]  Input: $0.40
$0.30|  [======================================]
$0.20|  [==========================]  Output: $0.36
$0.10|  [==========================]
$0.00+---------------------------------------------
     Input ($0.40)                    Output ($0.36)
```

**Total: ~$0.76 USD**

---

## Tiempo por Fase

### Distribucion de Tiempo
```
Tiempo (minutos)
|
25|
24|
23|
22|
21|  [========================================]  Implementacion: 9-12 min
20|  [========================================]
19|
18|
17|
16|
15|
14|
13|
12|
11|
10|
 9|
 8|
 7|  [==================]  Analisis: 4-6 min
 6|  [==================]
 5|
 4|
 3|  [========]  Refinamiento: 3 min
 2|  [========]
 1|
 0+-------------------------------------------
   Analisis        Implementacion        Refinamiento
```

**Total: 16-21 minutos**

---

## Archivos Procesados

### Archivos por Operacion
```
Cantidad de Archivos
|
120|
100|  [================================================================]  Leidos: ~100
 80|  [================================================================]
 60|  [============================================]  Eliminados: ~60
 40|  [============================================]
 20|  [==========]  Modificados: ~8    [=====]  Creados: ~5
  0+------------------------------------------------------------------------
    Leidos          Eliminados          Modificados        Creados
```

---

## Lineas de Codigo

### Lineas Eliminadas vs Creadas
```
Lineas (miles)
|
 6|
 5|  [================================================================]  Eliminadas: ~5,000
 4|  [================================================================]
 3|  [================================================================]
 2|  [================================================================]
 1|  [========================================]  Creadas: ~1,400
 0|  [========================================]
  +---------------------------------------------------------------
    Eliminadas                      Creadas
```

**Neto: -3,600 lineas** (reduccion significativa)

---

## Documentacion Generada

### Lineas por Documento
```
Lineas
|
300|
280|  [============================================================]  ESTILOS_USADOS.md: 268
260|  [============================================================]
240|
220|
200|  [==================================================]  ESTRUCTURA_COMPONENTES.md: 202
180|  [==================================================]
160|  [============================================]  CRAFT_ASCII.txt: 165
140|  [============================================]
120|
100|
 80|
 60|
 40|  [==================]  AuditShowcase.tsx: ~880 lineas (componente React)
 20|  [==]  CHECKLIST_LIMPIEZA.md: 43
  0+----------------------------------------------------------------------------
    ESTILOS        ESTRUCTURA        CHECKLIST        ASCII Art
```

---

## Ratio de Eficiencia

### Comparacion Tiempo IA vs Manual
```
Tiempo Relativo
|
 6h|
 5h|  [================================================================]  Manual: 4-6h
 4h|  [================================================================]
 3h|
 2h|
 1h|
30m|
20m|  [========]  IA: ~18 min
10m|  [========]
 0m+--------------------------------------------------------------------
    IA (~18 min)                                  Manual (4-6h)
```

**Ratio: ~14-18x mas rapido**

---

## Resumen Visual - Coste vs Valor

### Comparacion Coste vs Valor
```
Valor Entregado                              Coste
------------------------------------------------------------------
[============================]              [==]  Documentacion Completa
[============================]              [==]  Componente Interactivo
[============================]              [==]  ~60 archivos eliminados
[============================]              [==]  5,000+ lineas limpiadas
[============================]              [==]  Auditoria Visual Completa
------------------------------------------------------------------
~$50-100 valor                              ~$0.76 coste
(estimado manual)                           (IA)
```

**ROI: ~65-130x**

---

## Pie Chart - Distribucion de Tokens

### Tokens Utilizados (195.6K total)
```
        Tokens Total
          195.6K
             |
       +-----+-----+
       |           |
    [======]   [==]
    160K       35.6K
   Input      Output
   
  82%          18%
```

---

## Pie Chart - Distribucion de Tiempo

### Tiempo Total (~18 min)
```
       Tiempo Total
         ~18 min
            |
      +-----+-----+
      |      |    |
    [==]  [====] [=]
    4-6    9-12   3
   Anal.  Impl.  Ref.
   28%     50%   22%
```

---

## Bar Chart Horizontal - Archivos

### Archivos Procesados por Tipo
```
Leidos:        [====================================================] 100
Eliminados:    [========================================] 60
Modificados:   [========] 8
Creados:       [=====] 5
```

---

## Stacked Bar - Trabajo Realizado

### Distribucion del Trabajo
```
Total Trabajo (100%)
[========================================================] 100%
[=========================] Limpieza: 60% (~60 archivos)
[=================] Documentacion: 25% (~1,400 lineas)
[=========] Auditoria Visual: 15% (~880 lineas)
```

---

## Comparacion Visual - Tokens Input/Output

```
Input Tokens (160K)  |################################################| 82%
Output Tokens (35.6K)|#########| 18%
                     |         |
                     0         50         100         150         200K
```

---

## Comparacion Visual - Coste

```
Input Cost ($0.40)   |################################################| $0.40
Output Cost ($0.36)  |##########################################| $0.36
                     |         |
                     0       $0.20       $0.40       $0.60       $0.80
```

**Total: $0.76 USD**

---

*Graficas generadas para visualizacion rapida de metricas clave*
