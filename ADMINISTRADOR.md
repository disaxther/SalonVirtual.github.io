# 📝 INSTRUCCIONES DE ADMINISTRACIÓN - OfiChallenge

## 🔧 Cambiar Fondo de Portada (Solo Administrador)

### Método:
El fondo de la portada ahora es **administrado solo por el colegio** (no por visitantes).

### Para cambiar el fondo:

1. **Opción 1: Reemplazar archivo de imagen**
   - Descarga una imagen (recomendado: JPG o PNG, 1920x1080px mínimo)
   - Renómbrala como `background.jpg`
   - Reemplaza el archivo anterior en la carpeta principal
   - Recarga la página para ver el cambio

2. **Opción 2: Usar otro nombre de archivo**
   - Si quieres usar otro nombre (ej: `background-new.jpg`):
   - Abre `js/app.js`
   - Busca la línea: `heroBackgroundFile: 'background.jpg'`
   - Cambia `'background.jpg'` por tu nuevo nombre
   - Guarda y recarga la página

### Ejemplo:
```javascript
// ANTES:
heroBackgroundFile: 'background.jpg'

// DESPUÉS (si usas otra imagen):
heroBackgroundFile: 'fondo-colegio.jpg'
```

### Características:
- ✅ El fondo se cachea en localStorage (no se necesita descargar cada vez)
- ✅ Los visitantes NO pueden cambiarlo
- ✅ Es estable: el mismo fondo para todos
- ✅ Se actualiza solo al cambiar el archivo

---

## 📋 Tareas de Estudiante

Las tareas se definieron en `js/app.js` en el array `CONFIG.tasks`. 

### Tareas actuales:
1. **Crear un documento en Word** (Vence: 2025-02-10)
   - Crear documento sobre historia de computadoras
   - Aplicar formato y márgenes

2. **Tabla de datos en Excel** (Vence: 2025-02-12)
   - Crear hoja de cálculos de calificaciones
   - Usar fórmulas para promedio

3. **Presentación en PowerPoint** (Vence: 2025-02-15)
   - Presentación de 5 diapositivas
   - Diseño uniforme

4. **Editar documento en Word** (Vence: 2025-02-08)
   - Corregir errores y aplicar estilos
   - Exportar a PDF

5. **Gráfico de datos en Excel** (Vence: 2025-02-18)
   - Crear gráfico de barras
   - Etiquetado y títulos

### Para AGREGAR una nueva tarea:
Edita `js/app.js` y agrega a `CONFIG.tasks`:

```javascript
{
  id: 6,
  title: 'Tu título aquí',
  description: 'Descripción detallada de la tarea',
  dueDate: '2025-02-20',  // Formato: YYYY-MM-DD
  tips: 'Consulta el Manual [Programa] → Sección específica'
}
```

### Para MODIFICAR una tarea:
Busca el `id` en `CONFIG.tasks` y edita los campos.

---

## 🏫 Información del Colegio

Toda página ahora muestra en la esquina superior derecha:
- **Nombre**: Unidad Educativa Fiscal Dolores Sucre
- **AMIE**: 09H01213

Para cambiar esta información, edita en `app.js`:
```javascript
// Busca en la función initHero():
"Unidad Educativa Fiscal Dolores Sucre"
```

O en cada `index.html`:
```html
<strong>Unidad Educativa Fiscal Dolores Sucre</strong><br>
AMIE: 09H01213 | Ofimática 2025-2026
```

---

## 📚 PDFs de Manuales

Los archivos PDF deben estar en la carpeta principal:
- `manual_word.pdf`
- `manual_excel.pdf`
- `manual_powerpoint.pdf`

Si cambias los nombres, edita en `js/app.js`:
```javascript
pdfs: [
  { name: 'Word', file: 'mi_manual_word.pdf', icon: '📄' },
  // ...
]
```

---

## 🔐 Credenciales de Profesor

- **Email**: disaxther@gmail.com
- **Contraseña**: 12345

Para cambiar, edita en `js/app.js`:
```javascript
const CONFIG = {
  teacherEmail: 'nuevo-email@gmail.com',
  teacherPassword: 'nueva-contraseña',
  // ...
}
```

---

## 📍 Archivos Importantes

- `index.html` - Portada (información de colegio en header)
- `student.html` - Panel de tareas y materiales
- `teacher.html` - Panel de profesor (gestión de materiales)
- `manuals.html` - Visualizador de PDFs estilo revista
- `game.html` - Juego OfiChallenge
- `js/app.js` - Configuración central (EDITAR AQUÍ para cambios)
- `css/styles.css` - Estilos visuales
- `escudo.svg` - Logo de la institución

---

## ✨ Resumen de Cambios

✅ Escudo e información del colegio restaurados en todas las páginas
✅ Fondo solo editable por administrador (no por visitantes)
✅ 5 tareas de ofimática para estudiantes
✅ Tareas incluyen días para entregar y tips de manuales
✅ PDFs funcionan como revista a pantalla completa
✅ Sistema estable y profesional

---

*Documento de administración para Unidad Educativa Fiscal Dolores Sucre*
