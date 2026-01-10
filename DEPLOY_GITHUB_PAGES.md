# Instrucciones de Despliegue en GitHub Pages

## Configuracion Completada

Se ha configurado el proyecto para desplegar automaticamente en GitHub Pages mediante GitHub Actions.

### Archivos Configurados

1. **vite.config.ts** - Configurado con base path para GitHub Pages
2. **.github/workflows/deploy.yml** - Workflow de GitHub Actions para build y deploy
3. **.gitignore** - Actualizado para excluir archivos innecesarios

---

## Pasos para Activar GitHub Pages

### 1. Hacer Commit y Push de los Cambios

```bash
# Añadir todos los cambios
git add .

# Hacer commit
git commit -m "Configurar GitHub Pages deployment"

# Push al repositorio
git push origin main
```

### 2. Activar GitHub Pages en el Repositorio

1. Ve a tu repositorio en GitHub: `https://github.com/Raul-Marin/Resource-Repository-for-Design-Systems`
2. Ve a **Settings** (Configuracion)
3. En el menu lateral, busca **Pages**
4. En **Source**, selecciona **GitHub Actions**
5. Guarda los cambios

### 3. Verificar el Despliegue

1. Ve a la pestaña **Actions** en tu repositorio
2. Veras el workflow "Deploy to GitHub Pages" ejecutandose
3. Una vez completado, tu sitio estara disponible en:
   ```
   https://raul-marin.github.io/Resource-Repository-for-Design-Systems/
   ```

---

## Como Funciona

### Workflow de GitHub Actions

El workflow se ejecuta automaticamente cuando:
- Se hace push a la rama `main`
- Se ejecuta manualmente desde la pestaña Actions

### Proceso de Despliegue

1. **Checkout** - Obtiene el codigo del repositorio
2. **Setup Node.js** - Configura Node.js 18 con cache de npm
3. **Install dependencies** - Instala dependencias con `npm ci`
4. **Build** - Construye el proyecto con `npm run build`
5. **Deploy** - Despliega en GitHub Pages

---

## Build Local (Para Probar)

Si quieres probar el build localmente antes de hacer push:

```bash
# Instalar dependencias (si no lo has hecho)
npm install

# Build para produccion
npm run build

# Ver el build localmente (opcional)
npx serve dist
```

---

## Base Path

El proyecto esta configurado con el base path:
```
/Resource-Repository-for-Design-Systems/
```

Esto significa que todas las rutas se generan con este prefijo. Si cambias el nombre del repositorio, deberas actualizar:

1. **vite.config.ts** - Cambiar el valor de `base`
2. El workflow de GitHub Actions no necesita cambios

---

## Troubleshooting

### El sitio no se despliega

1. Verifica que GitHub Pages este activado en Settings > Pages
2. Verifica que el source este en "GitHub Actions"
3. Revisa los logs en la pestaña Actions para ver errores

### Las rutas no funcionan

1. Verifica que el base path en `vite.config.ts` coincida con el nombre del repositorio
2. Asegurate de que las rutas en tu aplicacion usen rutas relativas

### El build falla

1. Verifica que todas las dependencias esten en `package.json`
2. Revisa los logs de GitHub Actions para ver el error especifico
3. Prueba el build localmente primero

---

## URL del Sitio

Una vez desplegado, tu sitio estara disponible en:

**Produccion:**
```
https://raul-marin.github.io/Resource-Repository-for-Design-Systems/
```

**Rutas importantes:**
- Pagina principal: `https://raul-marin.github.io/Resource-Repository-for-Design-Systems/`
- Auditoria visual: `https://raul-marin.github.io/Resource-Repository-for-Design-Systems/#audit`

---

## Actualizaciones Futuras

Cada vez que hagas push a `main`, el sitio se actualizara automaticamente. No necesitas hacer nada mas.

Para actualizar manualmente:
1. Ve a Actions
2. Selecciona "Deploy to GitHub Pages"
3. Click en "Run workflow"

---

*Configuracion completada y lista para desplegar*
