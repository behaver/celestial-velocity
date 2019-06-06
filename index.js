'use strict';

const { Derivator } = require('@behaver/unary-toolkit');
const { SystemSwitcher } = require('@behaver/celestial-coordinate');

/**
 * CelestialVelocity
 *
 * 天球速度计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 */
class CelestialVelocity {

  /**
   * 构造函数
   * 
   * @param {PositionProvider} pos_provider 天体位置提供组件
   */
  constructor(pos_provider) {
    this.private = {
      celestial: {}
    };

    this.PositionProvider = pos_provider;
  }

  /**
   * 设定 天体位置提供组件
   * 
   * @param {PositionProvider} value 天体位置提供组件
   */
  set PositionProvider(value) {
    this.private.PositionProvider = value;
  }

  /**
   * 获取 天体位置提供组件
   */
  get PositionProvider() {
    return this.private.PositionProvider;
  }

  /**
   * 设定 天球系统
   * 
   * @param  {String}            sys  天球系统名称缩写
   * @param  {Object}            opts 天球系统参数选项
   * @return {CelestialVelocity}      返回 this 引用
   */
  celestial(sys, opts) {
    this.private.celestial = {
      sys,
      opts,
    }

    return this;
  }

  /**
   * 获取 速度向量
   * 
   * @param  {Number} options.t             儒略日时间
   * @param  {String} options.celSys        目标天球系统字串
   * @param  {Object} options.celOpts       目标天球系统参数
   * @param  {String} options.coordSys      目标空间坐标系统字串
   * 
   * @return {Object}                       速度向量
   */
  get({
    t,
    celSys,
    celOpts,
    coordSys,
  }) {
    // 天球系统配置预设
    if (celSys == undefined) {
      celSys = this.private.celestial.sys;
      celOpts = this.private.celestial.opts;
    }

    let PosProvider = this.PositionProvider;

    // 构造求导原始函数 f
    let f = function(t) {
      // 设定 JD 时间
      PosProvider.time.JD = t;

      // 获取位置天球坐标
      let coord0 = PosProvider.get();

      // 处理天球坐标转换
      if (celSys) {
        // 实例化天球坐标转换器
        let CelSysSwitcher = new SystemSwitcher({
          coord: coord0
        });

        // 转换至目标天球坐标
        coord0 = CelSysSwitcher.to(celSys, celOpts);
      }

      // 获取目标空间球坐标
      let sc0 = coord0.sc;
      
      return coordSys ? sc0.to(coordSys) : sc0.equal();
    }

    // 实例化微分求导器
    let derivator = new Derivator({
      f,
      dx: 0.01,
      direction: 'both',
    });

    return derivator.get(t);
  }
}

module.exports = CelestialVelocity;
