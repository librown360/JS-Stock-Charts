async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    // const response = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1min&apikey=0f2f1df833cf480686ffdaf705e756a7');
    // const result = await response.json();

    const { GME, MSFT, DIS, BNTX } = mockData;
    const stocks = [ GME, MSFT, DIS, BNTX ];

    // reverse the order of data to ascending
    stocks.forEach( stock => stock.values.reverse())
                                               
    // Stock price over time chart using ChartJS
    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime), 
            datasets: stocks.map( stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol)
            }))
        }
    });

    // Highest stock price chart using ChartJS
    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: 'Highest',
                backgroundColor: stocks.map(stock => (getColor(stock.meta.symbol))),
                borderColor: stocks.map(stock => (getColor(stock.meta.symbol))),
                data: stocks.map(stock => (highestStock(stock.values)))
            }]
        }
    });

    // Average stock price chart using ChartJS
    new Chart(averagePriceChartCanvas.getContext('2d'), {
        type: 'pie',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                backgroundColor: stocks.map(stock => (getColor(stock.meta.symbol))),
                data: stocks.map(stock => (highestStock(stock.values)))
            }]
        }
    });


        // function for colors assigned to each stock symbol
        function getColor(stock){
            if(stock === 'GME'){
                return 'rgba(61, 161, 61, 0.7)';
            }
            if(stock === 'MSFT'){
                return 'rgba(209, 4, 25, 0.7)';
            }
            if(stock === 'DIS'){
                return 'rgba(18, 4, 209, 0.7)';
            }
            if(stock === 'BNTX'){
                return 'rgba(166, 43, 158, 0.7)';
            }
        }

        // function for getting highest closing stock values
        function highestStock(values) {
            let highest = 0;
            values.forEach(value => {
                if (parseFloat(value.close) > highest) {
                    highest = value.close;
                }
            });
            return highest;
        }

        // function for getting average stock price values
        function averageStock(values) {
            let sum = 0;
            values.forEach(value => {
                sum += value.close;
            });
            return sum / values.length;
        }
}

main()