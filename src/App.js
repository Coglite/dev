import React from 'react';
import glamorous from 'glamorous';
import { Header, HeaderLeft, HeaderRight } from './components/header';
import Title from './components/title';
import Menu from './components/menu';
import Missions from './components/missions';

const Main = glamorous.div({
  padding: 40,
  paddingTop: 20,
  paddingBottom: 20,
});

const App = () => (
  <div className="pt-dark">
    <Header isFixed>
      <HeaderRight>
        <Menu />
      </HeaderRight>
      <HeaderLeft>
        <Title />
      </HeaderLeft>
    </Header>
    <Main>
      <Missions />
    </Main>
  </div>
);

export default App;
