import React from 'react';
import {BurgerBuilder} from './BurgerBuilder';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder/>',()=>{
 let wrapper;
 wrapper= shallow(<BurgerBuilder getIngerientsHandler={()=>{}} />)
    it('should render <BuildControls /> when receving ingredients',()=>{
        wrapper.setProps({ing:{salad:0}})
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
})