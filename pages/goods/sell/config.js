module.exports = {
  // 基础类型输入框配置
  base: {
    name: {
      focus: true,
      title: '外卖',
      placeholder: '名称',
       componentId: 'form:base:name'
    },
    time: {
      error: true,
      title: '出售时间',
      inputType: 'number',
      placeholder: '请选择时间',
      componentId: 'form:base:time'
    },
    address: {
      title: '领取地址',
      type: 'textarea',
      placeholder: '请输入购买外卖地址',
      componentId: 'form:base:address'
    }
  },
  // 圆角输入框
  radius: {
    price: {
      right: true,
      mode: 'wrapped',
      title: '单价',
      inputType: 'number',
      placeholder: '每件商品的价格（元）',
      componentId: 'form:detail:price'
    },
    quantity: {
      right: true,
      mode: 'wrapped',
      title: '规格数量',
      inputType: 'number',
      placeholder: '每件商品中包含的数量（个）',
      componentId: 'form:detail:quantity'
    },
    amount: {
      right: true,
      mode: 'wrapped',
      title: '发售数量',
      inputType: 'number',
      placeholder: '发售的商品总数量（袋）',
      componentId: 'form:detail:amount'
    }
  },
  other: {
    limited: {
      checked: true,
      //对于switch，componentId得在外面声明才行
      componentId: 'other.limited'
    },
    fresh: {
      componentId: 'form:other:fresh'
    }
  },
  // Form 中使用输入框
  form: {
    name: {
      placeholder: '请输入收货人姓名',
      componentId: 'form:test:name'
    },
    tel: {
      name: 'tel',
      inputType: 'tel',
      placeholder: '请输入收货人手机号码',
      componentId: 'form:test:tel'
    }
  }
};
