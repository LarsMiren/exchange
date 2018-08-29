import { assert, expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Converter from '@/components/Converter.vue';
import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);

require('jsdom-global')();

describe('Converter.vue', () => {
    it('renders', () => {
        const wrapper = shallowMount(Converter);
        expect(wrapper.is(Converter)).to.true;
    });
    it('renders button with class calcButton', () => {
        const wrapper = shallowMount(Converter).find('button');
        expect(wrapper.is('button')).to.equal(true);
        expect(wrapper.classes()).to.contain('calcButton');
    });
    it('renders two selects with class currency', () => {
        const wrapper = shallowMount(Converter).findAll('select');
        expect(wrapper.is('select')).to.equal(true);
        expect(wrapper.at(0).classes()).to.contain('currency');
        expect(wrapper.at(1).classes()).to.contain('currency');
    });
});
