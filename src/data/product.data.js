const PRODUCT_DATA = {
  where: {
    findlays: {
      id: 1,
      products: {
        fridge: {
          dairy: {
            cheddar: {
              productId: 1,
              name: 'Cheddar Cheese',
              desc: 'Shredded',
              unit: '4/5lb',
              split: true,
            },
            mozzarella: {
              productId: 2,
              name: 'Mozarella Cheese',
              desc: 'Shredded',
              unit: '4/5lb',
              split: true,
            },
            parmesean: {},
            montereyjack: {},
            milk2: {
              productId: 3,
            },
            milk18: {},
            creamers: {},
            milkettes: {},
            sourcream: {},
          },             
        },
        freezer: {

        }
      }
    },
    quattrocchis: {
      id: 2,
      products: {
        fridge: {
            produce: {
              redpeppers: {
                productId: 1,
                name: 'red peppers',
                desc: 'whole',
                unit: 'single',
                split: false,
              },
              greenpeppers: {
                productId: 2,
                name: 'green peppers',
                desc: 'whole',
                unit: 'single',
                split: false,
              },
              tomatoes: {},
              cabbage: {},
              celery: {},
              carrot: {},
            },
          },
          pantry: {
            produce: {
              potatoes: {},
              redonion: {},
              spanishonion: {},
            },
          }
        }
      }
    },
    pigolive: {
      id: 3,
      products: {
        fridge: {
          meat: {
            groundbeef: {},
            chickenboob: {},
            peameal: {},
          }
        }
      }
    }
  }


export default PRODUCT_DATA;