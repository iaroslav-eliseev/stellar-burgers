import burgerConstructor, {initialState, addBun, addIngredient, moveDown, moveUp, removeIngredient, orderBurger} from "../src/services/slices/burgerConstructor";
import {expect, describe, test} from "@jest/globals";


describe('test burgerConstructor', () => {
    describe('test addIngredient', () => {
      const initialState = {
        constructorItems: {
          bun: null,
          ingredients: []
        },
        loading: false,
        orderRequest: false,
        orderModalData: null,
        error: null
      };
      const expectedResult = {
        ...initialState,
        constructorItems: {
          bun: {
            _id: '643d69a5c3f7b9001cfa093c',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
          },
          ingredients: [
            {
              _id: '643d69a5c3f7b9001cfa0943',
              name: 'Соус фирменный Space Sauce',
              type: 'sauce',
              proteins: 50,
              fat: 22,
              carbohydrates: 11,
              calories: 14,
              price: 80,
              image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
              image_mobile:
                'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
              image_large:
                'https://code.s3.yandex.net/react/code/sauce-04-large.png'
            }
          ]
        }
      };
  
      test('add ingredient to array ingredients', () => {
        const newState = burgerConstructor(
          initialState,
          addIngredient({
            _id: '643d69a5c3f7b9001cfa0943',
            name: 'Соус фирменный Space Sauce',
            type: 'sauce',
            proteins: 50,
            fat: 22,
            carbohydrates: 11,
            calories: 14,
            price: 80,
            image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-04-large.png'
          })
        );
  
        const ingredient = newState.constructorItems.ingredients[0];
        const expectedIngredient = expectedResult.constructorItems.ingredients[0];
  
        expect(ingredient).toEqual({
          ...expectedIngredient,
          _id: expect.any(String)
        });
      });
  
      test('add bun', () => {
        const newState = burgerConstructor(
          initialState,
          addBun({
            _id: '643d69a5c3f7b9001cfa093c',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
          })
        );
  
        const bun = newState.constructorItems.bun;
        const expectedBun = expectedResult.constructorItems.bun;
      
        
        expect(bun).toEqual({
          ...expectedBun,
          _id: expect.any(String)
        });
      });
  
      test('switch bun', () => {
        const initialStateWithBun = {
          constructorItems: {
            bun: {
              _id: '643d69a5c3f7b9001cfa093c',
              name: 'Краторная булка N-200i',
              type: 'bun',
              proteins: 80,
              fat: 24,
              carbohydrates: 53,
              calories: 420,
              id: 'its so funny =D',
              price: 1255,
              image: 'https://code.s3.yandex.net/react/code/bun-02.png',
              image_mobile:
                'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
              image_large:
                'https://code.s3.yandex.net/react/code/bun-02-large.png'
            },
            ingredients: []
          },
          loading: false,
          orderRequest: false,
          orderModalData: null,
          error: null
        };
        const expectedResultForBuns = {
          ...initialStateWithBun,
          constructorItems: {
            bun: {
              _id: '643d69a5c3f7b9001cfa093d',
              name: 'Флюоресцентная булка R2-D3',
              type: 'bun',
              proteins: 44,
              fat: 26,
              carbohydrates: 85,
              calories: 643,
              price: 988,
              image: 'https://code.s3.yandex.net/react/code/bun-01.png',
              image_mobile:
                'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
              image_large:
                'https://code.s3.yandex.net/react/code/bun-01-large.png'
            },
            ingredients: []
          }
        };
        const newState = burgerConstructor(
          initialStateWithBun,
          addBun({
            _id: '643d69a5c3f7b9001cfa093d',
            name: 'Флюоресцентная булка R2-D3',
            type: 'bun',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/bun-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
          })
        );
  
        const bun = newState.constructorItems.bun;
        const expectedBun = expectedResultForBuns.constructorItems.bun;
  
        expect(bun).toEqual({
          ...expectedBun,
          _id: expect.any(String)
        });
      });
    });
  
    describe('test removeIngredient', () => {
      const initialState = {
        constructorItems: {
          bun: null,
          ingredients: [
            {
              id: 'funny',
              _id: '643d69a5c3f7b9001cfa0944',
              name: 'Соус традиционный галактический',
              type: 'sauce',
              proteins: 42,
              fat: 24,
              carbohydrates: 42,
              calories: 99,
              price: 15,
              image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
              image_mobile:
                'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
              image_large:
                'https://code.s3.yandex.net/react/code/sauce-03-large.png'
            }
          ]
        },
        loading: false,
        orderRequest: false,
        orderModalData: null,
        error: null
      };
      const expectedResult = {
        ...initialState,
        constructorItems: {
          bun: null,
          ingredients: []
        }
      };
  
      test('delete ingredient from Constructor', () => {
        const newState = burgerConstructor(
          initialState,
          removeIngredient('funny')
        );
  
        const recived = newState.constructorItems.ingredients;
        const expected = expectedResult.constructorItems.ingredients;
  
        expect(expected).toEqual(recived);
      });
    });
  
    describe('test moveUp and moveDown', () => {
      const initialState = {
        constructorItems: {
          bun: {
            id: 'funBun',
            _id: '643d69a5c3f7b9001cfa093c',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
          },
          ingredients: [
            {
              id: 'funnyPig1',
              _id: '643d69a5c3f7b9001cfa0944',
              name: 'Соус традиционный галактический',
              type: 'sauce',
              proteins: 42,
              fat: 24,
              carbohydrates: 42,
              calories: 99,
              price: 15,
              image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
              image_mobile:
                'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
              image_large:
                'https://code.s3.yandex.net/react/code/sauce-03-large.png'
            },
            {
              id: 'funnyPig2',
              _id: '643d69a5c3f7b9001cfa0946',
              name: 'Хрустящие минеральные кольца',
              type: 'main',
              proteins: 808,
              fat: 689,
              carbohydrates: 609,
              calories: 986,
              price: 300,
              image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
              image_mobile:
                'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
              image_large:
                'https://code.s3.yandex.net/react/code/mineral_rings-large.png'
            },
            {
              id: 'funnyPig3',
              _id: '643d69a5c3f7b9001cfa0947',
              name: 'Плоды Фалленианского дерева',
              type: 'main',
              proteins: 20,
              fat: 5,
              carbohydrates: 55,
              calories: 77,
              price: 874,
              image: 'https://code.s3.yandex.net/react/code/sp_1.png',
              image_mobile:
                'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
              image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png'
            }
          ]
        },
        loading: false,
        orderRequest: false,
        orderModalData: null,
        error: null
      };
      const expectedResult = {
        ...initialState,
        constructorItems: {
          bun: {
            id: 'funBun',
            _id: '643d69a5c3f7b9001cfa093c',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
          },
          ingredients: [
            {
              id: 'funnyPig1',
              _id: '643d69a5c3f7b9001cfa0944',
              name: 'Соус традиционный галактический',
              type: 'sauce',
              proteins: 42,
              fat: 24,
              carbohydrates: 42,
              calories: 99,
              price: 15,
              image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
              image_mobile:
                'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
              image_large:
                'https://code.s3.yandex.net/react/code/sauce-03-large.png'
            },
            {
              id: 'funnyPig3',
              _id: '643d69a5c3f7b9001cfa0947',
              name: 'Плоды Фалленианского дерева',
              type: 'main',
              proteins: 20,
              fat: 5,
              carbohydrates: 55,
              calories: 77,
              price: 874,
              image: 'https://code.s3.yandex.net/react/code/sp_1.png',
              image_mobile:
                'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
              image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png'
            },
            {
              id: 'funnyPig2',
              _id: '643d69a5c3f7b9001cfa0946',
              name: 'Хрустящие минеральные кольца',
              type: 'main',
              proteins: 808,
              fat: 689,
              carbohydrates: 609,
              calories: 986,
              price: 300,
              image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
              image_mobile:
                'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
              image_large:
                'https://code.s3.yandex.net/react/code/mineral_rings-large.png'
            }
          ]
        }
      };
  
      test('ingredient move up', () => {
        const newState = burgerConstructor(initialState, moveUp('643d69a5c3f7b9001cfa0947'));
        const expected = expectedResult.constructorItems.ingredients;
        const recived = newState.constructorItems.ingredients;
        
        expect(expected).toEqual(recived);
      });
      test('ingredient move down', () => {
        const newState = burgerConstructor(initialState, moveDown('643d69a5c3f7b9001cfa0946'));
        const expected = expectedResult.constructorItems.ingredients;
        const recived = newState.constructorItems.ingredients;
  
        expect(expected).toEqual(recived);
      });
    });
  
    describe('async POST request orderBurger', () => {
      const actions = {
        pending: {
          type: orderBurger.pending.type,
          payload: null
        },
        rejected: {
          type: orderBurger.rejected.type,
          error: { message: 'Funny mock-error' }
        },
        fulfilled: {
          type: orderBurger.fulfilled.type,
          payload: { order: { number: 404 } }
        }
      };
      test('orderBurger.pending', () => {
        const state = burgerConstructor(initialState, actions.pending);
        expect(state.orderRequest).toBe(true);
        expect(state.error).toBe(null);
      });
      test('orderBurger.rejected', () => {
        const state = burgerConstructor(initialState, actions.rejected);
        expect(state.loading).toBe(false);
        expect(state.error).toBe(actions.rejected.error.message);
        expect(state.orderModalData).toBe(null);
      });
      test('orderBurger.fulfilled', () => {
        const state = burgerConstructor(initialState, actions.fulfilled);
        expect(state.loading).toBe(false);
        expect(state.error).toBe(null);
        expect(state.orderModalData?.number).toBe(
          actions.fulfilled.payload.order.number
        );
      });
    });
  });
