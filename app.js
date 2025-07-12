// DOM Elementleri
const addNoteBtn = document.getElementById('addNoteBtn');
const noteModal = document.getElementById('noteModal');
const noteInput = document.getElementById('noteInput');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const notesContainer = document.getElementById('notesContainer');

// Notları localStorage'dan yükle
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Modal'ı aç/kapat
addNoteBtn.addEventListener('click', () => {
    noteModal.style.display = 'block';
    noteInput.focus();
});

// Notu kaydet
saveNoteBtn.addEventListener('click', () => {
    const noteText = noteInput.value.trim();
    if (noteText) {
        notes.push(noteText); // Notu diziye ekle
        localStorage.setItem('notes', JSON.stringify(notes)); // localStorage'a kaydet
        renderNotes(); // Notları ekranda göster
        noteInput.value = ''; // Input'u temizle
        noteModal.style.display = 'none'; // Modal'ı kapat
    }
});

// Notları ekranda göster
function renderNotes() {
    notesContainer.innerHTML = '';
    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.innerHTML = `
            <p>${note}</p>
            <button onclick="deleteNote(${index})">Sil</button>
        `;
        notesContainer.appendChild(noteElement);
    });
}

// Not silme fonksiyonu
window.deleteNote = function(index) {
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
};

// Sayfa yüklendiğinde notları göster
renderNotes();