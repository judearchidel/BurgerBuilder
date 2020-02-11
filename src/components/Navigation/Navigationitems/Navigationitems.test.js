import React from'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Navigationitems from './Navigationitems';
import Navigationitem from './Navigationitem/Navigationitem';

configure({adapter: new Adapter()});





describe('<Navigationitems />',() => {
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<Navigationitems/>);
    })
        it('should render two <Naigationitem /> elements if not authenticated', ()=>{
            expect(wrapper.find(Navigationitem)).toHaveLength(2);
});

it('should render three <Naigationitem /> elements if  authenticated', ()=>{
    wrapper.setProps({athenticated: true});
    expect(wrapper.find(Navigationitem)).toHaveLength(3);
});
it('should show logout link', ()=>{
    wrapper.setProps({athenticated: true});
    expect(wrapper.contains( <Navigationitem link="/logout" >LogOut</Navigationitem>)).toEqual(true);
});
});