# 🎓 OfiChallenge - Plataforma Educativa Mejorada

## ✨ Cambios Implementados

### 1. **Colores y Diseño Modernos**
- Paleta de colores profesional: Azul primario (#1e40af), Naranja secundario (#f59e0b), Púrpura acentuada (#8b5cf6)
- Gradientes suaves en encabezado, botones y secciones
- Sombras y profundidad en tarjetas
- Interfaz limpia y atractiva

### 2. **Animaciones Mejoradas**
- `slideDown`: Encabezado aparece desde arriba
- `slideUp`: Secciones emergen desde abajo
- `float`: Logo y iconos flotan suavemente
- `fadeInUp/Down`: Contenido aparece con elegancia
- `pageFlip`: Transición suave al cambiar páginas de PDF
- `pulse`: Efecto pulsante en elementos interactivos
- `pageFlip`: Animación de volteo de páginas en flipbook

### 3. **Manuales en Estilo Flipbook**
- **Navegación intuitiva** con botones Anterior/Siguiente
- **Indicador de página** mostrando "Página X de Y"
- **Modal elegante** con fondo oscuro y marco moderno
- **PDF.js integrado** para renderización de documentos
- Soporta los 3 manuales: Word, Excel, PowerPoint
- Control completo: ampliar canvas, navegar libremente

### 4. **Panel de Estudiante Limpio**
- ✅ Eliminadas todas las tareas de ejemplo hardcodeadas
- ✅ Solo muestra materiales creados por profesores
- ✅ Sin formularios de envío (solo lectura)
- ✅ Interfaz enfocada y profesional

### 5. **Personalización de Portada**
- 🖼️ **Carga de imagen de fondo**: Click en botón "Cambiar fondo"
- 🔄 **Limpiar fondo**: Restaura el diseño por defecto
- 💾 **Persistencia**: La imagen se guarda en localStorage del navegador
- ⚡ **Carga automática**: Al recargar, se restaura la imagen personalizada

## 📁 Estructura de Archivos

```
├── index.html              # Portada con personalización de fondo
├── role.html               # Selector de rol (Estudiante/Profesor)
├── student.html            # Panel de estudiante (solo lectura)
├── teacher.html            # Panel de profesor (crear/editar materiales)
├── manuals.html            # Galería de manuales con flipbook
├── task_detail.html        # Vista detallada de un material
├── game.html               # Juego OfiChallenge
├── css/
│   └── styles.css          # Estilos modernos con animaciones
├── js/
│   └── app.js              # Lógica completa de la aplicación
├── escudo.svg              # Logo de la institución
├── manual_word.pdf         # Manual de Word
├── manual_excel.pdf        # Manual de Excel
└── manual_powerpoint.pdf   # Manual de PowerPoint
```

## 🚀 Cómo Usar

### 1. **Portada**
- Haz clic en "Comenzar" para ir a selección de rol
- Personaliza el fondo: clic en "🖼️ Cambiar fondo", selecciona una imagen
- El fondo se guardará automáticamente

### 2. **Como Estudiante**
- Haz clic en "👨‍🎓 Estudiante" en la pantalla de roles
- Verás los materiales publicados por profesores
- Haz clic en cualquier material para ver detalles
- Navega a "Manuales" para consultar los PDF en flipbook
- Juega en "OfiChallenge" para evaluar tus conocimientos

### 3. **Como Profesor**
- Haz clic en "👨‍🏫 Profesor" en la pantalla de roles
- **Login**: email: `disaxther@gmail.com` | contraseña: `12345`
- Crea nuevos materiales:
  - **Tipo "Archivo"**: Proporciona descripción del recurso
  - **Tipo "Evaluación"**: Escribe las preguntas de evaluación
- Establece fecha límite (opcional)
- Los materiales aparecen inmediatamente en el panel de estudiante

### 4. **Manuales (Flipbook)**
- Navega a "Manuales" desde cualquier rol
- Elige: Word, Excel o PowerPoint
- Se abrirá un modal con el PDF:
  - Botones ⬅️ Anterior / Siguiente ➡️
  - Indicador de página actual
  - Haz clic fuera o en ✕ para cerrar

### 5. **Juego OfiChallenge**
- Ingresa tu nombre
- Responde 5 preguntas sobre Ofimática
- Tu puntuación se guarda en el ranking
- Consulta el leaderboard con los mejores jugadores

## 🎨 Características de Diseño

### Colores
- **Azul Primario** (#1e40af): Botones principales, encabezados
- **Naranja Secundario** (#f59e0b): Acentos, hover states
- **Púrpura** (#8b5cf6): Detalles, gradientes
- **Verde Éxito** (#10b981): Validaciones exitosas
- **Rojo Peligro** (#ef4444): Advertencias, eliminar

### Tipografía
- Sistema de fuentes nativo del SO
- Escalas de tamaño: 0.85em - 2.5em
- Pesos: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Espaciado
- Padding: 6px - 60px
- Gaps: 10px - 25px
- Máximo ancho: 1200px
- Responsive: adapta a móviles, tablets, desktop

## 💾 Almacenamiento Local

Todos los datos se guardan en el navegador (localStorage):

```javascript
// Materiales creados por profesores
ue_materials: [{id, title, desc, type, published, deadline, ...}]

// Descargas de estudiantes
ue_downloads: [{material_id, timestamp}]

// Leaderboard del juego
ue_leaderboard: [{name, score, time, date}]

// Sesión del profesor
teacher_token: 'logged_in_TIMESTAMP'

// Imagen de fondo personalizada
hero_bg: 'data:image/...'
```

## 🔧 Funcionalidades Técnicas

### PDF.js Integration
- CDN: v3.11.174
- Renderización de páginas a canvas
- Soporte para navegación de múltiples páginas
- Escalado automático al tamaño del contenedor

### LocalStorage API
- Persistencia de datos sin servidor
- Límite: ~5-10MB por dominio
- Datos persisten entre sesiones

### Responsive Design
- Mobile-first approach
- Breakpoints: 768px, 480px
- Flexbox y Grid para layouts adaptativos
- Touch-friendly buttons

## 📱 Compatibilidad

- ✅ Chrome/Edge (v60+)
- ✅ Firefox (v50+)
- ✅ Safari (v10+)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Próximas Mejoras Posibles

- [ ] Backend con base de datos
- [ ] Autenticación segura
- [ ] Más preguntas en OfiChallenge
- [ ] Exportar/descargar materiales
- [ ] Comentarios y feedback
- [ ] Sistema de calificaciones
- [ ] Más formatos de archivo (video, audio)
- [ ] Modo oscuro

## 📝 Notas de Desarrollo

- **Sin dependencias externas** (excepto PDF.js)
- **CSS Grid + Flexbox** para layouts modernos
- **Vanilla JavaScript** (sin frameworks)
- **Totalmente responsive**
- **Optimizado para performance**

---

**Última actualización:** 2025  
**Institución:** Unidad Educativa Fiscal Dolores Sucre  
**Asignatura:** Ofimática
