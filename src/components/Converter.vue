<template>
    <div>
        <div>
            <p><input type="number" v-model="initialVal"></p>
            <p> Select currency from which you want to convert.<br>
                <select v-model="initialCurrency" class="currency">
                    <option v-for="(rate, currency) in rates"
                        :key="currency" :index="currency"
                        :value="currency" :title="currencies[currency]">
                        {{currency}}
                        {{ currencies[currency] ? ' : ' + currencies[currency] : '' }}
                    </option>
                </select>
            </p>
            
            <p> Select currency to which you want to convert.<br>
                <select v-model="finalCurrency" class="currency">
                    <option v-for="(rate, currency) in rates"
                        :key="currency" :index="currency"
                        :value="currency" :title="currencies[currency]">
                        {{currency}}
                        {{ currencies[currency] ? ' : ' + currencies[currency] : '' }}
                    </option>
                </select>
            </p>
        </div>
        <button v-on:click="calculate()" class="calcButton"
            :disabled="!initialCurrency || !finalCurrency || initialVal<0">
            Calculate
        </button>
        <p>Your result: {{ finalVal.toFixed(2) }}</p>
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { consts, Currencies, Rates } from '../utils';
import VueResource from 'vue-resource';
Vue.use(VueResource);

@Component
export default class Converter extends Vue {
    private rates: Rates = new Rates();
    private currencies: Currencies = new Currencies();

    private initialCurrency: string = '';
    private finalCurrency: string = '';
    private initialVal: number = 0;
    private finalVal: number = 0;

    public created() {
        const reqUri = consts.BASE_URI + 'latest.json' + '?app_id=' + consts.APP_ID;
        this.$http.get(reqUri).then( (resp) => {
            this.rates = resp.data.rates;
        });
        this.$http.get(consts.BASE_URI + 'currencies.json').then( (resp) => {
            this.currencies = resp.data;
        });
    }

    private calculate() {
        this.finalVal = this.initialVal *
            this.rates[this.finalCurrency] /
            this.rates[this.initialCurrency];
    }
}
</script>

<style>

</style>
