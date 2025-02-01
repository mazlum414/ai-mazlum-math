// Makale Gönderme Fonksiyonu
function submitArticle() {
    const title = document.getElementById('articleTitle').value;
    const content = document.getElementById('articleContent').value;

    if (title && content) {
        const articleData = {
            title: title,
            content: content
        };

        fetch('http://localhost:3000/submitArticle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(articleData)
        })
        .then(response => response.json())
        .then(data => {
            alert('Makale başarıyla gönderildi: ' + title);
            document.getElementById('articleForm').reset(); // Formu sıfırlamak için
        })
        .catch(error => {
            console.error('Makale gönderilirken bir hata oluştu:', error);
            alert('Bir hata oluştu!');
        });
    } else {
        alert('Lütfen tüm alanları doldurun.');
    }
}

// Yorum Gönderme Fonksiyonu
function submitComment() {
    const commentText = document.getElementById('userComment').value;
    if (commentText) {
        const commentData = {
            author: 'Me',
            content: commentText
        };

        fetch('http://localhost:3000/submitComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentData)
        })
        .then(response => response.json())
        .then(data => {
            const commentsSection = document.getElementById('commentsSection');
            const newComment = document.createElement('div');
            newComment.classList.add('comment');
            newComment.innerHTML = `<p><strong>Yazar:</strong> Me</p><p>${commentText}</p>`;
            commentsSection.appendChild(newComment);
            document.getElementById('userComment').value = ''; // Temizle
        })
        .catch(error => {
            console.error('Yorum gönderilirken bir hata oluştu:', error);
            alert('Bir hata oluştu!');
        });
    }
}

// Hesap Makinesi
function calculate() {
    const num1 = parseFloat(document.getElementById('input1').value);
    const num2 = parseFloat(document.getElementById('input2').value);
    if (!isNaN(num1) && !isNaN(num2)) {
        const sum = num1 + num2;
        document.getElementById('result').textContent = `Sonuç: ${sum}`;
    } else {
        alert('Lütfen geçerli sayılar girin.');
    }
}

// Grafik Çizme Fonksiyonu
function drawGraph() {
    const func = document.getElementById('graphFunction').value;
    const ctx = document.getElementById('graphCanvas').getContext('2d');

    // Basit bir fonksiyon çözümleme örneği: f(x) = x^2
    const data = [];
    for (let x = -10; x <= 10; x++) {
        const y = x * x; // x^2 fonksiyonu
        data.push({ x: x, y: y });
    }

    const chartData = {
        datasets: [{
            label: 'f(x) = x^2',
            data: data,
            borderColor: 'blue',
            fill: false,
            tension: 0.1
        }]
    };

    new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                }
            }
        }
    });
}

