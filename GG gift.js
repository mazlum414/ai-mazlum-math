// Yorumlar
document.getElementById('commentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const commentText = document.getElementById('commentText').value;
    if (!commentText) return;

    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push(commentText);
    localStorage.setItem('comments', JSON.stringify(comments));
    loadComments();
});

function loadComments() {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = comments.map(comment => `<p>${comment}</p>`).join('');
}

// Anketler
document.getElementById('surveyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const question = document.getElementById('surveyQuestion').value;
    const options = document.getElementById('surveyOptions').value.split(',').map(option => option.trim());

    if (!question || options.length < 2) {
        alert('Lütfen geçerli bir soru ve seçenekler girin.');
        return;
    }

    const surveys = JSON.parse(localStorage.getItem('surveys')) || [];
    surveys.push({
        question,
        options,
        responses: new Array(options.length).fill(0),
    });

    localStorage.setItem('surveys', JSON.stringify(surveys));
    loadSurveys();
});

function loadSurveys() {
    const surveys = JSON.parse(localStorage.getItem('surveys')) || [];
    const surveyList = document.getElementById('surveyList');
    surveyList.innerHTML = '';

    surveys.forEach((survey, index) => {
        const surveyDiv = document.createElement('div');
        surveyDiv.classList.add('surveyItem');
        surveyDiv.innerHTML = `
            <h4>${survey.question}</h4>
            <ul>
                ${survey.options.map((option, i) => `<li>${option}: ${survey.responses[i]}</li>`).join('')}
            </ul>
            <button onclick="voteSurvey(${index})">Oyla</button>
        `;
        surveyList.appendChild(surveyDiv);
}

function voteSurvey(surveyIndex) {
    const surveys = JSON.parse(localStorage.getItem('surveys')) || [];
    const survey = surveys[surveyIndex];

    const vote = prompt(`Hangi seçeneği oylamak istersiniz? (1-${survey.options.length} arası)`);

    const voteIndex = parseInt(vote) - 1;

    if (voteIndex >= 0 && voteIndex < survey.options.length) {
        survey.responses[voteIndex] += 1;
        localStorage.setItem('surveys', JSON.stringify(surveys));
        loadSurveys();
    } else {
        alert('Geçersiz oy!');
    }
}

// Görev Listesi
document.getElementById('taskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const taskName = document.getElementById('taskName').value;
    const taskDeadline = document.getElementById('taskDeadline').value;

    if (!taskName || !taskDeadline) {
        alert('Lütfen görev adı ve bitiş tarihi girin.');
        return;
    }

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ taskName, taskDeadline });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
});

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('taskItem');
        taskDiv.innerHTML = `
            <span>${task.taskName}</span><br>
            <strong>Bitiş Tarihi:</strong> ${new Date(task.taskDeadline).toLocaleString()}
        `;
        taskList.appendChild(taskDiv);
}

// Hesap Makinesi
document.getElementById('mathForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const mathExpression = document.getElementById('mathExpression').value;

    try {
        const result = eval(mathExpression);
        document.getElementById('mathResult').textContent = `Sonuç: ${result}`;
    } catch (error) {
        document.getElementById('mathResult').textContent = 'Geçersiz matematiksel ifade!';
    }
});

// Kullanıcı Profili
document.getElementById('updateProfileForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        currentUser.username = newUsername || currentUser.username;
        currentUser.password = newPassword || currentUser.password;

        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        alert('Profil başarıyla güncellendi.');
    } else {
        alert('Kullanıcı bulunamadı. Lütfen giriş yapın.');
    }
});

