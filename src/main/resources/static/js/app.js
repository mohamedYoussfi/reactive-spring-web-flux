let courbes = [];
let chart = new SmoothieChart();
chart.streamTo(document.getElementById("chart"), 500);
var colors=[
    {strokeStyle:'rgba(255, 0, 0, 1)',fillStyle: 'rgba(255, 0, 0, 0.2)',lineWidth: 2 },
    {strokeStyle:'rgba(0, 255, 0, 1)',fillStyle: 'rgba(0, 255, 0, 0.2)',lineWidth: 2 },
    {strokeStyle:'rgba(0, 0, 255, 1)',fillStyle: 'rgba(0, 0, 255, 0.2)',lineWidth: 2 }
];
let index=-1;
function onConnect(btn,id) {
    if(!courbes[id]){
        courbes[id]=new TimeSeries({scrollBackwards:true,tooltip:true});
        let color=colorRandom();
        chart.addTimeSeries(courbes[id],color);
        var connection = new EventSource("/streamTransactionsBySociete/" + id);
        connection.onmessage=function (resp) {
            var transaction=JSON.parse(resp.data);
            courbes[id].append(new Date().getTime(),transaction.price);
        };
        btn.style.background='#FF0000';

    }
}
function colorRandom(){
    ++index;
    if(index>=colors.length) index=0;
    return colors[index];
}