define(function (require) {

    var ctx = undefined;

    var parse = function (itemData) {
        var recebimentos = itemData.recebimentos;
        var contas = itemData.contas;
        var labels = itemData.labels;
        var chartData = {
            options: {
                title: {
                    display: true,
                    text: "Fluxo de: " + itemData.today
                }
            },
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Contas',
                        fill: false,
                        data: contas,
                        borderColor: 'rgba(255,0,0, 0.5)',
                        backgroudColor: 'rgba(255,0,0, 0.5)',
                    },
                    {
                        label: 'Recebimentos',
                        fill: false,
                        data: recebimentos,
                        borderColor: 'rgba(0,255,0, 0.5)',
                        backgroudColor: 'rgba(0,255,0, 0.5)'
                    }

                ]
            }

        };

        return chartData;

    }

    var load = function () {
        require('chartsJS');
        ctx = document.getElementById("myChart");
    }

    var buildChart = function (data) {
        var chartData = parse(data);
        new Chart(ctx, chartData);
    }

    return {
        load: load,
        build: buildChart
    }

});
