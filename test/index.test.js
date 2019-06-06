'use strict';

const expect = require("chai").expect;
const CelestialVelocity = require('../index');
const { MoonPosition } = require('@behaver/solar-star-position');
const { JDateRepository } = require('@behaver/jdate');

describe('#CelestialVelocity', () => {
  describe('#Verify', () => {
    it('Moon Geocentric Ecliptic Velocity.', () => {
      let MoonPosProvider = new MoonPosition({ time: new JDateRepository }),
          CV = new CelestialVelocity(MoonPosProvider);

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