/**
 * Search component tests
 */
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import Search from '../Search'

describe('Search component', () => {
    it('should call onChange prop', () => {
        const event = {
            preventDefault() {},
            target: { value: 'the-value' }
        };
        const component = Enzyme.shallow(<Search />);
        component.find('input').simulate('change', event);
        expect(component.state().search).toBe('the-value');
    });
});
