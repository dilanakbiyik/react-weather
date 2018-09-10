/**
 * Weather api function tests
 */

import { forecast } from '../open-weather-map.services';

describe('open-weather-map', () => {
    describe('stubbing successful response', () => {
        it('should format the response correctly', (done) => {
            forecast('Amsterdam')
                .catch((error) => done(error))
                .then((json) => {
                    expect(json.cod).toBe('200');
                    expect(json.list).toBeDefined();
                    expect(json.list.length).toBeGreaterThan(0);
                    done();
                });
        });
    });
    /*
    * this unit test is not working because weather api is closing connection
    *
    describe('stubbing error response', () => {
        it('should catch errors', (done) => {
            forecast('')
                .catch((error) => done(error))
                .then((json) => {
                    expect(json.cod).toBe('400');
                    done();
                });
        });
    });
    */
});