import React from 'react';
import { Provider } from 'react-redux';
import {store, persistor} from './redux/config/store';
import { PersistGate } from 'redux-persist/integration/react';
import  Navigator  from './components/Navigation'
import  Loading from './components/Loading'

export default class App extends React.Component {

  constructor(props){
    super(props)
   
  }

  render(){
      return (
        <Provider store = { store }>
          <PersistGate loading={<Loading/>} persistor={persistor}>
              <Navigator />
          </PersistGate>
        </Provider>      
      );
  }
};