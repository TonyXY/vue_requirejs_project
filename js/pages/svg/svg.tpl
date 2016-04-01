<!-- template for the polygraph component. -->
<script type="text/x-template" id="polygraph-template">
    <g>
        <polygon :points="points"></polygon>
        <circle cx="100" cy="100" r="80"></circle>
        <axis-label v-for="stat in stats" :stat="stat" :index="$index" :total="stats.length">
        </axis-label>
    </g>
</script>

<!-- template for the axis label component. -->
<script type="text/x-template" id="axis-label-template">
    <text :x="point.x" :y="point.y">{{stat.label}}</text>
</script>
<script type="text/x-template" id="demo-template">
    <!-- Use the component -->
    <svg width="200" height="200">
        <polygraph :stats="stats"></polygraph>
    </svg>
    <!-- controls -->
    <div v-for="stat in stats">
        <label>{{stat.label}}</label>
        <input type="range" v-model="stat.value" min="0" max="100">
        <span>{{stat.value}}</span>
        <button @click="remove(stat)">X</button>
    </div>
    <form id="add">
        <input name="newlabel" v-model="newLabel">
        <button @click="add">Add a Stat</button>
    </form>
    <pre id="raw">{{stats | json}}</pre>
</script>
<!-- demo root element -->
<div id="demo">

</div>
<a v-link="{ path: '/chart' }">go to chart</a>
<a v-link="{ path: '/svg/barss' }">go to barss</a>
<router-view></router-view>
