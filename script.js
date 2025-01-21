// Dados simulados do arquivo CSV
const alimentos = [
    {
        nome: "Arroz Branco",
        imagem: "arroz.png",
        carboidratos: 28.2,
        proteinas: 2.7,
        gorduras: 0.3,
        vitaminas: "-"
    },
    {
        nome: "Feijão",
        imagem: "feijao.png",
        carboidratos: 20,
        proteinas: 9,
        gorduras: 0.5,
        vitaminas: "B9"
    },
    {
        nome: "Carne",
        imagem: "carne.png",
        carboidratos: 0,
        proteinas: 26,
        gorduras: 20,
        vitaminas: "-"
    },
    {
        nome: "Frango",
        imagem: "frango.png",
        carboidratos: 0,
        proteinas: 31,
        gorduras: 3.6,
        vitaminas: "B9"
    },
    {
        nome: "Batata",
        imagem: "batata.png",
        carboidratos: 17.5,
        proteinas: 2.02,
        gorduras: 0.100,
        vitaminas: "B9"
    },
    {
        nome: "Ovo",
        imagem: "ovo.png",
        carboidratos: 0.6,
        proteinas: 10,
        gorduras: 0.330,
        vitaminas: "B12 e D"
    },
    {
        nome: "Banana",
        imagem: "banana.png",
        carboidratos: 22.8,
        proteinas: 1.090,
        gorduras: 0.330,
        vitaminas: "B6 e C"
    },
    {
        nome: "Laranja",
        imagem: "laranja.png",
        carboidratos: 11.750,
        proteinas: 0.940,
        gorduras: 0.120,
        Vitaminas: "C e A"
    },
    {
        nome: "Pão",
        imagem: "pao.png",
        carboidratos: 50,
        proteinas: 9,
        gorduras: 2.5,
    },
    {
        nome: "Café",
        imagem: "cafe.png",
        carboidratos: 0,
        proteinas: 0,
        gorduras: 0,
    }
    // Outros alimentos podem ser adicionados aqui
];

// Carregar alimentos na tela
const alimentosContainer = document.getElementById('alimentos-container');

alimentos.forEach(alimento => {
    const div = document.createElement('div');
    div.className = 'alimento';

    div.innerHTML = `
        <img src="${alimento.imagem}" alt="Imagem de ${alimento.nome}">
        <h3>${alimento.nome}</h3>
        <p>Carboidratos: ${alimento.carboidratos}g</p>
        <p>Proteínas: ${alimento.proteinas}g</p>
        <p>Gorduras: ${alimento.gorduras}g</p>
        <p>Vitaminas: ${alimento.vitaminas}</p>
        <label for="quantidade-${alimento.nome}">Quantidade (g):</label>
        <input type="number" id="quantidade-${alimento.nome}" min="0">
    `;

    alimentosContainer.appendChild(div);
});

// Gerar gráficos
const btnGerarGraficos = document.getElementById('btn-gerar-graficos');
btnGerarGraficos.addEventListener('click', () => {
    const labels = [];
    const carboidratos = [];
    const proteinas = [];
    const gorduras = [];

    alimentos.forEach(alimento => {
        const quantidade = document.getElementById(`quantidade-${alimento.nome}`).value;
        if (quantidade > 0) {
            labels.push(alimento.nome);
            carboidratos.push((alimento.carboidratos * quantidade) / 100);
            proteinas.push((alimento.proteinas * quantidade) / 100);
            gorduras.push((alimento.gorduras * quantidade) / 100);
        }
    });

    if (labels.length > 0) {
        document.getElementById('graficos').style.display = 'block';

        // Gráfico 1: Comparação de nutrientes
        const ctx1 = document.getElementById('grafico1').getContext('2d');
        new Chart(ctx1, {
            type: 'bar',
            data: {
                labels,
                datasets: [
                    { label: 'Carboidratos (g)', data: carboidratos, backgroundColor: 'rgba(75, 192, 192, 0.6)' },
                    { label: 'Proteínas (g)', data: proteinas, backgroundColor: 'rgba(153, 102, 255, 0.6)' },
                    { label: 'Gorduras (g)', data: gorduras, backgroundColor: 'rgba(255, 159, 64, 0.6)' }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                }
            }
        });

        // Gráfico 2: Proporção de nutrientes
        const ctx2 = document.getElementById('grafico2').getContext('2d');
        new Chart(ctx2, {
            type: 'pie',
            data: {
                labels: ['Carboidratos', 'Proteínas', 'Gorduras'],
                datasets: [{
                    data: [
                        carboidratos.reduce((a, b) => a + b, 0),
                        proteinas.reduce((a, b) => a + b, 0),
                        gorduras.reduce((a, b) => a + b, 0)
                    ],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)'
                    ]
                }]
            },
            options: {
                responsive: true
            }
        });
    }
});
