import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, LineController,Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
    // PluginService
);



export function LineChartInstance({labelName, labels, data, color, borderWidth=1}){
    const {borderColor, bgStartColor} = getChartColor(color);

    const chartData = {
        labels,
        datasets: [
            {
                label: labelName, //그래프 분류되는 항목
                data: data, //실제 그려지는 데이터(Y축 숫자)
                fill: true,
                borderColor: borderColor, //그래프 선 color
                backgroundColor: (context)=>{
                    const bgColor = [
                        bgStartColor,
                        'rgba(255,255,255,0.07)'
                    ]
                    if(!context.chart.chartArea){
                        return;
                    }
                    const {ctx, chartArea: {top, bottom}} = context.chart;
                    const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
                    const colorTranches = 1 / (bgColor.length - 1);
                    for(let i=0;i < bgColor.length;++i){
                        gradientBg.addColorStop(i*colorTranches, bgColor[i])
                    }

                    return gradientBg;
                }, //마우스 호버시 나타나는 분류네모 표시 bg, fill=true일 시 선 아래쪽 배경색이 채워진다
                borderWidth: borderWidth
            },
        ],
    };

    return (
        <Line data={chartData} options={options}/>
    )
}


const options = {
    // line 타입의 경우 중간에 누락된 데이터가 있을 경우 이어그릴지 여부를 정합니다
    spanGaps: true,
    // true면 부모의 container에 맞게 크기가 변함
    responsive: true,
    // (hover) 그래프에 커서를 올렸을 때 나타나는 박스에 대한 옵션
    interaction: {
        mode: 'nearest',  // index, dataset, point, nearest(defalut), x, y
        intersect: false // false면 마우스를 정확히 올리지 않고 가까이 대기만 해도 박스가 나타난다
    },
    // 척도 옵션
    scales: {
        x: {
            grid: { // x축 격자
                display: false
            }
        },
        y: {
            grid: { // y축 격자
                display: false
            }
        }
    },
    plugins: {
        legend: false,
        datalabels: {
            color: 'red',
            anchor: 'end',
            clamp: true,
            clip: true,
            align: '-135',
            offset: 100,
        },
    },
}

const getChartColor = (color)=>{
    let borderColor = 'rgb(0,0,0)';
    let bgStartColor = 'rgb(33,33,33)'
    switch (color){
        case 'red':
            borderColor = 'rgb(255,39,39)'
            bgStartColor = 'rgb(252,87,87)'
            break;
        case 'blue':
            borderColor = 'rgb(0,72,255)'
            bgStartColor = 'rgb(57,113,253)'
            break;
        case 'grey':
            borderColor = 'rgb(173,173,173)'
            bgStartColor = 'rgb(190,190,190)'
            break;
    }
    return {
        borderColor,
        bgStartColor
    }
}