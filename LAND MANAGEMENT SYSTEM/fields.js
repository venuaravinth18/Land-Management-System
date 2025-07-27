// Field Management
document.addEventListener('DOMContentLoaded', function() {
    // Load fields from localStorage
    loadFields();
    
    // Form submission
    document.getElementById('fieldForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addField();
    });
});

function loadFields() {
    const fields = JSON.parse(localStorage.getItem('fields')) || [];
    const tableBody = document.querySelector('#fieldsTable tbody');
    tableBody.innerHTML = '';
    
    fields.forEach((field, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${field.name}</td>
            <td>${field.size}</td>
            <td>${field.type}</td>
            <td>
                <button onclick="editField(${index})">Edit</button>
                <button onclick="deleteField(${index})">Delete</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Update dashboard count
    document.getElementById('fieldCount').textContent = fields.length;
}

function addField() {
    const name = document.getElementById('fieldName').value;
    const size = document.getElementById('fieldSize').value;
    const type = document.getElementById('fieldType').value;
    
    const fields = JSON.parse(localStorage.getItem('fields')) || [];
    fields.push({ name, size, type });
    localStorage.setItem('fields', JSON.stringify(fields));
    
    // Reset form and reload
    document.getElementById('fieldForm').reset();
    loadFields();
}

function editField(index) {
    const fields = JSON.parse(localStorage.getItem('fields'));
    const field = fields[index];
    
    document.getElementById('fieldName').value = field.name;
    document.getElementById('fieldSize').value = field.size;
    document.getElementById('fieldType').value = field.type;
    
    // Remove the old entry
    fields.splice(index, 1);
    localStorage.setItem('fields', JSON.stringify(fields));
    loadFields();
}

function deleteField(index) {
    const fields = JSON.parse(localStorage.getItem('fields'));
    fields.splice(index, 1);
    localStorage.setItem('fields', JSON.stringify(fields));
    loadFields();
}