document.addEventListener('DOMContentLoaded', () => {
    // Wait for d3 and function-plot are loaded
    const checkDependencies = setInterval(() => {
        if (window.d3 && window.functionPlot) {
            clearInterval(checkDependencies);
            renderPlots();
        }
    }, 100);

    function renderPlots() {
        const commonOptions = {
            width: getPlotWidth(),
            height: 250,
            grid: true,
            disableZoom: true
        };

        // Graph 1: Linear x + y = 5 => y = 5 - x
        functionPlot({
            target: '#plot-linear',
            ...commonOptions,
            xAxis: { domain: [-2, 8] },
            yAxis: { domain: [-2, 8] },
            data: [{
                fn: '5 - x',
                color: '#4361ee'
            }]
        });

        // Graph 2: Parabola y = x^2
        functionPlot({
            target: '#plot-parabola',
            ...commonOptions,
            xAxis: { domain: [-4, 4] },
            yAxis: { domain: [-2, 10] },
            data: [{
                fn: 'x^2',
                color: '#f72585'
            }]
        });

        // Graph 3: Circle x^2 + y^2 = 10 (approx implicit function)
        functionPlot({
            target: '#plot-circle',
            ...commonOptions,
            xAxis: { domain: [-5, 5] },
            yAxis: { domain: [-5, 5] },
            data: [{
                fnType: 'implicit',
                fn: 'x^2 + y^2 - 10',
                color: '#4cc9f0'
            }]
        });
    }

    // Helper to get graph width dynamically based on container
    function getPlotWidth() {
        const container = document.querySelector('.plot-container');
        if (container) {
            return container.clientWidth - 40; // minus padding
        }
        return 300;
    }

    // Redraw plots on resize
    window.addEventListener('resize', () => {
        // Debounce resize
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(() => {
            document.getElementById('plot-linear').innerHTML = '';
            document.getElementById('plot-parabola').innerHTML = '';
            document.getElementById('plot-circle').innerHTML = '';
            if (window.functionPlot) {
                renderPlots();
            }
        }, 300);
    });
});