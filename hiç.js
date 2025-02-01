// Firebase Yapılandırması ve Diğer Kodlar Burada Aynı Kalacak

// PDF Dosyasını Okuma ve Metne Dönüştürme
document.getElementById('pdfInput').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    const loader = document.getElementById('loader');
    loader.style.display = 'block';

    try {
        const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
        let text = "";
        
        // PDF sayfalarını sırayla oku
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();
            
            textContent.items.forEach(item => {
                text += item.str + " ";
            });
        }

        document.getElementById('problemInput').value = text.trim();
        solveProblem();
    } catch (error) {
        showError("PDF işlenirken hata oluştu");
    }
    
    loader.style.display = 'none';
});

// Matematik Problemi Çözümü (Math.js)
async function solveProblem() {
    const problem = document.getElementById('problemInput').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    try {
        const solution = math.evaluate(problem);
        resultDiv.innerHTML = `
            <p><strong>Problemin:</strong> ${problem}</p>
            <p><strong>Sonuç:</strong> ${solution}</p>
            <div class="steps">
                <h4>Çözüm Adımları:</h4>
                <p>1. Problem analiz edildi</p>
                <p>2. Matematiksel ifade oluşturuldu</p>
                <p>3. Hesaplamalar yapıldı</p>
            </div>
        `;
    } catch (error) {
        showError("Çözüm sırasında hata oluştu");
    }
}

// Hata Mesajı Gösterme
function showError(message) {
    document.getElementById('result').innerHTML = `
        <div style="color: #ef4444; background: #1e293b; padding: 1rem; border-radius: 0.5rem;">
            ❌ ${message}
        </div>
    `;
}

// Grafik Çizme (Plotly.js)
function drawGraph() {
    const x = math.range(-10, 10, 0.1).toArray();
    const y = x.map(value => math.sin(value));

    const data = [{
        x: x,
        y: y,
        type: 'scatter',
        mode: 'lines',
        marker: {color: 'blue'},
    }];
    
    const layout = {
        title: 'y = sin(x)',
        xaxis: {title: 'x'},
        yaxis: {title: 'y'}
    };
    
    Plotly.newPlot('graph', data, layout);
}

// Sayfa yüklendiğinde grafik çizme
window.onload = drawGraph;

