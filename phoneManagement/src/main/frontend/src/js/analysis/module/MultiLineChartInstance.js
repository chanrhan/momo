import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, LineController,Filler,
    registerables
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {ObjectUtils} from "../../utils/objectUtil";
import ReactDOM from 'react-dom'
import Graph from "../../../css/graph.module.css"
import zoomPlugin from "chartjs-plugin-zoom"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    zoomPlugin
    // PluginService
);



export function MultiLineChartInstance({labelName, labels, pointRadius=1, tooltips, data, color, tooltip_disabled,
                                      x_axis_disabled, y_axis_disabled, borderWidth=1, label_disabled,
                                      yAxisCallback, onCreateTooltip, initMinIndex, initMaxIndex, onPan}){
    const blueColor = getChartColor(color);
    const redColor = getChartColor('red');


    if(ObjectUtils.isEmpty(data)){
        return null;
    }

    if(ObjectUtils.isEmpty(labels)){
        labels = new Array(data.length).fill('')
    }


    const colors = [
        blueColor,
        redColor
    ]


    const chartData = {
        labels,
        datasets: data.map((item,i)=>{
            const color = colors[i]
            return {
                label: i, //그래프 분류되는 항목
                data: item.map(v=>{
                    return v;
                }), //실제 그려지는 데이터(Y축 숫자)
                fill: true,
                borderColor: color.borderColor, //그래프 선 color
                backgroundColor: (context)=>{
                    const bgColor = [
                        color.bgStartColor,
                        'rgba(255,255,255,0.07)'
                    ];

                    if(!context.chart.chartArea){
                        return;
                    }
                    const {ctx, chartArea: {top, bottom}} = context.chart;
                    const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
                    const colorTranches = 1 / (bgColor.length - 1);
                    for(let i=0;i < bgColor.length;++i){
                        gradientBg.addColorStop(i*colorTranches, bgColor[i])
                    }
                    // return 'rgba(255,255,255,0)'
                    return gradientBg;
                }, //마우스 호버시 나타나는 분류네모 표시 bg, fill=true일 시 선 아래쪽 배경색이 채워진다
                borderWidth: borderWidth,
                pointRadius: pointRadius, // 데이터 꼭짓점 동그라미 크기
                pointHoverRadius: 1.2 // 마우스  호버 시 동그라미 크기
            }
        })
    };

    const options = {
        // line 타입의 경우 중간에 누락된 데이터가 있을 경우 이어그릴지 여부를 정합니다
        spanGaps: true,
        // true면 부모의 container에 맞게 크기가 변함
        responsive: true,
        maintainAspectRatio: false,

        interaction: { // (hover) 그래프에 커서를 올렸을 때 나타나는 박스에 대한 옵션
            // mode: 'nearest',  // index, dataset, point, nearest(defalut), x, y
            intersect: false // false면 마우스를 정확히 올리지 않고 가까이 대기만 해도 박스가 나타난다
        },
        animation:{
            x:{
                duration: 0
            }
        },
        // 척도 옵션
        scales: {
            x: {
                display: !x_axis_disabled, // x축 표시 여부
                grid: { // x축 격자
                    display: false
                },
                min: initMinIndex,
                max: initMaxIndex
            },
            y: {
                display: !y_axis_disabled, // y축 표시 여부
                grid: { // y축 격자
                    display: true
                },

                ticks:{
                    maxTicksLimit: 5,
                    // stepSize: 1,
                    callback: (value)=>{
                        // console.log(`ticks: ${value}`)
                        if(yAxisCallback){
                            return yAxisCallback(value)
                        }
                        return value;
                    }
                },
                min: 0
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
            tooltip: {
                mode: 'index',
                enabled: !tooltip_disabled, // 마우스 호버 시 나타나는 기본 툴팁 비활성화
                position: 'nearest',
                external: (context)=>{
                    externalTooltipHandler(context, onCreateTooltip);
                }
            },
            zoom: {
                zoom: {
                    enabled: true,
                    mode: 'x', // x축 줌만 활성화
                },
                pan: {
                    enabled: true,
                    mode: 'x', // x축으로만 팬 가능
                    speed: 10,
                    onPan: onPan
                }
            }
        },
    }

    return (
        <Line data={chartData} options={options}/>
    )
}

const externalTooltipHandler = (context, onCreateTooltip)=>{
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);
    // const tooltipEl = chart.canvas.parentNode.querySelector('div');
    //  const tooltipEl = document.createElement('div');
    // chart.canvas.parentNode.appendChild(tooltipEl);

    // 툴팁 숨기기
    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
    }

    // 툴팁 내용 설정
    if (tooltip.body) {
        const titleLines = tooltip.title || [];
        const bodyLines = tooltip.body.map((b) => b.lines);

        let tooltipContent = null;
        if(onCreateTooltip){
            // console.table(tooltip)
            // console.table(bodyLines)
            tooltipContent = onCreateTooltip(titleLines, tooltip.dataPoints);
        }else{
            tooltipContent = (
                <div className={Graph.tooltip_box}>
                    <div className={Graph.tooltip_title}>
                        {titleLines.map((title, i) => (
                            <div key={i}>{title}</div>
                        ))}
                    </div>
                    <div className={Graph.tooltip_body}>
                        {bodyLines.map((body, i) => (
                            <div key={i}>{body}</div>
                        ))}
                    </div>
                </div>
            )
        }

        // Warning: ReactDOM.render is no longer supported in React 18.
        // Use createRoot instead. Until you switch to the new API,
        // your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot
        ReactDOM.render(tooltipContent, tooltipEl);
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    // 스타일 적용
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = `${tooltip.options.padding}px`;
}

const getOrCreateTooltip = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div');

    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.className = Graph.tooltip
        // tooltipEl.style.background = 'rgba(255,255,255,0.81)';
        // tooltipEl.style.borderRadius = '6px';
        // tooltipEl.style.color = 'black';
        // tooltipEl.style.border = `1px solid`
        // tooltipEl.style.borderColor = `rgba(154, 194, 255, 0.91)`
        // tooltipEl.style.opacity = 1;
        // tooltipEl.style.pointerEvents = 'none';
        // tooltipEl.style.position = 'absolute';
        // tooltipEl.style.transform = 'translate(-50%, 0)';
        // tooltipEl.style.transition = 'all .25s ease';

        // const table = document.createElement('table');
        // table.style.margin = '0px';
        //
        // tooltipEl.appendChild(table);

        // const mouseEvent = chart.canvas.ownerDocument.defaultView.event
        // tooltipEl.style.opacity = 1;
        // tooltipEl.style.left = mouseEvent.pageX + 'px';
        // tooltipEl.style.top = mouseEvent.pageY + 'px';

        chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
};


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