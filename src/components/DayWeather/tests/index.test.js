/**
 * DayWeather component tests
 */
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import DayWeather from '../DayWeather'

describe('DayWeather component', () => {
    it('should run wıthout error', () => {
        const component = Enzyme.shallow(<DayWeather day="10-28-2010" />);
    });
});
