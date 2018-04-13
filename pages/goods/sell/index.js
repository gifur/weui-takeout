// pages/goods/sell/index.js
var Field = require('../../../dist/field/index.js');
var Switch = require('../../../dist/switch/index.js');
const config = require('./config');

Page(Object.assign({}, Field, Switch, {
  data: {
    config, 
    isLimited: {
      checked: false
    },
    isFresh: {
      checked: false
    }
  },

  handleZanFieldChange(e) {
    const { componentId, detail } = e;
    console.log('[zan:field:change]', componentId, detail);
  },

  handleZanFieldFocus(e) {
    const { componentId, detail } = e;
    console.log('[zan:field:focus]', componentId, detail);
  },

  handleZanFieldBlur(e) {
    const { componentId, detail } = e;
    console.log('[zan:field:blur]', componentId, detail);
  },

  handleZanSwitchChange(e) {
    const { checked, componentId } = e;
    console.log('[zan:switch:change]', componentId, checked, e.checked);
    this.setData({
      [`${componentId}.checked`]: e.checked
    });
  },

  clearInput() {
    this.setData({
      value: ''
    });
  },

  clearTextarea() {
    this.setData({
      textareaValue: ''
    });
  },

  formSubmit(event) {
    console.log('[zan:field:submit]', event.detail.value);
  },

  formReset(event) {
    console.log('[zan:field:reset]', event);
  },

  /* piker-view 示例相关函数 */
  handleDateFieldClick() {
    this.setData({
      'pickerViewConfig.show': true
    });
  },

  handlePopupDateChange(e) {
    this.setData({
      'pickerViewConfig.value': e.detail.value
    });
  },

  hideDatePopup() {
    this.setData({
      'pickerViewConfig.show': false
    });
  }

}));
