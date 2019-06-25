'use strict';

const expect = require("chai").expect;
const CelestialVelocity = require('../index');
const { MoonLocator } = require('@behaver/solar-star-locator');
const SolarStarLocator = require('@behaver/solar-star-locator/src/SolarStarLocator');
const { JDateRepository } = require('@behaver/jdate');
const { SystemSwitcher, CelestialLocator } = require('@behaver/celestial-coordinate');

describe('#CelestialVelocity', () => {
  describe('#Verify', () => {
    it('Moon Geocentric Ecliptic Velocity.', () => {
      let ML = new MoonLocator,
          CV = new CelestialVelocity(ML);
      // console.log(new CelestialLocator, (new SolarStarLocator) instanceof CelestialLocator);

      let {
        phi, // phi 方向角速度
        theta, // theta 方向角速度
        r, // 径向速度
      } = CV.get({
        t: 2448908.5,
      });

      expect(phi).to.closeTo(0.224, 0.005);

      let rc = CV.get({
        t: 2448908.5,
        celSys: 'eqc',
        celOpts: {
          withNutation: true,
        },
        coordSys: 'rc',
      });

      expect(rc).to.have.all.keys('x', 'y', 'z');
      console.log(rc);
    });
  });
});