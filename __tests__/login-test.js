import 'react-native';
import React from 'react';
import LoginPage from '../src/screens/Login';
import renderer from 'react-test-renderer';

describe('login',() => {
    test('Login Page Snapshot', () =>{
        const snap = renderer.create(<LoginPage/>).toJSON();
        expect(snap).toMatchSnapshot();
    });

    it('function and state test care',()=>{
        let HomeData= renderer.create(<LoginPage />).getInstance();

        HomeData.setPassword()

        expect(HomeData.Password).toEqual('')
    })

    
});

