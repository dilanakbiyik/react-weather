/**
 * WeatherInfo component tests
 */
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import WeatherInfo from '../WeatherInfo'

describe('WeatherInfo component', () => {
    it('should run wıthout error', () => {
        Enzyme.shallow(<WeatherInfo day="10-28-2010" />);
    });
});
