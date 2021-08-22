const PRODUCT_DATA = {
  where: {
    findlay: {
      id: 1,
      cheese: {
        cheddar: {
          productId: 1,
          name: 'cheddar',
          desc: 'shredded',
          unit: '4/5lb',
          split: true,
        },
        mozzarella: {
          productId: 2,
          name: 'mozarella',
          desc: 'shredded',
          unit: '4/5lb',
          split: true,
        }
      }
    },
    quattrocchis: {
      id: 2,
      peppers: {
        red: {
          productId: 1,
          name: 'red peppers',
          desc: 'whole',
          unit: 'single',
          split: false,
        },
        green: {
          productId: 2,
          name: 'green peppers',
          desc: 'whole',
          unit: 'single',
          split: false,
        }
      }
    }
  }
}

export default PRODUCT_DATA;