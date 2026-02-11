const CONFIG = {
  teacherEmail: 'disaxther@gmail.com',
  teacherPassword: '1234',
  heroBackgroundFile: 'background.jpg', 
  pdfs: [
    { name: 'Word', file: 'manual_word.pdf', icon: '📄' },
    { name: 'Excel', file: 'manual_excel.pdf', icon: '📊' },
    { name: 'PowerPoint', file: 'manual_powerpoint.pdf', icon: '🎨' }
  ],
  tasks: [
    {
      id: 1,
      title: 'Trabajo: Documento final (Word)',
      description: 'Sube el documento final en Word que preparaste sobre la historia de la computadora. Solo se acepta un archivo por alumno.',
      type: 'material',
      dueDate: '2025-09-15',
      tips: 'Sube el archivo en formato .docx o .pdf. Usa el nombre: Nombre_Apellido_Documento.docx'
    },
    {
      id: 2,
      title: 'Trabajo: Hoja de cálculo - Promedios',
      description: 'Sube la hoja de cálculo de ejemplo que realizaste en clase con las fórmulas de promedio aplicadas.',
      type: 'material',
      dueDate: '2025-10-15',
      tips: 'Sube en .xlsx o .ods y nombra el archivo: Nombre_Apellido_Excel.xlsx'
    },
    {
      id: 3,
      title: 'Guía: Presentación en PowerPoint',
      description: 'Elabora una presentación de 5 diapositivas sobre "Uso de Redes Sociales en Estudiantes". Incluye: portada, índice, 2 contenidos y conclusión. Usa diseño uniforme.',
      type: 'material',
      dueDate: '2025-11-15',
      tips: 'Revisa el Manual PowerPoint → Sección de Diseño y Temas'
    },
    {
      id: 4,
      title: 'Trabajo: Revisión y exportación (Word)',
      description: 'Sube tu documento corregido y exportado a PDF realizado en la clase de revisión.',
      type: 'material',
      dueDate: '2025-12-15',
      tips: 'Adjunta el PDF final y nómbralo: Nombre_Apellido_Revision.pdf'
    },
    {
      id: 5,
      title: 'Guía: Gráfico de datos',
      description: 'En Excel, crea un gráfico de barras que muestre la venta de 4 productos en 3 meses diferentes. Coloca títulos y etiquetas.',
      type: 'material',
      dueDate: '2025-09-30',
      tips: 'Manual Excel → Gráficos y Visualización de Datos'
    }
  ]
};

// Estado del flipbook
let pdfDoc = null;
let currentPage = 1;

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
  seedDefaultMaterials();
  initHero();
  initPageLogic();
});

// Si no hay materiales en localStorage, insertar ejemplos de materiales y tareas
function seedDefaultMaterials() {
  try {
    // Inicializar materiales
    let materials = JSON.parse(localStorage.getItem('ue_materials') || '[]');
    if (!materials || materials.length === 0) {
      materials = [
        {
          id: Date.now(),
          title: 'Video: Curso Word 365 - Proteger documento',
          desc: 'Video guía (embed) sobre proteger, cifrar y restringir edición en Word 365.',
          type: 'material',
          published: new Date().toLocaleDateString('es-ES'),
          deadline: null,
          fileData: `<iframe width="782" height="334" src="https://www.youtube.com/embed/v2CTungRPVE" title="Curso de Word 365 desde Cero: Proteger un documento, Cifrar con contrasena y restringir edición." frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
          author: 'Prof. Disaxther'
        },
        {
          id: Date.now()+1,
          title: 'Video: Cifrado de documentos con contraseña en Word',
          desc: 'Video tutorial sobre cifrado de documentos con contraseña en Microsoft Word 2019.',
          type: 'material',
          published: new Date().toLocaleDateString('es-ES'),
          deadline: null,
          fileData: `<iframe width="1014" height="334" src="https://www.youtube.com/embed/74BflcjUYe0" title="Cifrado de documentos con contraseña en Word | Microsoft Word 2019" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
          author: 'Prof. Disaxther'
        }
      ];
      localStorage.setItem('ue_materials', JSON.stringify(materials));
    }
    
    // Inicializar tareas predefinidas
    let tasks = JSON.parse(localStorage.getItem('ue_tasks') || '[]');
    if (!tasks || tasks.length === 0) {
      tasks = CONFIG.tasks.map((t, idx) => ({
        ...t,
        id: Date.now() + idx,
        published: new Date().toLocaleDateString('es-ES'),
        author: 'Prof. Disaxther'
      }));
      localStorage.setItem('ue_tasks', JSON.stringify(tasks));
    }
  } catch (err) {
    console.error('Error al inicializar materiales:', err);
  }
}

// ===== HERO - FONDO ADMINISTRADO POR COLEGIO =====
function initHero() {
  const page = document.body.className;
  
  if (page.includes('portada') || page === '') {
    const hero = document.getElementById('hero');
    
    // Intentar cargar fondo desde archivo (SOLO ADMIN PUEDE CAMBIAR)
    // Para cambiar el fondo, editar CONFIG.heroBackgroundFile en app.js
    const backgroundFile = CONFIG.heroBackgroundFile;
    
    // Verificar si el fondo guardado existe en localStorage (cache)
    const cachedBg = localStorage.getItem('hero_bg_cached');
    if (cachedBg && hero) {
      hero.style.backgroundImage = `url('${cachedBg}')`;
      hero.style.backgroundSize = 'cover';
      hero.style.backgroundPosition = 'center';
    } else if (backgroundFile && hero) {
      // Intentar cargar el archivo configurado
      hero.style.backgroundImage = `url('${backgroundFile}')`;
      hero.style.backgroundSize = 'cover';
      hero.style.backgroundPosition = 'center';
      
      // Guardar en cache para cargas futuras
      localStorage.setItem('hero_bg_cached', backgroundFile);
    }
  }
}

// ===== LÓGICA POR PÁGINA =====
function initPageLogic() {
  const url = window.location.pathname;
  
  if (url.includes('index.html') || url.endsWith('/')) {
    // Portada - nada especial
  } else if (url.includes('role.html')) {
    // Selección de rol - nada especial
  } else if (url.includes('student.html')) {
    renderStudentMaterials();
  } else if (url.includes('teacher.html')) {
    initTeacherPanel();
  } else if (url.includes('manuals.html')) {
    renderManualsGallery();
  } else if (url.includes('task_detail.html')) {
    renderTaskDetail();
  } else if (url.includes('game.html')) {
    initGame();
  }
}

// ===== ESTUDIANTE - PANEL DE TAREAS Y MATERIALES =====
function renderStudentMaterials() {
  renderStudentTasks();
  renderStudentMaterialsList();
}

function renderStudentTasks() {
  const container = document.getElementById('student-tasks');
  if (!container) return;
  
  // Solo tareas de localStorage
  const allTasks = JSON.parse(localStorage.getItem('ue_tasks') || '[]');
  
  if (allTasks.length === 0) {
    container.innerHTML = '<div class="empty">📭 No hay tareas disponibles.</div>';
    return;
  }
  
  container.innerHTML = allTasks.map(task => {
    const today = new Date();
    const dueDate = task.dueDate ? new Date(task.dueDate) : null;
    const isOverdue = dueDate && dueDate < today;
    const isEvaluation = task.type === 'evaluacion';
    
    return `
      <div class="card material-card" style="border-left-color:${isEvaluation ? '#8b5cf6' : '#f59e0b'};position:relative">
        <div class="card-header">
          <h4>${task.title}</h4>
          <span class="type-badge ${isEvaluation ? 'evaluacion' : 'archivo'}">${isEvaluation ? '⭐ Evaluación' : '📝 Tarea'}</span>
        </div>
        <p>${task.description || task.desc}</p>
        ${task.tips ? `<div style="background:#f0f9ff;padding:12px;border-radius:6px;margin:12px 0;border-left:3px solid #8b5cf6">
          <strong>💡 Tip:</strong> ${task.tips}
        </div>` : ''}
        <div class="card-footer">
          <span class="small">📅 ${task.dueDate ? 'Vence: ' + new Date(task.dueDate).toLocaleDateString('es-ES') : 'Sin fecha'}${task.author ? ' • ' + task.author : ''}</span>
          ${task.type === 'material' ? `<button class="btn small primary" onclick="openMaterialUpload(${task.id})">📤 Subir archivo</button>` : `<a href="manuals.html" class="btn small primary">📖 Ver Manuales</a>`}
        </div>
      </div>
    `;
  }).join('');
}

function renderStudentMaterialsList() {
  const container = document.getElementById('student-materials');
  if (!container) return;
  
  const materials = JSON.parse(localStorage.getItem('ue_materials') || '[]');
  
  if (materials.length === 0) {
    container.innerHTML = '<div class="empty">📭 No hay materiales disponibles aún.</div>';
    return;
  }
  
  container.innerHTML = materials.map(m => `
    <div class="card material-card" onclick="viewMaterial(${m.id})">
      <div class="card-header">
        <h4>${m.title}</h4>
        <span class="type-badge">📚 Material</span>
      </div>
      <p>${m.desc}</p>
      <div class="card-footer">
        <span class="small">📌 ${m.published}${m.author ? ' • ' + m.author : ''}</span>
        ${m.deadline ? `<span class="small deadline">⏰ ${m.deadline}</span>` : ''}
      </div>
    </div>
  `).join('');
}

function viewMaterial(id) {
  const materials = JSON.parse(localStorage.getItem('ue_materials') || '[]');
  const material = materials.find(m => m.id == id); // Usar == para comparación flexible
  if (material) {
    console.log('Material encontrado:', material);
    sessionStorage.setItem('selected_material', JSON.stringify(material));
    window.location.href = 'task_detail.html?id=' + id;
  } else {
    console.error('Material no encontrado con id:', id);
    alert('No se encontró el material.');
  }
}

// ===== TAREA - VISTA DETALLADA =====
function renderTaskDetail() {
  const container = document.getElementById('material-detail');
  if (!container) return;
  
  const material = JSON.parse(sessionStorage.getItem('selected_material') || '{}');
  
  console.log('Material cargado en task_detail:', material);
  
  if (!material.id) {
    container.innerHTML = '<div class="empty">No se encontró el material.</div>';
    return;
  }
  
  let content = `
    <div class="card">
      <h2>${material.title}</h2>
      <p class="text-muted">Publicado: ${material.published}${material.author ? ' • ' + material.author : ''}</p>
      <p>${material.desc}</p>
  `;
  
  // Mostrar el contenido del material
  if (material.fileData) {
    if (material.fileData.includes('<iframe')) {
      // Es un iframe embebido
      content += `
        <div style="margin:20px 0;padding:15px;background:#f0f9ff;border-radius:4px">
          <strong>📹 Video</strong>
          <div style="margin-top:15px">
            ${material.fileData}
          </div>
        </div>
      `;
    } else {
      // Es un archivo o texto
      content += `
        <div style="margin:20px 0;padding:15px;background:#f0f9ff;border-left:4px solid var(--primary);border-radius:4px">
          <strong>📄 Recurso</strong>
          <p>${material.fileData}</p>
        </div>
      `;
    }
  }
  
  if (material.resource) {
    content += `
      <div style="margin:20px 0;padding:15px;background:#f0f9ff;border-left:4px solid var(--primary);border-radius:4px">
        <strong>🔗 Recurso</strong>
        <p>${material.resource}</p>
      </div>
    `;
  }
  
  if (material.instructions) {
    content += `
      <div style="margin:20px 0">
        <strong>📝 Instrucciones:</strong>
        <p>${material.instructions}</p>
      </div>
    `;
  }
  
  content += `
    <div class="actions" style="margin-top:20px">
      <button class="btn" onclick="history.back()">← Volver</button>
    </div>
  `;
  
  container.innerHTML = content;
}

// ===== MANUALES - GALERÍA Y FLIPBOOK =====
function renderManualsGallery() {
  // La galería de tarjetas ya no se necesita, los botones están en HTML
}

async function openFlipbookDirect(filename, title) {
  const container = document.getElementById('flipbook-fullpage');
  if (!container) return;
  
  try {
    // Construir la ruta correcta del PDF (desde la raíz)
    const pdfPath = filename.startsWith('/') ? filename : '/' + filename;
    
    // Cargar PDF con PDF.js
    const pdf = await pdfjsLib.getDocument(pdfPath).promise;
    pdfDoc = pdf;
    currentPage = 1;
    
    // Actualizar título
    document.getElementById('flipbook-title').textContent = `📖 Manual: ${title}`;
    document.getElementById('total-pages-full').textContent = pdf.numPages;
    
    // Renderizar primera página
    await renderPDFFull(1);
    
    // Mostrar container
    container.style.display = 'block';
  } catch (error) {
    console.error('Error al cargar PDF:', error);
    alert('No se pudo cargar el manual. Verifica que el archivo exista.');
  }
}

async function renderPDFFull(pageNum) {
  if (!pdfDoc) return;
  
  const canvas = document.getElementById('pdf-canvas-fullpage');
  const ctx = canvas.getContext('2d');
  
  try {
    const page = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.5 });
    
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    
    await page.render({
      canvasContext: ctx,
      viewport: viewport
    }).promise;
    
    currentPage = pageNum;
    document.getElementById('current-page-full').textContent = pageNum;
    
    // Controlar botones
    document.getElementById('prev-btn-full').disabled = pageNum === 1;
    document.getElementById('next-btn-full').disabled = pageNum === pdfDoc.numPages;
  } catch (error) {
    console.error('Error al renderizar página:', error);
  }
}

function prevPageFull() {
  if (currentPage > 1) renderPDFFull(currentPage - 1);
}

function nextPageFull() {
  if (pdfDoc && currentPage < pdfDoc.numPages) renderPDFFull(currentPage + 1);
}

function closeFlipbookFull() {
  const container = document.getElementById('flipbook-fullpage');
  if (container) {
    container.style.display = 'none';
    pdfDoc = null;
  }
}

// ===== PROFESOR - PANEL DE CONTROL =====
function initTeacherPanel() {
  const loginForm = document.getElementById('teacher-login');
  if (loginForm) {
    loginForm.addEventListener('submit', handleTeacherLogin);
  }
  
  // Verificar si ya está logueado
  const token = localStorage.getItem('teacher_token');
  if (token) {
    showManagePanel();
  }
  
  // Formulario para crear tarea/material
  const createForm = document.getElementById('create-material-form');
  if (createForm) {
    const contentTypeEl = document.getElementById('mat-content-type');
    if (contentTypeEl) {
      contentTypeEl.addEventListener('change', updateMatExtra);
      updateMatExtra(); // Inicializar
    }
    createForm.addEventListener('submit', handleCreateMaterial);
  }
  
  renderTeacherTasks();
  renderTeacherMaterials();
  renderTeacherSubmissions();
}

function handleTeacherLogin(e) {
  e.preventDefault();
  const email = document.getElementById('teacher-email').value.trim();
  const pass = document.getElementById('teacher-password').value.trim();
  
  console.log('Email ingresado:', email);
  console.log('Contraseña ingresada:', pass);
  console.log('Email esperado:', CONFIG.teacherEmail);
  console.log('Contraseña esperada:', CONFIG.teacherPassword);
  
  if (email === CONFIG.teacherEmail && pass === CONFIG.teacherPassword) {
    localStorage.setItem('teacher_token', 'logged_in_' + Date.now());
    showManagePanel();
  } else {
    alert('❌ Credenciales incorrectas. Email: ' + email + ' | Pass: ' + pass);
  }
}

function showManagePanel() {
  document.getElementById('teacher-login').style.display = 'none';
  document.getElementById('manage-panel').classList.remove('hidden');
  renderTeacherTasks();
  renderTeacherMaterials();
  renderTeacherSubmissions();
}

function logoutTeacher() {
  localStorage.removeItem('teacher_token');
  document.getElementById('manage-panel').classList.add('hidden');
  document.getElementById('teacher-login').style.display = 'block';
  document.getElementById('teacher-login').reset();
}

function updateMatExtra() {
  const contentTypeEl = document.getElementById('mat-content-type');
  const extraEl = document.getElementById('mat-extra');
  
  if (!contentTypeEl || !extraEl) return;
  
  const contentType = contentTypeEl.value;
  
  if (contentType === 'tarea') {
    extraEl.innerHTML = '<label>Indicaciones: <textarea id="mat-instructions" placeholder="Descripción de qué deben hacer" rows="3"></textarea></label>';
  } else {
    extraEl.innerHTML = '<label>Recurso: <textarea id="mat-resource" placeholder="Enlace, descripción o código del recurso" rows="3"></textarea></label>';
  }
}

function handleCreateMaterial(e) {
  e.preventDefault();
  
  const token = localStorage.getItem('teacher_token');
  if (!token) {
    alert('Debes estar logueado');
    return;
  }
  
  const title = document.getElementById('mat-title').value;
  const desc = document.getElementById('mat-desc').value;
  const contentType = document.getElementById('mat-content-type').value;
  const deadline = document.getElementById('mat-deadline').value || null;
  
  let item = {
    id: Date.now(),
    title,
    desc,
    published: new Date().toLocaleDateString('es-ES'),
    deadline: deadline,
    author: 'Prof. Disaxther'
  };
  
  if (contentType === 'tarea') {
    item.instructions = document.getElementById('mat-instructions').value;
    const tasks = JSON.parse(localStorage.getItem('ue_tasks') || '[]');
    tasks.push(item);
    localStorage.setItem('ue_tasks', JSON.stringify(tasks));
    renderTeacherTasks();
  } else {
    item.resource = document.getElementById('mat-resource').value;
    const materials = JSON.parse(localStorage.getItem('ue_materials') || '[]');
    materials.push(item);
    localStorage.setItem('ue_materials', JSON.stringify(materials));
    renderTeacherMaterials();
  }
  
  alert('✅ ' + (contentType === 'tarea' ? 'Tarea' : 'Material') + ' creado exitosamente');
  document.getElementById('create-material-form').reset();
  updateMatExtra();
}

function renderTeacherTasks() {
  const container = document.getElementById('teacher-tasks');
  if (!container) return;
  
  const tasks = JSON.parse(localStorage.getItem('ue_tasks') || '[]');
  
  if (tasks.length === 0) {
    container.innerHTML = '<div class="empty">Aún no has creado tareas.</div>';
    return;
  }
  
  container.innerHTML = tasks.map(t => `
    <div class="card material-card">
      <div class="card-header">
        <h4>${t.title}</h4>
        <span class="type-badge">📋</span>
      </div>
      <p>${t.desc || t.description}</p>
      <div class="card-footer">
        <span class="small">📌 ${t.published}${t.author ? ' • ' + t.author : ''}${t.dueDate ? ' • ⏰ ' + t.dueDate : ''}</span>
        <button class="btn small" onclick="deleteTask(${t.id})">🗑️ Eliminar</button>
      </div>
    </div>
  `).join('');
}

function deleteTask(id) {
  if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
    let tasks = JSON.parse(localStorage.getItem('ue_tasks') || '[]');
    tasks = tasks.filter(t => t.id !== id);
    localStorage.setItem('ue_tasks', JSON.stringify(tasks));
    renderTeacherTasks();
  }
}

function renderTeacherMaterials() {
  const container = document.getElementById('teacher-materials');
  if (!container) return;
  
  const materials = JSON.parse(localStorage.getItem('ue_materials') || '[]');
  
  if (materials.length === 0) {
    container.innerHTML = '<div class="empty">Aún no has creado materiales.</div>';
    return;
  }
  
  container.innerHTML = materials.map(m => `
    <div class="card material-card">
      <div class="card-header">
        <h4>${m.title}</h4>
        <span class="type-badge">📚</span>
      </div>
      <p>${m.desc}</p>
      <div class="card-footer">
        <span class="small">📌 ${m.published}${m.author ? ' • ' + m.author : ''}${m.deadline ? ' • ⏰ ' + m.deadline : ''}</span>
        <button class="btn small" onclick="deleteMaterial(${m.id})">🗑️ Eliminar</button>
      </div>
    </div>
  `).join('');
}

function deleteMaterial(id) {
  if (confirm('¿Estás seguro de que deseas eliminar este material?')) {
    let materials = JSON.parse(localStorage.getItem('ue_materials') || '[]');
    materials = materials.filter(m => m.id !== id);
    localStorage.setItem('ue_materials', JSON.stringify(materials));
    renderTeacherMaterials();
  }
}

// ===== JUEGO - OfiChallenge =====
const gameQuestions = [
  {
    type: 'word',
    question: '¿Cuál es el atajo para guardar un documento en Word?',
    options: ['Ctrl+S', 'Ctrl+G', 'Ctrl+D', 'F5'],
    correct: 0
  },
  {
    type: 'excel',
    question: '¿Qué función calcula el promedio en Excel?',
    options: ['SUM', 'AVERAGE', 'COUNT', 'MAX'],
    correct: 1
  },
  {
    type: 'powerpoint',
    question: '¿Cómo agregar una nueva diapositiva en PowerPoint?',
    options: ['Ctrl+N', 'Ctrl+M', 'Ctrl+A', 'F2'],
    correct: 1
  },
  {
    type: 'word',
    question: '¿En qué pestaña se encuentra la opción de insertar tabla?',
    options: ['Inicio', 'Insertar', 'Diseño', 'Referencias'],
    correct: 1
  },
  {
    type: 'excel',
    question: '¿Qué rango de celdas es válido?',
    options: ['A1-A10', 'A1:A10', 'A1;A10', 'A1 A10'],
    correct: 1
  }
];

let gameState = {
  playing: false,
  round: 0,
  score: 0,
  time: 0,
  timer: null,
  currentQuestion: null,
  gameMode: null
};

// Juegos disponibles
const GAMES = {
  QUIZ: 'quiz',
  MEMORY: 'memory',
  TYPER: 'typer'
};

function selectGameMode() {
  const area = document.getElementById('game-area');
  area.innerHTML = `
    <div class="card" style="text-align:center;padding:30px">
      <h3>🎮 Elige tu Juego</h3>
      <p style="margin-bottom:30px">Selecciona el modo que prefieres:</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px">
        <button class="btn primary large" onclick="startGameMode('${GAMES.QUIZ}')" style="padding:20px;height:auto">
          <div style="font-size:2em">❓</div>
          <strong>Quiz</strong>
          <div style="font-size:0.85em;margin-top:10px">Responde preguntas sobre Office</div>
        </button>
        <button class="btn primary large" onclick="startGameMode('${GAMES.MEMORY}')" style="padding:20px;height:auto">
          <div style="font-size:2em">🧠</div>
          <strong>Memoria</strong>
          <div style="font-size:0.85em;margin-top:10px">Encuentra pares de atributos</div>
        </button>
        <button class="btn primary large" onclick="startGameMode('${GAMES.TYPER}')" style="padding:20px;height:auto">
          <div style="font-size:2em">⌨️</div>
          <strong>Escritor Rápido</strong>
          <div style="font-size:0.85em;margin-top:10px">Escribe frases sin errores</div>
        </button>
      </div>
    </div>
  `;
  // Limpiar el contador de estadísticas
  document.getElementById('game-round').textContent = '?';
  document.getElementById('game-timer').textContent = '0';
  document.getElementById('game-score').textContent = '0';
}

function startGameMode(mode) {
  gameState.gameMode = mode;
  if (mode === GAMES.QUIZ) {
    nextQuestion();
  } else if (mode === GAMES.MEMORY) {
    startMemoryGame();
  } else if (mode === GAMES.TYPER) {
    startTyperGame();
  }
}

function initGame() {
  document.getElementById('start-game').addEventListener('click', startGame);
  document.getElementById('end-game').addEventListener('click', endGame);
  updateLeaderboard();
}

function startGame() {
  const name = document.getElementById('player-name').value.trim();
  if (!name) {
    alert('Ingresa tu nombre para jugar');
    return;
  }
  
  gameState.playing = true;
  gameState.round = 0;
  gameState.score = 0;
  gameState.time = 0;
  
  document.getElementById('start-game').disabled = true;
  document.getElementById('player-name').disabled = true;
  document.getElementById('end-game').disabled = false;
  
  gameState.timer = setInterval(() => {
    gameState.time++;
    document.getElementById('game-timer').textContent = gameState.time;
  }, 1000);
  
  selectGameMode();
}

function nextQuestion() {
  if (!gameState.playing) return;
  
  gameState.round++;
  const q = gameQuestions[gameState.round - 1] || gameQuestions[Math.floor(Math.random() * gameQuestions.length)];
  gameState.currentQuestion = q;
  
  const area = document.getElementById('game-area');
  area.innerHTML = `
    <div class="card">
      <h4>${q.question}</h4>
      <div class="options" style="margin-top:15px">
        ${q.options.map((opt, idx) => `
          <button class="btn option" onclick="answerQuestion(${idx})" style="width:100%;margin:8px 0;text-align:left">
            ${String.fromCharCode(65 + idx)}) ${opt}
          </button>
        `).join('')}
      </div>
    </div>
  `;
  
  document.getElementById('game-round').textContent = gameState.round;
}

function answerQuestion(selected) {
  if (!gameState.playing || !gameState.currentQuestion) return;

  // Evitar que el usuario vuelva a seleccionar opciones
  const optionButtons = Array.from(document.querySelectorAll('.btn.option'));
  optionButtons.forEach(b => b.disabled = true);

  // Feedback inline (no alert)
  const area = document.getElementById('game-area');
  const feedbackId = 'game-feedback';
  // Remover feedback previo si existe
  const prev = document.getElementById(feedbackId);
  if (prev) prev.remove();

  const correctIndex = gameState.currentQuestion.correct;
  const correctText = gameState.currentQuestion.options[correctIndex];

  let feedbackHTML = '';
  if (selected === correctIndex) {
    gameState.score += 10;
    document.getElementById('game-score').textContent = gameState.score;
    feedbackHTML = `<div id="${feedbackId}" style="margin-top:14px;padding:10px;border-radius:8px;background:#ecfdf5;color:#065f46;font-weight:600">✅ ¡Correcto!</div>`;
  } else {
    feedbackHTML = `<div id="${feedbackId}" style="margin-top:14px;padding:10px;border-radius:8px;background:#fff1f2;color:#7f1d1d;font-weight:600">❌ Incorrecto. Respuesta correcta: <strong>${correctText}</strong></div>`;
  }

  area.insertAdjacentHTML('beforeend', feedbackHTML);

  // Avanzar inmediatamente pero dar un pequeño retardo para que el estudiante vea el feedback
  const advance = () => {
    if (gameState.round < 5) {
      nextQuestion();
    } else {
      endGame();
    }
  };

  setTimeout(advance, 900);
}

function endGame() {
  gameState.playing = false;
  clearInterval(gameState.timer);
  
  const name = document.getElementById('player-name').value;
  if (name && gameState.score > 0) {
    // Guardar en leaderboard específico del juego
    const leaderboardKey = `ue_leaderboard_${gameState.gameMode}`;
    let leaderboard = JSON.parse(localStorage.getItem(leaderboardKey) || '[]');
    leaderboard.push({
      name,
      score: gameState.score,
      time: gameState.time,
      date: new Date().toLocaleDateString('es-ES')
    });
    leaderboard.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return (a.time || 0) - (b.time || 0);
    });
    localStorage.setItem(leaderboardKey, JSON.stringify(leaderboard.slice(0, 10)));
  }
  
  const finalScore = gameState.score;
  const finalTime = gameState.time;
  
  document.getElementById('start-game').disabled = false;
  document.getElementById('player-name').disabled = false;
  document.getElementById('end-game').disabled = true;
  document.getElementById('game-area').innerHTML = `
    <div class="card" style="text-align:center;padding:30px">
      <h2 style="color:#8b5cf6;font-size:2em;margin-bottom:20px">🎉 ¡Juego Finalizado!</h2>
      <div style="background:linear-gradient(135deg, #8b5cf6, #6366f1);color:#fff;padding:30px;border-radius:12px;margin:20px 0">
        <p style="font-size:1.2em;margin:10px 0">Tu Puntuación</p>
        <h1 style="font-size:3em;margin:10px 0">${finalScore} pts</h1>
        <p style="font-size:1em;margin:10px 0">⏱ Tiempo: ${finalTime}s</p>
      </div>
      <p class="small">Tu puntuación ha sido guardada en el leaderboard</p>
      <button class="btn primary large" onclick="location.reload()" style="margin-top:20px;width:100%">🔄 Jugar de Nuevo</button>
    </div>
  `;
  document.getElementById('game-round').textContent = '0';
  document.getElementById('game-timer').textContent = '0';
  document.getElementById('game-score').textContent = '0';
  gameState.round = 0;
  gameState.score = 0;
  gameState.time = 0;
  
  updateLeaderboard();
}

// ===== JUEGO DE MEMORIA =====
const memoryCards = [
  { term: 'Ctrl+S', definition: 'Guardar', id: 1 },
  { term: 'Ctrl+B', definition: 'Negrita', id: 2 },
  { term: 'SUMA()', definition: 'Sumar celdas', id: 3 },
  { term: 'PROMEDIO()', definition: 'Calcular promedio', id: 4 },
  { term: 'F5', definition: 'Presentación', id: 5 },
  { term: 'Animación', definition: 'Efecto en slides', id: 6 }
];

let memoryState = {
  cards: [],
  flipped: [],
  matched: [],
  moves: 0
};

function startMemoryGame() {
  // Crear pares: término + definición
  memoryState.cards = [];
  memoryCards.forEach(card => {
    memoryState.cards.push({ 
      pairId: card.id,
      type: 'term',
      text: card.term
    });
    memoryState.cards.push({ 
      pairId: card.id,
      type: 'definition',
      text: card.definition
    });
  });
  
  // Mezclar
  memoryState.cards.sort(() => Math.random() - 0.5);
  memoryState.flipped = [];
  memoryState.matched = [];
  memoryState.moves = 0;
  gameState.round = 0;
  
  renderMemoryGame();
}

function renderMemoryGame() {
  const area = document.getElementById('game-area');
  area.innerHTML = `
    <div style="text-align:center;margin-bottom:20px">
      <p style="font-size:1.1em;margin:0"><strong>Intentos: ${memoryState.moves}</strong> | Encontrados: ${memoryState.matched.length}/${memoryCards.length}</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:12px;max-width:500px;margin:0 auto">
      ${memoryState.cards.map((card, idx) => {
        const isFlipped = memoryState.flipped.includes(idx) || memoryState.matched.includes(idx);
        const display = isFlipped ? card.text : '❓';
        const bgColor = memoryState.matched.includes(idx) ? '#10b981' : (isFlipped ? '#f59e0b' : '#8b5cf6');
        return `
          <button class="btn" onclick="flipMemoryCard(${idx})" style="padding:30px;font-size:0.95em;min-height:80px;background:${bgColor};color:#fff;border:none;cursor:pointer;border-radius:8px;transition:0.3s;font-weight:bold;word-wrap:break-word" ${memoryState.matched.includes(idx) ? 'disabled' : ''}>
            ${display}
          </button>
        `;
      }).join('')}
    </div>
  `;
}

function flipMemoryCard(idx) {
  if (memoryState.flipped.length === 2 || memoryState.flipped.includes(idx) || memoryState.matched.includes(idx)) {
    return;
  }
  
  memoryState.flipped.push(idx);
  renderMemoryGame();
  
  if (memoryState.flipped.length === 2) {
    memoryState.moves++;
    setTimeout(() => checkMemoryMatch(), 800);
  }
}

function checkMemoryMatch() {
  const [idx1, idx2] = memoryState.flipped;
  const card1 = memoryState.cards[idx1];
  const card2 = memoryState.cards[idx2];
  
  // Coinciden si tienen el mismo pairId (son pareja) y son de diferente tipo
  const isMatch = card1.pairId === card2.pairId && card1.type !== card2.type;
  
  if (isMatch) {
    gameState.score += 20;
    memoryState.matched.push(idx1, idx2);
    document.getElementById('game-score').textContent = gameState.score;
    
    if (memoryState.matched.length === memoryState.cards.length) {
      setTimeout(() => {
        alert(`🎉 ¡Ganaste! Encontraste todos los pares. Puntaje: ${gameState.score}`);
        endGame();
      }, 500);
    }
  }
  
  memoryState.flipped = [];
  renderMemoryGame();
}

// ===== JUEGO DE ESCRITURA RÁPIDA =====
const typingPhrases = [
  'Microsoft Word es un procesador de texto',
  'Excel permite hacer cálculos y análisis de datos',
  'PowerPoint se usa para presentaciones',
  'Ctrl+C copia el contenido seleccionado',
  'Las fórmulas en Excel comienzan con igual',
  'Las diapositivas en PowerPoint tienen efectos de transición',
  'Word permite crear documentos formales con estilos',
  'Excel organiza datos en filas y columnas',
  'Atajos de teclado mejoran la velocidad de trabajo',
  'Los temas de PowerPoint unifican la presentación'
];

let typingState = {
  currentPhrase: '',
  startTime: 0,
  phrases: 0,
  usedPhrases: []
};

function startTyperGame() {
  typingState = { currentPhrase: '', startTime: 0, phrases: 0, usedPhrases: [] };
  gameState.round = 0;
  showNextPhrase();
}

function showNextPhrase() {
  let phrase;
  if (typingState.usedPhrases.length < typingPhrases.length) {
    // Obtener una frase no usada
    const availablePhrases = typingPhrases.filter((_, idx) => !typingState.usedPhrases.includes(idx));
    const randomIdx = Math.floor(Math.random() * availablePhrases.length);
    const globalIdx = typingPhrases.indexOf(availablePhrases[randomIdx]);
    typingState.usedPhrases.push(globalIdx);
    phrase = typingPhrases[globalIdx];
  } else {
    // Si ya usamos todas, reiniciar la lista
    typingState.usedPhrases = [];
    phrase = typingPhrases[0];
  }
  
  typingState.currentPhrase = phrase;
  typingState.startTime = Date.now();
  
  const area = document.getElementById('game-area');
  area.innerHTML = `
    <div class="card" style="text-align:center">
      <h4>⌨️ Escritor Rápido</h4>
      <p style="background:#f0f9ff;padding:15px;border-radius:8px;font-size:1.1em;margin:20px 0;font-weight:bold;letter-spacing:0.5px">
        ${typingState.currentPhrase}
      </p>
      <input id="typing-input" type="text" placeholder="Escribe aquí..." autofocus style="width:100%;padding:12px;font-size:1em;border:2px solid #8b5cf6;border-radius:6px;margin-bottom:15px" onkeypress="checkTyping(event)">
      <p class="small">Escribas correctamente y presiona Enter para continuar</p>
    </div>
  `;
  document.getElementById('typing-input').focus();
}

function checkTyping(e) {
  if (e.key !== 'Enter') return;
  
  const input = document.getElementById('typing-input').value.trim();
  
  if (input === typingState.currentPhrase) {
    const timeSeconds = Math.round((Date.now() - typingState.startTime) / 1000);
    const points = Math.max(10, 50 - timeSeconds);
    gameState.score += points;
    typingState.phrases++;
    document.getElementById('game-score').textContent = gameState.score;
    
    alert(`✅ ¡Correcto! +${points} pts`);
    
    if (typingState.phrases >= 5) {
      setTimeout(() => {
        alert(`🎉 ¡Juego terminado! Completaste 5 frases. Puntaje: ${gameState.score}`);
        endGame();
      }, 300);
    } else {
      showNextPhrase();
    }
  } else {
    alert('❌ Texto incorrecto. Intenta de nuevo.');
    document.getElementById('typing-input').value = '';
  }
}

function updateLeaderboard() {
  const container = document.getElementById('leaderboard');
  if (!container) return;
  
  // Obtener leaderboards de cada juego
  const quizLeaderboard = JSON.parse(localStorage.getItem('ue_leaderboard_quiz') || '[]');
  const memoryLeaderboard = JSON.parse(localStorage.getItem('ue_leaderboard_memory') || '[]');
  const typerLeaderboard = JSON.parse(localStorage.getItem('ue_leaderboard_typer') || '[]');
  
  const renderLeaderboard = (data, title) => {
    const sorted = (data || []).slice().sort((a, b) => {
      if ((b.score || 0) !== (a.score || 0)) return (b.score || 0) - (a.score || 0);
      return (a.time || 0) - (b.time || 0);
    });
    if (sorted.length === 0) {
      return `<div style="margin-bottom:20px">
        <h4 style="text-align:center">${title}</h4>
        <div class="empty" style="padding:15px">Sé el primero en jugar 🚀</div>
      </div>`;
    }
    
    return `<div style="margin-bottom:20px">
      <h4 style="text-align:center;color:#8b5cf6">${title}</h4>
      ${sorted.slice(0, 5).map((entry, idx) => `
        <div style="padding:10px;border-bottom:1px solid #e5e7eb;display:flex;justify-content:space-between;align-items:center">
          <div>
            <strong>#${idx + 1}</strong> ${idx === 0 ? '👑' : ''} ${entry.name}
          </div>
          <div style="text-align:right;font-size:0.9em">
            ⭐ ${entry.score} pts<br>
            ⏱ ${entry.time}s
          </div>
        </div>
      `).join('')}
    </div>`;
  };
  
  container.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px">
      <div>${renderLeaderboard(quizLeaderboard, '❓ Quiz')}</div>
      <div>${renderLeaderboard(memoryLeaderboard, '🧠 Memoria')}</div>
    </div>
    <div>${renderLeaderboard(typerLeaderboard, '⌨️ Escritor Rápido')}</div>
  `;
}

// ===== SISTEMA DE EVALUACIONES =====
function openEvaluationSubmit(taskId) {
  const task = CONFIG.tasks.find(t => t.id === taskId);
  if (!task || task.type !== 'evaluacion') return;
  
  const preguntasHTML = (task.preguntas || []).map((pregunta, idx) => {
    if (typeof pregunta === 'string') {
      return `
      <div style="margin-bottom:15px;padding:12px;background:#f9fafb;border-radius:6px;border-left:3px solid #8b5cf6">
        <label><strong>Pregunta ${idx + 1}:</strong> ${pregunta}</label>
        <textarea id="resp-${idx}" placeholder="Tu respuesta..." rows="2" style="width:100%;padding:8px;border:1px solid #e5e7eb;border-radius:6px;margin-top:8px;font-family:inherit"></textarea>
      </div>
      `;
    } else if (pregunta && Array.isArray(pregunta.choices)) {
      return `
      <div style="margin-bottom:15px;padding:12px;background:#f9fafb;border-radius:6px;border-left:3px solid #8b5cf6">
        <label><strong>Pregunta ${idx + 1}:</strong> ${pregunta.text}</label>
        <div style="margin-top:8px">
          ${pregunta.choices.map((c, ci) => `
            <label style="display:block;margin-bottom:6px"><input type="radio" name="resp-${idx}" value="${ci}"> ${c}</label>
          `).join('')}
        </div>
      </div>
      `;
    } else {
      return '';
    }
  }).join('');
  
  const submitHTML = `
    <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:9999;overflow-y:auto;padding:20px" onclick="closeEvaluationModal()">
      <div class="card" style="width:90%;max-width:600px;background:#fff;padding:25px;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,0.3)" onclick="event.stopPropagation()">
        <h3>📤 Enviar Evaluación</h3>
        <p><strong>${task.title}</strong></p>
        <form id="evaluation-form" style="margin-top:20px">
          <label><strong>Tu nombre</strong></label>
          <input id="eval-name" placeholder="Ingresa tu nombre completo" required style="width:100%;padding:10px;border:1px solid #e5e7eb;border-radius:6px;margin-bottom:15px">
          
          <h4 style="margin-top:20px;margin-bottom:12px">Responde las siguientes preguntas:</h4>
          ${preguntasHTML}
          
          <p style="color:#374151;margin-top:8px">Esta evaluación es una prueba para medir lo aprendido en el trimestre. Responde las preguntas; la evaluación se calificará automáticamente.</p>
          <div style="display:flex;gap:10px;margin-top:20px">
            <button type="submit" class="btn primary" style="flex:1">✅ Enviar y Calificar</button>
            <button type="button" class="btn" onclick="closeEvaluationModal()" style="flex:1">❌ Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  `;
  
  const modal = document.createElement('div');
  modal.id = 'eval-modal';
  modal.innerHTML = submitHTML;
  modal.dataset.taskId = taskId;
  document.body.appendChild(modal);
  // iniciar temporizador para la evaluación (tiempo en segundos se guarda en la sumisión)
  modal.dataset.startTime = Date.now();
  
  document.getElementById('evaluation-form').addEventListener('submit', handleEvaluationSubmit);
}

function closeEvaluationModal() {
  const modal = document.getElementById('eval-modal');
  if (modal) modal.remove();
}

// ===== SUBIDA DE ARCHIVOS DESDE ESTUDIANTES =====
function openMaterialUpload(taskId) {
  // Buscar la tarea en localStorage primero, luego en CONFIG
  let task = JSON.parse(localStorage.getItem('ue_tasks') || '[]').find(t => t.id === taskId);
  if (!task) {
    task = CONFIG.tasks.find(t => t.id === taskId);
  }
  if (!task) return;

  const html = `
    <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:9999;padding:20px" onclick="closeMaterialModal()">
      <div class="card" style="width:90%;max-width:600px;padding:20px;background:#fff;border-radius:10px" onclick="event.stopPropagation()">
        <h3>📤 Subir Archivo - ${task.title}</h3>
        <form id="material-upload-form" style="margin-top:12px">
          <label><strong>Tu nombre</strong></label>
          <input id="mat-name" placeholder="Ingresa tu nombre completo" required style="width:100%;padding:10px;border:1px solid #e5e7eb;border-radius:6px;margin-bottom:12px">
          <label><strong>Enlace al archivo (Drive/OneDrive/Dropbox) o nombre de archivo</strong></label>
          <input id="mat-file" placeholder="https://... o NombreArchivo.pdf" required style="width:100%;padding:10px;border:1px solid #e5e7eb;border-radius:6px;margin-bottom:12px">
          <div style="display:flex;gap:10px;margin-top:8px">
            <button type="submit" class="btn primary" style="flex:1">✅ Subir</button>
            <button type="button" class="btn" onclick="closeMaterialModal()" style="flex:1">❌ Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const modal = document.createElement('div');
  modal.id = 'mat-modal';
  modal.innerHTML = html;
  modal.dataset.taskId = taskId;
  document.body.appendChild(modal);

  document.getElementById('material-upload-form').addEventListener('submit', handleMaterialUpload);
}

function closeMaterialModal() {
  const modal = document.getElementById('mat-modal');
  if (modal) modal.remove();
}

function handleMaterialUpload(e) {
  e.preventDefault();
  const modal = document.getElementById('mat-modal');
  if (!modal) return;
  const taskId = parseInt(modal.dataset.taskId);
  // Buscar en localStorage primero, luego en CONFIG
  let task = JSON.parse(localStorage.getItem('ue_tasks') || '[]').find(t => t.id === taskId);
  if (!task) {
    task = CONFIG.tasks.find(t => t.id === taskId) || {};
  }
  const name = document.getElementById('mat-name').value;
  const file = document.getElementById('mat-file').value;

  const submissions = JSON.parse(localStorage.getItem('ue_material_submissions') || '[]');
  submissions.push({
    id: Date.now(),
    taskId: taskId,
    taskTitle: task.title || 'Material',
    studentName: name,
    file: file,
    submittedDate: new Date().toLocaleDateString('es-ES')
  });
  localStorage.setItem('ue_material_submissions', JSON.stringify(submissions));
  closeMaterialModal();
  alert('✅ Archivo subido correctamente.');
}

function handleEvaluationSubmit(e) {
  e.preventDefault();
  
  const modal = document.getElementById('eval-modal');
  const taskId = parseInt(modal.dataset.taskId);
  const task = CONFIG.tasks.find(t => t.id === taskId);
  
  const name = document.getElementById('eval-name').value;

  // Capturar respuestas (soporta MCQ) y autocalificar
  const respuestas = [];
  let correctCount = 0;
  if (task.preguntas) {
    for (let i = 0; i < task.preguntas.length; i++) {
      const p = task.preguntas[i];
      if (typeof p === 'string') {
        const resp = document.getElementById(`resp-${i}`).value;
        respuestas.push({ pregunta: p, respuesta: resp });
      } else if (p && Array.isArray(p.choices)) {
        const sel = document.querySelector(`input[name="resp-${i}"]:checked`);
        const selectedIndex = sel ? parseInt(sel.value) : null;
        const selectedText = selectedIndex !== null ? p.choices[selectedIndex] : '';
        const isCorrect = selectedIndex !== null && p.correctIndex !== undefined && selectedIndex === p.correctIndex;
        if (isCorrect) correctCount++;
        respuestas.push({ pregunta: p.text, selectedIndex: selectedIndex, respuesta: selectedText, correctIndex: p.correctIndex });
      }
    }
  }

  // calcular nota sobre 10
  const totalQuestions = (task.preguntas || []).filter(q => typeof q !== 'string').length || 0;
  const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 10) : null;

  // tiempo en segundos
  const start = parseInt(document.getElementById('eval-modal').dataset.startTime || Date.now());
  const timeSec = Math.round((Date.now() - start) / 1000);

  let submissions = JSON.parse(localStorage.getItem('ue_evaluations') || '[]');
  submissions.push({
    id: Date.now(),
    taskId: taskId,
    taskTitle: task.title,
    studentName: name,
    respuestas: respuestas,
    submittedDate: new Date().toLocaleDateString('es-ES'),
    grade: score,
    autoGraded: true,
    timeSeconds: timeSec
  });

  localStorage.setItem('ue_evaluations', JSON.stringify(submissions));
  closeEvaluationModal();
  if (score !== null) {
    alert(`✅ Evaluación enviada. Nota automática: ${score}/10 (${correctCount}/${totalQuestions} correctas).`);
  } else {
    alert('✅ Evaluación enviada.');
  }
  // refrescar vista del profesor si está abierta
  if (document.getElementById('teacher-evaluations')) renderTeacherEvaluations();
}

function renderTeacherEvaluations() {
  const container = document.getElementById('teacher-evaluations');
  if (!container) return;
  
  const submissions = JSON.parse(localStorage.getItem('ue_evaluations') || '[]');
  
  if (submissions.length === 0) {
    container.innerHTML = '<div class="empty">📭 No hay evaluaciones enviadas.</div>';
    return;
  }
  
  container.innerHTML = submissions.map(sub => `
    <div style="padding:15px;border:1px solid #e5e7eb;border-radius:8px;margin-bottom:15px;background:#fafafa">
      <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:12px">
        <div>
          <strong>${sub.studentName}</strong>
          <br>
          <span class="small">📝 ${sub.taskTitle}</span>
          <br>
          <span class="small">📅 Enviado: ${sub.submittedDate}</span>
        </div>
        <div>${sub.grade ? `<span style="background:#8b5cf6;color:#fff;padding:8px 14px;border-radius:20px;font-weight:bold">⭐ ${sub.grade}/10</span>` : `<span class="small" style="background:#fff3cd;padding:6px 12px;border-radius:12px">⏳ Pendiente</span>`}</div>
      </div>
      
      <div style="background:#fff;padding:12px;border-radius:6px;margin:12px 0;border-left:3px solid #8b5cf6">
        <strong>Respuestas:</strong>
        ${sub.respuestas.map((r, idx) => {
          if (r.hasOwnProperty('selectedIndex')) {
            const correct = r.selectedIndex !== null && r.correctIndex !== undefined && r.selectedIndex === r.correctIndex;
            return `
              <div style="margin-top:10px;padding:10px;background:#f9fafb;border-radius:4px">
                <strong>P${idx + 1}:</strong> ${r.pregunta}<br>
                <span style="color:#666"><em>Respuesta del alumno:</em> ${r.respuesta || '<span style="color:#a0a0a0">(No respondida)</span>'}</span>
                <br>
                <span style="font-weight:bold;color:${correct ? '#16a34a' : '#dc2626'}">${correct ? 'Correcta ✅' : 'Incorrecta ❌'}</span>
              </div>
            `;
          } else {
            return `
              <div style="margin-top:10px;padding:10px;background:#f9fafb;border-radius:4px">
                <strong>P${idx + 1}:</strong> ${r.pregunta}<br>
                <span style="color:#666"><em>R:</em> ${r.respuesta}</span>
              </div>
            `;
          }
        }).join('')}
      </div>
      
      ${sub.file ? `<p><strong>Archivo:</strong> <a href="${sub.file}" target="_blank" style="color:#8b5cf6;text-decoration:none">Ver archivo →</a></p>` : ''}
      ${sub.timeSeconds ? `<p class="small">⏱ Tiempo: ${sub.timeSeconds}s ${sub.autoGraded ? '· (Auto-calificada)' : ''}</p>` : ''}
      
      <div style="display:flex;gap:10px;align-items:center;margin-top:12px">
        <input type="number" id="grade-${sub.id}" min="1" max="10" placeholder="Calificación (1-10)" value="${sub.grade || ''}" style="flex:1;padding:10px;border:1px solid #e5e7eb;border-radius:6px">
        <button class="btn primary" onclick="gradeEvaluation(${sub.id})" style="padding:10px 20px">✅ Calificar</button>
      </div>
    </div>
  `).join('');
}

function gradeEvaluation(submissionId) {
  const gradeInput = document.getElementById(`grade-${submissionId}`);
  const grade = parseInt(gradeInput.value);
  
  if (!grade || grade < 1 || grade > 10) {
    alert('⚠️ Ingresa una calificación válida entre 1 y 10');
    return;
  }
  
  let submissions = JSON.parse(localStorage.getItem('ue_evaluations') || '[]');
  const submission = submissions.find(s => s.id === submissionId);
  
  if (submission) {
    submission.grade = grade;
    localStorage.setItem('ue_evaluations', JSON.stringify(submissions));
    alert(`✅ Calificación asignada: ${grade}/10`);
    renderTeacherEvaluations();
  }
}

// Mostrar envíos de estudiantes (archivos subidos)
function renderTeacherSubmissions() {
  const container = document.getElementById('teacher-submissions');
  if (!container) return;

  const submissions = JSON.parse(localStorage.getItem('ue_material_submissions') || '[]');

  if (submissions.length === 0) {
    container.innerHTML = '<div class="empty">📭 No hay envíos de estudiantes.</div>';
    return;
  }

  container.innerHTML = submissions.map(sub => `
    <div style="padding:15px;border:1px solid #e5e7eb;border-radius:8px;margin-bottom:12px;background:#fafafa">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <strong>${sub.studentName}</strong>
          <br><span class="small">📄 ${sub.taskTitle}</span>
          <br><span class="small">📅 ${sub.submittedDate}</span>
        </div>
        <div style="text-align:right">
          ${sub.file ? `<a href="${sub.file}" target="_blank" style="color:#8b5cf6">Ver archivo</a>` : ''}
          <br>
          <button class="btn small" onclick="deleteSubmission(${sub.id})" style="margin-top:8px">🗑️ Eliminar</button>
        </div>
      </div>
    </div>
  `).join('');
}

function deleteSubmission(id) {
  if (!confirm('¿Eliminar envío del estudiante?')) return;
  let subs = JSON.parse(localStorage.getItem('ue_material_submissions') || '[]');
  subs = subs.filter(s => s.id !== id);
  localStorage.setItem('ue_material_submissions', JSON.stringify(subs));
  renderTeacherSubmissions();
}
