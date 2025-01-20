$(document).ready(function () {
    const foods = [
        { name: "Banana", carbo: 23, proteina: 1, gordura: 0.3, },
        { name: "Laranja", carbo: 12, proteina: 1, gordura: 0.2 },
        { name: "Arroz", carbo: 28, proteina: 2.7, gordura: 0.3 },
        { name: "Feijão", carbo: 21, proteina: 8, gordura: 0.6 },
        { name: "Pão Frances", carbo: 49, proteina: 9, gordura: 3 },
        { name: "Carne de Frango", carbo: 0, proteina: 31, gordura: 3.6 },
        { name: "Carne bovina", carbo: 0, proteina: 27, gordura: 15 },
        { name: "Ovo", carbo: 1.1, proteina: 13, gordura: 10 },
        { name: "Café(sem açúcar)", carbo: 0, proteina: 0, gordura: 0 },
        { name: "batata branca", carbo: 17, proteina: 2, gordura: 0.1 }
    ];
    const images = [
        { 
        
        }
    ]

    const $foodTable = $('#food-table');

    // Populate the table with food data
    foods.forEach((food, index) => {
        $foodTable.append(`
            <tr>
            
                <td>${food.name}</td>
                <td>${food.carbo}</td>
                <td>${food.proteina}</td>
                <td>${food.gordura}</td>
                <td>
                    <input type="number" id="portion-${index}" value="0" min="0" style="width: 60px;">
                </td>
            </tr>
        `);
    });

    $('#generate-charts').on('click', function () {
        let totalcarbo = 0;
        let totalproteina = 0;
        let totalgordura = 0;

        // Calculate totals based on user input
        foods.forEach((food, index) => {
            const portion = parseInt($(`#portion-${index}`).val()) || 0;
            totalcarbo += food.carbo * portion / 100;
            totalproteina += food.proteina * portion / 100;
            totalgordura += food.gordura * portion / 100;
        });

        // Generate Pie Chart
        Highcharts.chart('pie-chart', {
            chart: { type: 'pie' },
            title: { text: 'Macronutrientes ' },
            tooltip: { pointFormat: '<b>{point.percentage:.1f}%</b>' },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: 'Macronutrientes',
                colorByPoint: true,
                data: [
                    { name: 'Carboidratos', y: totalcarbo },
                    { name: 'Proteínas', y: totalproteina },
                    { name: 'Gorduras', y: totalgordura }
                ]
            }]
        });

        // Generate Bar Chart
        Highcharts.chart('bar-chart', {
            chart: { type: 'column' },
            title: { text: 'Total Macronutrient Intake' },
            xAxis: { categories: ['Carbohydrates', 'proteina', 'gordura'] },
            yAxis: {
                min: 0,
                title: { text: 'Grams (g)' }
            },
            series: [{
                name: 'Macronutrients',
                data: [totalcarbo, totalproteina, totalgordura],
                colorByPoint: true
            }]
        });
    });
});