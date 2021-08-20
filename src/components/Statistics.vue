<template>
    <v-container>
        <div class="board">
            <v-row>
                <div class="left">
                    <div class="row1">
                        <div class="one"><One /></div>
                        <div class="two"><Two /></div>
                    </div>
                    <div class="row2">
                        <div class="three"><Three /></div>
                    </div>
                </div>
                <div class="right">
                    <div class="row1">
                        <div class="four"><Four /></div>
                    </div>
                    <div class="row2">
                        <div class="five">
                            <div class="chart">
                                <Five />
                            </div>
                            <div class="keys">
                                <span class="key-head">Key</span>
                                <div class="key"><div class="key1"></div>Registered Clients</div>
                                <div class="key"><div class="key2"></div>Guest Clients</div>
                            </div>
                        </div>
                    </div>
                </div>
            </v-row>
            <div class="graph">
                <span class="income-title">Income 24h</span>
                <Graph /></div>
        </div>
    </v-container>
</template>

<script>
import One from './One'
import Two from './Two'
import Three from './Three'
import Four from './Four'
import Five from './Five'
import Graph from './Graph'

export default {
    components:{
        One,
        Two,
        Three,
        Four,
        Five,
        Graph
    }
};
</script>

<style scoped>
    .board{
        width: 100%;
        height: 100%;
        padding: 40px;
        background-color: whitesmoke;
    }
    .board .left{
        width: 48%;
        float: left;
        margin: 0 2% 2% 2%;
    }
    .right{
        width: 48%;
    }
    .one, .two, .three, .four, .five{
        background-color: white;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 1px 1px 4px 2px #e4e4e4;
    }
    .one, .two{
        width: 48%;
        margin-bottom: 20px;
    }
    .right{
        height: 100%;
    }
    .left .row1{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .three{
        min-height: 180px;
        overflow: auto;
    }
    .five{
        min-height: 210px;
        margin-top: 20px;
    }
    .graph{
        background-color: white;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 1px 1px 4px 2px #e4e4e4;
        margin-top: 17px;
    }
    .income-title{
        color: rgb(109, 199, 109);
        font-weight: bold;
    }
    .chart{
        width: 60%;
        float: left;
    }
    .key-head{
        margin: 0 0 0 -33%;
        font-size: 20px;
        color: #aaa;
    }
    .keys{
        margin-top: 10%;
        font-size: 13px;
    }
    .key{
        display: flex;
    }
    .key1{
        background-color: teal;
        width: 20px;
        height: 20px;
        float: right;
        margin: 0 10px 0 0;
    }
    .key2{
        background-color: #bbb;
        width: 20px;
        height: 20px;
        float: right;
        margin: 0 10px 0 0;
    }
    
</style>
