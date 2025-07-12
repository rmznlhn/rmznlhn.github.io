// DOM Elementleri
const addNoteBtn = document.getElementById('addNoteBtn');
const noteModal = document.getElementById('noteModal');
const noteInput = document.getElementById('noteInput');
const notesContainer = document.getElementById('notesContainer');
const closeBtn = document.querySelector('.close-btn');
const saveBtn = document.querySelector('.save-btn');
const colorOptions = document.querySelectorAll('.color-option');

// Notlar ve seçili renk
let notes = JSON.parse(localStorage.getItem('notes')) || [];
let selectedColor = 'var(--note-color-1)';

// Renk seçimi
colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        colorOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        selectedColor = option.dataset.color;
    });
});

// Modal'ı aç/kapat
addNoteBtn.addEventListener('click', () => {
    noteModal.style.display = 'flex';
    noteInput.focus();
});

closeBtn.addEventListener('click', () => {
    noteModal.style.display = 'none';
    noteInput.value = '';
});

// Notu kaydet
saveBtn.addEventListener('click', saveNote);

// Enter tuşu ile kaydet
noteInput.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        saveNote();
    }
});

function saveNote() {
    const noteText = noteInput.value.trim();
    if (noteText) {
        const newNote = {
            id: Date.now(),
            text: noteText,
            color: selectedColor
        };
        notes.push(newNote);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
        noteInput.value = '';
        noteModal.style.display = 'none';
    }
}

// Notları sil
function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
}

// Notları render et
function renderNotes() {
    notesContainer.innerHTML = '';
    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.style.background = note.color;
        noteElement.innerHTML = `
            <div class="note-content">${note.text}</div>
            <div class="note-actions">
                <button onclick="deleteNote(${note.id})"><i class="fas fa-trash"></i></button>
            </div>
        `;
        notesContainer.appendChild(noteElement);
    });
}

// Sayfa yüklendiğinde notları göster
renderNotes();