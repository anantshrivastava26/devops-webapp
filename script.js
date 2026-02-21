// Update dashboard statistics
function updateStats() {
    const tasks = document.querySelectorAll('.task-item');
    const completedTasks = document.querySelectorAll('.task-item input[type="checkbox"]:checked').length;
    const totalTasks = tasks.length;
    const pendingTasks = totalTasks - completedTasks;
    const progressPercent = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
    
    document.getElementById('totalTasks').textContent = totalTasks;
    document.getElementById('completedTasks').textContent = completedTasks;
    document.getElementById('pendingTasks').textContent = pendingTasks;
    document.getElementById('progressPercent').textContent = progressPercent + '%';
}

// Tab switching functionality
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        
        // Remove active class from all tabs and buttons
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button and corresponding tab
        this.classList.add('active');
        document.getElementById(tabName).classList.add('active');
    });
});

// Task management
function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task');
        return;
    }
    
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
        <input type="checkbox">
        <span>${escapeHtml(taskText)}</span>
        <button class="delete-btn" onclick="deleteTask(this)">✕</button>
    `;
    
    taskList.appendChild(li);
    input.value = '';
    input.focus();
    updateStats();
}

function deleteTask(button) {
    button.parentElement.remove();
    updateStats();
}

// Allow Enter key to add task
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Task checkbox toggle styling
document.addEventListener('change', function(e) {
    if (e.target.type === 'checkbox' && e.target.closest('.task-item')) {
        const span = e.target.closest('.task-item').querySelector('span');
        if (e.target.checked) {
            span.style.textDecoration = 'line-through';
            span.style.opacity = '0.6';
        } else {
            span.style.textDecoration = 'none';
            span.style.opacity = '1';
        }
        updateStats();
    }
});

// Utility function to escape HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Initialize existing task checkboxes
window.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.task-item input[type="checkbox"]').forEach(checkbox => {
        const span = checkbox.closest('.task-item').querySelector('span');
        if (checkbox.checked) {
            span.style.textDecoration = 'line-through';
            span.style.opacity = '0.6';
        }
    });
    updateStats();
});
